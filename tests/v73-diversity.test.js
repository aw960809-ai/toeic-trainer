'use strict';
/* V7.3: immutable real-bank QA, vetted content diversity and resumable answer mapping. */
const assert=require('node:assert/strict');
const V73=require('../data/v73-authored.js');
const Variety=require('../js/variety-v73.js');
const V7=require('../js/v7-learning.js');
const Core=require('../js/core.js');
const Exam=require('../js/exam.js');
const Smart=require('../js/smart-random-v72.js');
const path=require('node:path'),fs=require('node:fs'),vm=require('node:vm');
const read=p=>fs.readFileSync(path.join(__dirname,'..',p),'utf8');
const scope={};
for(const p of ['data/content.js','data/advanced.js','data/v04_bank.js','data/v041_progression.js','data/v042_official.js'])
  vm.runInNewContext(read(p),scope,{filename:p});
const sources=['Content','Advanced','V04','V041','V042'].map(n=>scope['ToeicTrainer'+n]);
const originalCards=sources.flatMap(x=>x.cards||[]);
const originalWritten=sources.flatMap(x=>(x.questions||[]).filter(q=>q.part>=5));
const cards=Variety.enhanceCards(originalCards);
const questions=[...originalWritten,...V73.questions];
const lessons=[...sources.flatMap(x=>x.readingLessons||[]),...V73.readingLessons];
const grammarLessons=sources.flatMap(x=>x.grammarLessons||[]);
assert.equal(originalCards.length,800);
assert.equal(originalWritten.length,640);
assert.equal(cards.length,800);
assert.equal(questions.length,737);
assert.equal(lessons.length,56);
assert.equal(V73.counts.part6,32);
assert.equal(V73.counts.part7,65);
assert.equal(V73.counts.readings,13);
for(const p of [5,6,7]) assert.equal(questions.filter(q=>q.part===p).length,({5:368,6:76,7:293})[p]);
assert.equal(new Set(cards.map(c=>c.id)).size,800);
assert.equal(new Set(questions.map(q=>q.id)).size,737);
assert.equal(new Set(lessons.map(l=>l.id)).size,56);
assert.deepEqual(originalCards.map(c=>c.id),cards.map(c=>c.id));
const improved=cards.filter((c,i)=>c.example!==originalCards[i].example);
assert.equal(improved.length,728,`all previous template examples must be rewritten: ${improved.length}`);
assert.equal(new Set(improved.map(c=>c.example.toLowerCase())).size,728,'new examples must not repeat text');
assert(improved.every(c=>!/often appears in|may appear in|is used in office notices/i.test(c.example)),'no generic placeholder templates');
for(const c of improved){
  assert(c.example.trim().split(/\s+/).length>=6,c.id);
  // Real usages contain actual target words or their inflections.
  assert(/[.!?]$/.test(c.example),c.id);
}
assert.equal(cards.filter(c=>V7.collocation(c)).length,72);
const clozes=new Set();
for(const card of cards.filter(c=>V7.collocation(c))){
  if(Variety.clozeFor(card)){
    const fill=Variety.clozeFor(card);
    assert.equal(fill.length,5,card.id);
    assert(fill[0].includes('_____'),card.id);
    assert.equal(new Set(fill.slice(1)).size,4,card.id);
    clozes.add(card.id);
  }
}
assert.equal(clozes.size,56);
assert.equal([...clozes].filter(id=>['v001','v004','v010','v011','v013','v019','v022','v025','v029','v034','v049','v057','v060','v064','v068','v072'].includes(id)).length,0);
function seeded(n){let x=n>>>0;return ()=>{x=(Math.imul(x,1664525)+1013904223)>>>0;return x/4294967296}}
let clozeDraw=0;
for(let s=10;s<=15;s++){
  let sample=cards.filter(c=>V7.collocation(c));sample=Smart.shuffle(sample,seeded(s)).slice(0,12);
  const qs=V7.questions(sample,{mode:'collocation',bank:cards.filter(c=>V7.collocation(c)),random:seeded(s)});
  assert(qs.every(q=>q.options.length===4&&new Set(q.options).size===4));
  clozeDraw+=qs.filter(q=>q.question.startsWith('搭配詞填空')).length;
}
assert(clozeDraw>=32,'cloze availability should enable diverse fill questions');
// Each reading preserves its original paragraph evidence with varied tasks and no repeated stale templates.
const stemSignatures=new Set();
for(const lesson of V73.readingLessons){
  const linked=V73.questions.filter(q=>q.readingId===lesson.id);
  assert.equal(linked.length,5,lesson.id);
  assert(lesson.wordCount>=165&&lesson.wordCount<=270,`${lesson.id} word count=${lesson.wordCount}`);
  assert.equal(lesson.sentences.length,5,lesson.id);
  assert.equal(new Set(linked.map(q=>q.skill)).size,5,lesson.id);
  assert.equal(new Set(linked.map(q=>q.evidenceIndex)).size,5,lesson.id);
  for(const q of linked){
    assert(q.passage.includes(q.evidence),q.id);
    assert(q.passage.includes(lesson.sentences[q.evidenceIndex].en),q.id);
    assert(q.reason.length>9&&q.reasonEn.includes(q.evidence),q.id);
    assert(q.options[q.answer],q.id);
    assert.equal(new Set(q.options).size,4,q.id);
    assert(!/^Which step is required under |^Where can a reader find /.test(q.question),q.id);
    assert(!stemSignatures.has(q.question.toLowerCase()),q.id);
    stemSignatures.add(q.question.toLowerCase());
  }
}
assert(V73.questions.filter(q=>q.part===7).some(q=>/Why |Under what|NOT |According to|How much|Which .* final/i.test(q.question)));
const p6=V73.questions.filter(q=>q.part===6);
assert.equal(new Set(p6.map(q=>q.docGroup)).size,8);
for(const group of new Set(p6.map(q=>q.docGroup))){
  const set=p6.filter(q=>q.docGroup===group);
  assert.equal(set.length,4,group);
  assert.equal(new Set(set.map(q=>q.passage)).size,1,group);
  for(let i=1;i<=4;i++)assert(set[0].passage.includes(`[${i}]`),group);
  assert.equal(new Set(set.map(q=>q.grammarTopic)).size>=2,true,group);
}
// Source QA and old 640 IDs/answer originals are unchanged; new audits pass.
const coreErrors=Core.validateBank(cards,questions);assert.equal(coreErrors.length,0,coreErrors.slice(0,6).join(';'));
const audited=require('../js/bank-audit.js').audit({cards,questions,readingLessons:lessons,grammarLessons,expected:{cards:800,questions:737,reading:56,grammar:20,part5:368,part6:76,part7:293}});
assert.equal(audited.ok,true,audited.errors.slice(0,8).join(';'));
// Shuffle options only, never overwrite original question records/answers.
const untouched=JSON.stringify(questions);
const subset=questions.filter(q=>q.part===6).slice(0,8);
const shuffled=Variety.shuffleOptions(subset,seeded(2026));
assert.equal(shuffled.length,8);
for(let i=0;i<8;i++){
  assert.equal(shuffled[i].id,subset[i].id);
  assert.equal(shuffled[i].options[shuffled[i].answer],subset[i].options[subset[i].answer]);
  assert.deepEqual(Array.from(shuffled[i].options).sort(),Array.from(subset[i].options).sort());
  assert.equal(shuffled[i].shuffleVersion,'v73');
}
assert.equal(JSON.stringify(questions),untouched);
const draft=Exam.start(shuffled,{context:'grammar',mode:'grammar'});
assert.equal(draft.questionItems.length,8);
let answered=draft;
for(const q of shuffled)answered=Exam.answer(answered,q.id,q.answer);
const oldSchema=Core.SCHEMA;
assert.equal(Exam.score(answered,shuffled).correct,shuffled.length);
const restored=Exam.validDraft(JSON.parse(JSON.stringify(answered)),questions).items;
assert.equal(Exam.score(answered,restored).correct,8,'scores must stay stable after refresh');
assert.equal(Core.SCHEMA,oldSchema);
// Legacy drafts produced before V7.3 are still recoverable without option maps.
const legacyDraft=Exam.start(subset,{context:'grammar',mode:'grammar'});
assert(!legacyDraft.questionItems);
assert.equal(Exam.validDraft(JSON.parse(JSON.stringify(legacyDraft)),questions).items[0].answer,subset[0].answer);
const bad=JSON.parse(JSON.stringify(answered));bad.questionItems[0].options[bad.questionItems[0].answer]='tampered';
assert.throws(()=>Exam.validDraft(bad,questions),/快照|不符/);
// Save/load contract retains historic Session metadata & options and V7.3 reading progress.
const state=Core.fresh();
state.readingProgress[V73.readingLessons[0].id]={attempts:1,best:80,lastAt:'2026-10-16'};
const normal=Core.normalized(state);
assert.equal(normal.readingProgress[V73.readingLessons[0].id].best,80);
const app=read('js/app.js'),html=read('index.html'),sw=read('sw.js');
for(const token of ['event.questionReview=','const savedOrder=','...expandedAudit.errors','Variety.shuffleOptions(items)','V73.readingLessons'])assert(app.includes(token),token);
assert(html.indexOf('v73-authored.js')<html.indexOf('js/app.js'));
assert(html.indexOf('variety-v73.js')<html.indexOf('v7-learning.js'));
assert(sw.includes('v73-authored.js')&&sw.includes('variety-v73.js'));
for(const token of ['localStorage.clear(','indexedDB.deleteDatabase(','lawLangGoalSystemV92']){
  assert(!read('js/variety-v73.js').includes(token));
  assert(!read('data/v73-authored.js').includes(token));
}
console.log('PASS V7.3: 737 written / 56 lessons / 800 stable cards, 728 contextual examples, 72 cloze-capable collocations, 13 diverse articles, 8 new Part 6 documents, shuffled answer snapshots and historical safety');
