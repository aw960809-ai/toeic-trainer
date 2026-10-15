'use strict';
/* V7.2: synthetic play sequences against immutable real banks, no real browser storage. */
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.resolve(__dirname,'..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const Smart=require('../js/smart-random-v72.js');
const V7=require('../js/v7-learning.js');
const Exam=require('../js/exam.js');
const Core=require('../js/core.js');
const ctx={};
for(const p of ['data/content.js','data/advanced.js','data/v04_bank.js','data/v041_progression.js','data/v042_official.js'])
  vm.runInNewContext(read(p),ctx,{filename:p});
const bank=[...ctx.ToeicTrainerContent.cards,...ctx.ToeicTrainerAdvanced.cards,...ctx.ToeicTrainerV04.cards];
const written=[...ctx.ToeicTrainerContent.questions.filter(q=>q.part>=5),...ctx.ToeicTrainerAdvanced.questions,
  ...ctx.ToeicTrainerV04.questions,...ctx.ToeicTrainerV041.questions,...ctx.ToeicTrainerV042.questions];
assert.equal(bank.length,800);
assert.equal(written.length,640);
assert.equal(new Set(bank.map(c=>c.id)).size,800);
assert.equal(new Set(written.map(q=>q.id)).size,640);
function seed(n){let x=n>>>0;return ()=>{x=(Math.imul(x,1664525)+1013904223)>>>0;return x/4294967296;}}
const stableBank=JSON.stringify(bank),stableWritten=JSON.stringify(written);
// Truly varied distractors with stable correct answers and unchanged learning card ids.
for(const mode of ['en-zh','zh-en','collocation','mixed']){
  const eligible=mode==='collocation'?bank.filter(c=>V7.collocation(c)):bank;
  const batch=eligible.slice(0,20);
  for(let s=1;s<=12;s++){
    const qs=V7.questions(batch,{mode,bank:eligible,random:seed(s)});
    assert.equal(qs.length,batch.length);
    assert.deepEqual(qs.map(q=>q.id),batch.map(c=>c.id));
    qs.forEach((q,i)=>{
      assert.equal(q.part,0);
      assert.equal(q.options.length,4);
      assert.equal(new Set(q.options).size,4);
      assert(q.answer>=0&&q.answer<4);
      const card=batch[i];
      const expected=mode==='en-zh'?card.zh:mode==='zh-en'?card.word:
        mode==='collocation'?null:undefined;
      if(expected!==null&&expected!==undefined)assert.equal(q.options[q.answer],expected);
    });
    const draft=Exam.start(qs,{context:'vocab',mode:'vocabulary',type:'vocab'});
    const restored=Exam.validDraft(JSON.parse(JSON.stringify(draft)),[],Date.now());
    assert.equal(restored.items[0].options[restored.items[0].answer],qs[0].options[qs[0].answer]);
    let submitted=draft;
    for(const q of qs)submitted=Exam.answer(submitted,q.id,q.answer);
    assert.equal(Exam.score(submitted,qs).correct,qs.length);
  }
}
const testCard=bank.find(c=>c.id==='v073');
const variants=new Set();
for(let k=1;k<=48;k++){
  const q=V7.questions([testCard],{mode:'en-zh',bank,random:seed(k)})[0];
  variants.add(q.options.filter((_,i)=>i!==q.answer).slice().sort().join('|'));
}
assert(variants.size>=15,'vocabulary distractor triples must no longer be fixed');
const enStart=V7.questions(bank.slice(0,2),{mode:'mixed',bank,random:()=>.9})[0];
const zhStart=V7.questions(bank.slice(0,2),{mode:'mixed',bank,random:()=>.1})[0];
assert(enStart.question.startsWith('英翻中'));assert(zhStart.question.startsWith('中翻英'));
// Favor unseen and due words, but reserve some slots for overdue SRS items.
const sample=bank.slice(0,60),review=Object.fromEntries(sample.slice(0,6).map(c=>[c.id,{dueAt:'2026-10-01T00:00:00Z'}]));
const pastVocab={mode:'vocabulary',unit:'review',questionIds:sample.slice(0,2).map(c=>c.id)};
const dueIds=new Set(sample.map(c=>c.id));
const selected=Smart.pickVocab(sample,{count:10,review,dueIds,sessions:[pastVocab],random:seed(8)});
assert.equal(selected.length,10);
assert.equal(new Set(selected.map(c=>c.id)).size,10);
assert.equal(selected.filter(c=>review[c.id]).length,3,'SRS due words must not be starved by new cards');
assert(selected.every(c=>!pastVocab.questionIds.includes(c.id)),'avoid immediate repeated cards when alternatives exist');
const draws=new Set();
for(let i=1;i<35;i++)draws.add(Smart.pickVocab(sample,{count:10,review,dueIds,random:seed(i)}).map(c=>c.id).join(','));
assert(draws.size>=25,'next vocabulary sessions should vary across random seeds');
// Written practice avoids recent session ids while keeping complete multi-question documents.
const p5=ctx.ToeicTrainerV04.questions.filter(q=>q.part===5).slice(0,100);
const previous={mode:'reading',questionIds:p5.slice(0,10).map(q=>q.id)};
const picked=Smart.pickPractice(p5,{count:10,sessions:[previous],random:seed(5)});
assert.equal(picked.length,10);
assert(picked.every(q=>!previous.questionIds.includes(q.id)),'no recent repeats in a broad unseen bank');
const daily=new Set();
for(let i=1;i<=28;i++)daily.add(Smart.pickPractice(p5,{count:10,random:seed(i)}).map(q=>q.id).join(','));
assert(daily.size>=24,'daily written practice should draw different sets');
const p6=ctx.ToeicTrainerV042.questions.filter(q=>q.part===6);
const selectedP6=Smart.pickPractice(p6,{count:5,random:seed(4)});
assert.equal(selectedP6.length,4,'never split a four-question Part 6 group');
assert.equal(new Set(selectedP6.map(q=>q.docGroup)).size,1);
const p7multi=ctx.ToeicTrainerV042.questions.filter(q=>q.part===7&&q.docGroup);
assert.equal(Smart.pickPractice(p7multi,{count:4,random:seed(9)}).length,0,'never split a five-question multi-document group');
const selectedP7=Smart.pickPractice(p7multi,{count:5,random:seed(9)});
assert.equal(selectedP7.length,5);
assert.equal(new Set(selectedP7.map(q=>q.docGroup)).size,1);
const mocks=Exam.assembleMock(written,ctx.ToeicTrainerV042.mock);
assert.equal(mocks.length,100,'official-style mock blueprint must remain unchanged');
// Previously fixed reading order now randomized on equal exposure; still prefers least seen.
const lessons=ctx.ToeicTrainerV041.readingLessons;
const reads=new Set();
for(let i=1;i<=35;i++)reads.add(Smart.pickReading(lessons,{},written,[],seed(i*1234567)).id);
assert(reads.size>=5,'new reading article selection should not always pick the first lesson');
assert.equal(Smart.pickReading([],{},written,[],seed(1)),null);
assert.equal(JSON.stringify(bank),stableBank,'original cards must never mutate');
assert.equal(JSON.stringify(written),stableWritten,'original question bank must never mutate');
// Only the question ordering and safe distractor variants change; the durable schema does not.
assert.equal(Core.SCHEMA,1);assert.equal(Core.KEY,'toeic-trainer-v01:learning-state');
const app=read('js/app.js'),html=read('index.html'),sw=read('sw.js');
assert(app.includes('Smart.pickVocab(')&&app.includes('Smart.pickPractice(')&&app.includes('Smart.pickReading('));
assert(html.includes('js/smart-random-v72.js')&&html.indexOf('js/smart-random-v72.js')<html.indexOf('js/app.js'));
assert(sw.includes("'./js/smart-random-v72.js'"));
assert(html.includes('TOEIC Trainer V7.2'));
for(const token of ['localStorage.clear(','indexedDB.deleteDatabase(','lawLangGoalSystemV92'])
  assert(!read('js/smart-random-v72.js').includes(token));
console.log('PASS V7.2: varied choices and ordering, SRS due balance, recent avoidance, complete paper bundles, immutable 800/640 banks, stable sessions and mock scoring');
