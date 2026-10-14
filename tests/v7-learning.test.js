'use strict';
// Isolated Node regression tests: course content unchanged, existing schema preserved.
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const root=path.resolve(__dirname,'..');
const V7=require('../js/v7-learning.js');
const Exam=require('../js/exam.js');
const Core=require('../js/core.js');
const Bridge=require('../js/bridge.js');
const c={};
for(const p of ['data/content.js','data/advanced.js','data/v04_bank.js'])vm.runInNewContext(fs.readFileSync(path.join(root,p),'utf8'),c);
const originals=[...c.ToeicTrainerContent.cards,...c.ToeicTrainerAdvanced.cards];
const bank=[...originals,...c.ToeicTrainerV04.cards];
assert.equal(bank.length,800);
assert.equal(originals.length,72);
assert.equal(new Set(bank.map(q=>q.id)).size,800);
assert.equal(V7.verifiedCollocations,72);
const verified=bank.filter(c=>V7.collocation(c));
assert.equal(verified.length,72);
assert.equal(V7.collocation(bank.find(c=>c.id==='v073')),null,'v0.4 part-of-speech placeholders are not verified phrases');
for(const row of verified){
 const t=V7.collocation(row);assert.equal(t.cardId,row.id);
 assert(t.phrase.length>4&&t.meaning.length>=2&&t.example.length>15);
}
for(const mode of Object.keys(V7.MODES)){
 const source=mode==='collocation'?verified.slice(0,20):bank.slice(0,20);
 const qs=V7.questions(source,{mode,bank,random:()=>0.6});
 assert.equal(qs.length,20);
 assert.deepEqual(qs.map(q=>q.id),source.map(c=>c.id));
 for(let i=0;i<qs.length;i++){
  const q=qs[i],card=source[i];
  assert.equal(q.part,0);assert.equal(q.sourceCardId,card.id);
  assert.equal(q.options.length,4);assert.equal(new Set(q.options).size,4);
  assert.equal(q.answer,2);assert(typeof q.reason==='string'&&q.reason.length>12);
  assert(typeof q.reasonEn==='string'&&q.reasonEn.length>12);
  if(mode==='en-zh'||mode==='mixed'&&i%2===0)assert.equal(q.options[q.answer],card.zh);
  if(mode==='zh-en'||mode==='mixed'&&i%2===1)assert.equal(q.options[q.answer],card.word);
  if(mode==='collocation')assert(q.reason.includes(V7.collocation(card).phrase));
 }
 if(mode==='collocation'){
  assert(qs.some(q=>q.question.includes('填空')),'verified gap-fill variants should be included');
  assert(qs.some(q=>q.question.includes('辨認')),'whole-phrase recognition should be included');
 }
 const draft=Exam.start(qs,{context:'vocab',mode:'vocabulary',type:'vocab'});
 draft.vocabMode=mode;assert.equal(draft.mode,'vocabulary','the goal-linkable legacy mode must remain unchanged');
 assert.equal(Exam.completed(draft),0);
 const recovered=Exam.validDraft(JSON.stringify(draft),[],Date.now());
 assert.equal(recovered.items.length,qs.length,'V7 vocab draft uses the existing schema');
 let answered=draft;for(const q of qs)answered=Exam.answer(answered,q.id,q.answer);
 assert.equal(Exam.score(answered,qs).correct,qs.length);
}
// Critical contract: Goal Manager's bridge only accepts the ORIGINAL 'vocabulary' mode.
const v7Session=Core.createSession({id:'tt-v7-test-event-20261014',date:'2026-10-14',mode:'vocabulary',unit:'review',
 part:null,seconds:120,answered:2,correct:1,questionIds:['v001','v002']});
v7Session.vocabMode='collocation';v7Session.createdAt='2026-10-14T04:05:00.000Z';
const linked=Bridge.preview([v7Session],{now:new Date('2026-10-14T04:06:00.000Z')});
assert.equal(linked.rows[0].status,'review','new vocabulary direction must not be rejected by Goal Manager bridge');
assert.equal(Core.SCHEMA,1);assert.equal(Core.KEY,'toeic-trainer-v01:learning-state');
// V7_HISTORY_FIXTURE_START
// Also executed against the unmodified production Core as part of the updater's
// read-only preflight, before any source file is edited.
const historicalSession=Core.createSession({
 id:'tt-existing-vocab-session-20261011',date:'2026-10-11',mode:'vocabulary',unit:'review',
 part:null,seconds:100,answered:2,correct:1,questionIds:['v001','v002']
});
assert.equal(historicalSession.appId,Core.APP_ID);
const preserved=Core.normalized({appId:Core.APP_ID,schema:Core.SCHEMA,
 review:{v001:{repetitions:4,intervalDays:11}},
 questionStats:{'p5-01':{wrong:3,correct:2}},sessions:[historicalSession]});
assert.equal(preserved.review.v001.intervalDays,11);
assert.equal(preserved.questionStats['p5-01'].wrong,3);
assert.equal(preserved.sessions.length,1,'existing session with matching appId must survive normalization');
assert.equal(preserved.sessions[0].id,historicalSession.id);
assert.deepEqual(preserved.sessions[0],historicalSession,'normalization must not rewrite valid history');
const withForeign=Core.normalized({appId:Core.APP_ID,schema:Core.SCHEMA,
 sessions:[{...historicalSession,appId:'some-other-app'},historicalSession]});
assert.equal(withForeign.sessions.length,1,'foreign app data must still be excluded');
assert.equal(withForeign.sessions[0].id,historicalSession.id);
// V7_HISTORY_FIXTURE_END
const annotated=originals.length&&c.ToeicTrainerAdvanced.readingLessons.flatMap(l=>l.sentences)
 .filter(s=>V7.analyzeSentence(s.en));
assert.equal(annotated.length,24,'all 24 original v0.2 reading sentences have editorial annotations');
for(const sentence of annotated){
 const p=V7.analyzeSentence(sentence.en);
 assert.equal(p.map(x=>x.text).join(' '),sentence.en,'no token changed by syntax colorizer');
 assert(p.some(x=>x.type==='verb'));assert(p.every(x=>['subject','verb','object','modifier','complement'].includes(x.type)));
}
assert.equal(V7.analyzeSentence('This sentence was not manually annotated.'),null,'never invent automated grammar labels');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const html=read('index.html'),app=read('js/app.js'),sw=read('sw.js');
for(const marker of ['id="vocabMode"','./js/v7-learning.js','./css/v7-learning.css'])assert(html.includes(marker));
const cssBaseline=JSON.parse(read('docs/css-cascade-baseline-v5.json'));
assert.deepEqual(cssBaseline.linked_stylesheets,[
 'css/style.css','css/layout-v043.css','css/preferences-v0433.css','css/ui-layout-v4.css','css/v7-learning.css'
]);
assert.equal(Object.keys(cssBaseline.files).length,5,'the old V5 CSS budgets must remain in place');
for(const file of ['css/style.css','css/layout-v043.css','css/preferences-v0433.css','css/ui-layout-v4.css'])
 assert(cssBaseline.files[file],'no original CSS audit budget may be dropped');
assert.equal(cssBaseline.files['css/v7-learning.css'].important,0);
assert.equal(cssBaseline.files['css/v7-learning.css'].duplicate_scoped_rules,0);
assert.equal(cssBaseline.files['css/v7-learning.css'].duplicate_declarations,0);
assert(app.includes('V7.questions(selected,')&&app.includes('V7.analyzeSentence(sentence.en)'));
assert(app.includes('source.context===\'vocab\'')&&app.includes('Core.nextReview('),'old SRS is still used');
assert(app.includes("event.vocabMode=source.draft.vocabMode"));
assert(sw.includes("'./js/v7-learning.js'")&&sw.includes("'./css/v7-learning.css'"));
assert(!app.includes('localStorage.clear('));
console.log('PASS V7: 800 original IDs, 72 verified collocations, 4 practice modes, draft + review schema, 24 syntax analyses');
