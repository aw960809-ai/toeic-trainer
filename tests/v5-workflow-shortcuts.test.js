/* V5 phase 2: due-word shortcut and post-submission navigation only. */
'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.resolve(__dirname,'..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const app=read('js/app.js'),css=read('css/ui-layout-v4.css');
assert(app.includes('id="homeDueVocab"'));
assert(app.includes('aria-label="查看待學與到期單字"'));
assert(app.includes("if(e.target.closest?.('#homeDueVocab')){openDueVocabLibrary();return;}"));
const snippet=app.match(/function openDueVocabLibrary\(\)\{[\s\S]*?\n\}\nfunction vocabMatching\(/);
assert(snippet,'isolated due word workflow must be present');
const fn=snippet[0].split('\nfunction vocabMatching(')[0];
assert(!/persist\(|localStorage|state\.sessions|saveDraft|startVocab\(/.test(fn),
  'shortcut must not write learning history or start exam');
const actions=[];
const nodes={vocabFilter:{value:'all'},vocabLibraryPanel:{hidden:false,scrollIntoView:arg=>actions.push(['scroll',arg.block])}};
const context={quiz:null,readingRun:null,vocabListPage:9,
  byId:id=>nodes[id]||null,
  tab:view=>actions.push(['tab',view]),
  changeVocabView:view=>actions.push(['view',view]),
  notify:text=>actions.push(['notice',text]),
  requestAnimationFrame:fn=>fn()};
vm.createContext(context);
vm.runInContext(fn+'\nopenDueVocabLibrary()',context);
assert.equal(nodes.vocabFilter.value,'due');
assert.equal(context.vocabListPage,0);
assert.deepEqual(actions,[['tab','vocab'],['view','library'],['scroll','start']]);
actions.length=0;
vm.runInContext('quiz={};openDueVocabLibrary()',context);
assert.equal(actions.length,1);
assert.equal(actions[0][0],'notice','active quiz cannot leave exam');
assert(app.includes('id="reviewMistakesAfterPractice"'));
assert(app.includes("byId('reviewMistakesAfterPractice')?.addEventListener('click',()=>tab('mistakes'))"));
assert(app.includes('id="reviewMistakesAfterReading"'));
assert(app.includes("byId('reviewMistakesAfterReading')?.addEventListener('click',()=>tab('mistakes'))"));
assert(app.includes("source.context==='vocab'?'再練一組':'調整題目再練'"));
assert(app.includes('id="readAgain">選擇下一篇'));
assert(css.includes('V5-PHASE2-WORKFLOW'));
assert(css.includes('.tt-due-vocab-shortcut:focus-visible'));
console.log('PASS: due-word library via one tap, exam guard, post-submission review navigation');
