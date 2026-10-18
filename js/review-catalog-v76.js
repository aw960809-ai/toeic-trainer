/* V7.6: Public question-bank membership, never study history or user answers.
 * Trainer alone publishes the active audited ID list. Goal Manager may read it.
 */
(function(root,factory){
  const api=factory();
  if(typeof module==='object'&&module.exports)module.exports=api;
  root.ToeicReviewCatalogV76=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(){
 'use strict';
 const KEY='toeic-trainer:review-catalog-v1';
 const SOURCE='toeic-trainer-standalone';
 const MAX=1500;
 const VALID_ID=/^[a-z0-9_-]{1,90}$/i;
 function signature(writtenIds,vocabIds){
   const data=writtenIds.join('\n')+'\n#\n'+vocabIds.join('\n');
   let h=2166136261;
   for(let i=0;i<data.length;i++){h^=data.charCodeAt(i);h=Math.imul(h,16777619)}
   return (h>>>0).toString(16).padStart(8,'0');
 }
 function normalize(ids){
   if(!Array.isArray(ids)||!ids.length||ids.length>MAX||ids.some(id=>typeof id!=='string'||!VALID_ID.test(id)))
     throw new Error('Invalid TOEIC bank identifiers');
   if(new Set(ids).size!==ids.length)throw new Error('Duplicate bank identifiers');
   return ids.slice().sort();
 }
 function create(questions,cards){
   const writtenIds=normalize(questions.map(x=>x.id)),vocabIds=normalize(cards.map(x=>x.id));
   if(writtenIds.some(id=>vocabIds.includes(id)))throw new Error('Conflicting question and card IDs');
   return {source:SOURCE,schema:1,version:1,kind:'active-audited-bank-ids',
     writtenIds,vocabIds,writtenCount:writtenIds.length,vocabCount:vocabIds.length,
     signature:signature(writtenIds,vocabIds)};
 }
 function parse(raw){
   let doc;
   try{doc=typeof raw==='string'?JSON.parse(raw):raw;
     if(!doc||doc.source!==SOURCE||doc.schema!==1||doc.version!==1||
       doc.kind!=='active-audited-bank-ids')return null;
     const writtenIds=normalize(doc.writtenIds),vocabIds=normalize(doc.vocabIds);
     if(doc.writtenCount!==writtenIds.length||doc.vocabCount!==vocabIds.length||
       signature(writtenIds,vocabIds)!==doc.signature||
       writtenIds.some(id=>vocabIds.includes(id)))return null;
     if(JSON.stringify(writtenIds)!==JSON.stringify(doc.writtenIds)||
        JSON.stringify(vocabIds)!==JSON.stringify(doc.vocabIds))return null;
     return doc;
   }catch(_){return null}
 }
 function hosted(loc){
   return !!loc&&loc.protocol==='https:'&&loc.hostname==='aw960809-ai.github.io'&&
     /^\/toeic-trainer\/(?:index\.html)?$/.test(String(loc.pathname||''));
 }
 function publish(store,loc,questions,cards){
   if(!hosted(loc))return false;
   const raw=JSON.stringify(create(questions,cards));
   try{
     store.setItem(KEY,raw);
     return store.getItem(KEY)===raw;
   }catch(_){return false}
 }
 return Object.freeze({KEY,SOURCE,MAX,signature,create,parse,hosted,publish});
});
