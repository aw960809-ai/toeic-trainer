/* TOEIC Trainer V7.2 — history-aware randomized selection only.
 * Pure functions: no storage, grading, answer rewriting, or Goal Manager writes.
 */
(function(root,factory){
  'use strict';
  const api=factory();
  if(typeof module==='object'&&module.exports)module.exports=api;
  root.ToeicTrainerSmartRandom=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(){
  'use strict';
  const list=x=>Array.isArray(x)?x:[];
  const value=random=>{
    const n=Number(random());
    return Number.isFinite(n)?Math.max(0,Math.min(0.999999999999,n)):0.5;
  };
  function shuffle(source,random=Math.random){
    const a=list(source).slice();
    for(let i=a.length-1;i>0;i--){
      const j=Math.floor(value(random)*(i+1));
      [a[i],a[j]]=[a[j],a[i]];
    }
    return a;
  }
  function recentIds(sessions,{kind='vocab',depth=4}={}){
    const past=list(sessions).filter(s=>s&&Array.isArray(s.questionIds)&&
      (kind==='vocab'?s.mode==='vocabulary':s.mode!=='vocabulary'&&s.mode!=='official-reading-mock'));
    const ids=new Set();
    for(const s of past.slice(-depth))for(const id of s.questionIds){
      if(typeof id==='string')ids.add(id);
    }
    return ids;
  }
  // Keep categories mixed throughout a session, while making selections random.
  function spread(rows,random,lastTag=''){
    const a=shuffle(rows,random),out=[];
    let previous=lastTag;
    while(a.length){
      let i=a.findIndex(c=>String(c.tag||c.grammarTopic||'')!==previous);
      if(i<0)i=0;
      const item=a.splice(i,1)[0];out.push(item);
      previous=String(item.tag||item.grammarTopic||'');
    }
    return out;
  }
  function pickVocab(eligible,{count=10,review={},dueIds=new Set(),sessions=[],random=Math.random}={}){
    const source=list(eligible).filter(c=>c&&typeof c.id==='string');
    if(!source.length)return [];
    const recent=recentIds(sessions,{kind:'vocab',depth:4});
    const due=new Set(dueIds);
    const fresh=[],revising=[],later=[];
    for(const card of source){
      if(!review?.[card.id])fresh.push(card);
      else if(due.has(card.id))revising.push(card);
      else later.push(card);
    }
    const amount=Math.min(source.length,Math.max(1,Math.floor(Number(count)||10)));
    // When both pools exist, roughly 70% new and 30% due: do not starve SRS.
    const newQuota= fresh.length&&revising.length?Math.max(1,Math.round(amount*.7)):amount;
    const chosen=[],used=new Set();
    const take=(rows,capacity)=>{
      const freshOrder=spread(rows.filter(c=>!recent.has(c.id)),random);
      const repeatOrder=spread(rows.filter(c=>recent.has(c.id)),random);
      for(const card of [...freshOrder,...repeatOrder]){
        if(chosen.length>=amount||capacity<=0)break;
        if(used.has(card.id))continue;
        chosen.push(card);used.add(card.id);capacity--;
      }
    };
    take(fresh,newQuota);
    take(revising,amount-chosen.length);
    // Fill unused due quota from new cards before pulling forward not-due SRS.
    if(chosen.length<amount)take(fresh,amount-chosen.length);
    if(chosen.length<amount)take(revising,amount-chosen.length);
    if(chosen.length<amount)take(later,amount-chosen.length);
    return spread(chosen,random);
  }
  function groupKey(q){
    return q.part===5?'single:'+q.id:q.docGroup?'bundle:'+q.docGroup:
      q.readingId?'article:'+q.readingId:'passage:'+String(q.passage||q.id);
  }
  function pickPractice(pool,{count=10,stats={},sessions=[],mode='reading',random=Math.random,now=Date.now()}={}){
    const limit=Math.max(1,Math.min(100,Math.floor(Number(count)||10)));
    const groups=new Map();
    for(const q of list(pool)){
      if(!q?.id)continue;
      const key=groupKey(q);const rows=groups.get(key)||[];rows.push(q);groups.set(key,rows);
    }
    const recent=mode==='mistakes'?new Set():recentIds(sessions,{kind:'practice',depth:5});
    const bundleScores=[...groups.values()].map(rows=>{
      const stage=rows.reduce((sum,q)=>{
        const record=stats?.[q.id];
        if(!record)return sum;
        const deadline=Date.parse(record.dueAt||'');
        return sum+(!Number.isFinite(deadline)||deadline<=now?1:2);
      },0)/rows.length;
      const freshHits=rows.reduce((sum,q)=>sum+(recent.has(q.id)?1:0),0)/rows.length;
      return {rows,stage,recent:freshHits,rand:value(random),tag:rows[0].grammarTopic||rows[0].tag||String(rows[0].part)};
    });
    const selected=[],used=new Set(),topicCounts=new Map();
    while(selected.length<limit){
      let best=null,bestScore=Infinity;
      for(const bundle of bundleScores){
        if(bundle.picked||bundle.rows.length>limit-selected.length)continue;
        const topicTimes=topicCounts.get(bundle.tag)||0;
        const diversityPenalty=topicTimes>=2?Math.min(.6,topicTimes*.2):0;
        // Prefer genuinely new/due questions and avoid recent sessions when possible.
        const score=bundle.stage+bundle.recent*2.8+diversityPenalty+bundle.rand*.26;
        if(score<bestScore){bestScore=score;best=bundle;}
      }
      if(!best)break;
      best.picked=true;
      for(const q of best.rows){if(!used.has(q.id)){used.add(q.id);selected.push(q)}}
      topicCounts.set(best.tag,(topicCounts.get(best.tag)||0)+1);
    }
    return selected;
  }
  function pickReading(lessons,stats={},questions=[],sessions=[],random=Math.random){
    const available=list(lessons);if(!available.length)return null;
    const recent=recentIds(sessions,{kind:'practice',depth:4});
    const seen=lesson=>list(questions).filter(q=>q.readingId===lesson.id).reduce((n,q)=>{
      const stat=stats?.[q.id]||{};
      return n+Math.max(0,Number(stat.correct)||0)+Math.max(0,Number(stat.wrong)||0);
    },0);
    const exposure=available.map(l=>({l,seen:seen(l)}));
    const min=Math.min(...exposure.map(x=>x.seen));
    const tied=exposure.filter(x=>x.seen===min);
    const nonRecent=tied.filter(x=>!list(questions).some(q=>q.readingId===x.l.id&&recent.has(q.id)));
    const candidates=nonRecent.length?nonRecent:tied;
    return candidates[Math.floor(value(random)*candidates.length)].l;
  }
  return Object.freeze({shuffle,recentIds,pickVocab,pickPractice,pickReading});
});
