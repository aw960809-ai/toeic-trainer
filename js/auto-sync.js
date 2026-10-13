/* TOEIC Trainer V0.5.1 — opt-in same-origin automatic learning sync.
 * Trainer never opens, alters or replaces Goal Manager's database.
 * Goal Manager alone reads this app's saved sessions and ingests eligible logs.
 */
(function(root,factory){
  const api=factory();
  if(typeof module==='object'&&module.exports)module.exports=api;
  root.ToeicTrainerAutoSync=api;
  if(typeof document!=='undefined'){
    const boot=()=>api.attach({window:root,document});
    if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
  }
})(typeof globalThis!=='undefined'?globalThis:this,function(){
  'use strict';
  const KEY='toeic-trainer:v051-link-settings';
  const STATUS_KEY='goal-manager:toeic-sync-status-v1';
  const PAGE_PATH_RX=/^\/toeic-trainer\/(?:index\.html)?$/;
  function hosted(location){
    if(!location||location.protocol!=='https:'||!PAGE_PATH_RX.test(String(location.pathname||'')))return false;
    // Only the intended GitHub Pages hostname may enable this origin-owned consent.
    try{return new URL(String(location.href||'https://'+location.hostname+location.pathname)).hostname==='aw960809-ai.github.io'}catch(_){return false}
  }
  function read(store){try{const raw=store.getItem(KEY);return raw?JSON.parse(raw):null}catch(_){return null}}
  function save(store,record){
    const raw=JSON.stringify(record);
    store.setItem(KEY,raw);
    if(store.getItem(KEY)!==raw)throw new Error('連動設定無法永久保存');
    return record;
  }
  function enable(store,{now=new Date(),location=null}={}){
    if(!hosted(location))throw new Error('請先使用 Goal Manager 同網域的 TOEIC Trainer，勿在 localhost 啟用同步');
    const before=read(store)||{};
    if(before.enabled===true&&before.version===1)return before;
    const consent={version:1,enabled:true,enabledAt:now.toISOString()};
    return save(store,consent);
  }
  function disable(store){
    const before=read(store)||{};
    return save(store,{version:1,enabled:false,enabledAt:before.enabledAt||new Date().toISOString()});
  }
  function statusText(window){
    if(!hosted(window.location))return '本機模式：資料仍在此瀏覽器。自動連動需從 Goal Manager 網站開啟已部署的訓練版。';
    const settings=read(window.localStorage);
    if(!settings?.enabled)return '尚未啟用。啟用後會自動核對符合條件的歷史與新增正式交卷紀錄。';
    let receipt=null;
    try{receipt=JSON.parse(window.localStorage.getItem(STATUS_KEY)||'null')}catch(_){}
    if(!receipt)return '自動連動已啟用；請開啟 Goal Manager 接收新完成的訓練。';
    if(receipt.blocked)return '目標系統尚未接收：'+receipt.blocked;
    return `自動連動已啟用 · 上次新增 ${Number(receipt.addedCount)||0} 筆、${Number(receipt.added)||0} 分；安全暫緩 ${Number(receipt.held)||0} 筆。`;
  }
  function notifyCompleted(event,{window}={}){
    // Called ONLY AFTER the Trainer state passed its durable write verification.
    if(!window||!hosted(window.location))return false;
    const consent=read(window.localStorage);
    if(!consent?.enabled||consent.version!==1)return false;
    const end=Date.parse(event?.createdAt||''),cutoff=Date.parse(consent.enabledAt||'');
    if(!Number.isFinite(end)||!Number.isFinite(cutoff)||end<=cutoff)return false;
    try{
      const bc=typeof window.BroadcastChannel==='function'?new window.BroadcastChannel('toeic-trainer-v05'):null;
      bc?.postMessage({type:'new-submitted-session'});
      bc?.close();
    }catch(_){ /* GM also watches storage events and the next page open. */ }
    return true;
  }
  function attach({window,document}){
    const status=document.getElementById('autoSyncStatus'),toggle=document.getElementById('autoSyncToggle'),jump=document.getElementById('autoSyncOpenGoal');
    if(!status||!toggle)return;
    const summary=document.getElementById('autoSyncSummary');
    const paint=()=>{
      const consent=read(window.localStorage);
      status.textContent=statusText(window);
      toggle.textContent=consent?.enabled?'暫停自動連動':'啟用新練習自動連動';
      toggle.disabled=!hosted(window.location);
      if(summary){
        // Display only verified local receipt metadata; never modify consent or training history.
        let receipt=null;
        try{const raw=window.localStorage.getItem(STATUS_KEY);if(raw&&raw.length<=4096)receipt=JSON.parse(raw)}catch(_){}
        const stamp=Date.parse(receipt?.lastCheckedAt||'');
        const consentStamp=Date.parse(consent?.enabledAt||'');
        const recent=Number.isFinite(stamp)&&(!Number.isFinite(consentStamp)||stamp>=consentStamp)
          ?new Date(stamp).toLocaleString('zh-TW',{timeZone:'Asia/Taipei',month:'numeric',day:'numeric',hour:'2-digit',minute:'2-digit',hour12:false}):'';
        summary.textContent=!hosted(window.location)?'僅限正式網站':!consent?.enabled?'尚未啟用':receipt?.blocked
          ?'已啟用 · 需注意':recent?'已啟用 · '+recent+' 核對':'已啟用 · 等待核對';
      }
      if(jump)jump.href=new URL('/my-goal-manager/',window.location.href).href;
    };
    toggle.addEventListener('click',()=>{
      try{
        if(read(window.localStorage)?.enabled){disable(window.localStorage)}
        else{
          const ok=window.confirm('啟用後 Goal Manager 會在開啟或切回時，自動核對已存在及新增的有效訓練紀錄，無需逐筆匯入。\n\n同日人工紀錄、事件重複或學習時間疑似重疊者會安全暫緩，不重複入帳。\n\n確定啟用嗎？');
          if(!ok)return;
          enable(window.localStorage,{location:window.location});
        }
        paint();
      }catch(error){status.textContent='設定未保存：'+String(error?.message||error)}
    });
    window.addEventListener('storage',event=>{if(event.key===STATUS_KEY||event.key===KEY)paint()});
    window.addEventListener('focus',paint);
    paint();
  }
  return Object.freeze({KEY,STATUS_KEY,hosted,read,enable,disable,statusText,notifyCompleted,attach});
});
