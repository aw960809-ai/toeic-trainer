/* TOEIC Trainer V6.1: mobile presentation only, no learning-state edits. */
'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const root=path.join(__dirname,'..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const ui=read('css/ui-layout-v4.css');
const app=read('js/app.js');
const html=read('index.html');
const prefs=read('css/preferences-v0433.css');
assert.equal(ui.split('TOEIC-V61-MOBILE-UX-20261013').length-1,1);
// All three count controls remain original select-driven choices.
assert(html.includes('id="vocabCount"'));
assert(html.includes('id="startVocab"'));
// The app declares vocabCount inside Object.entries and loops through the
// controls using enhanceChoiceSelect(id,labels), not a literal direct call.
assert.match(app,/for\s*\(\s*const\s*\[\s*id\s*,\s*labels\s*\]\s*of\s*Object\.entries\s*\(\s*\{\s*vocabCount\s*:/);
assert.match(app,/enhanceChoiceSelect\s*\(\s*id\s*,\s*labels\s*\)/);
assert(ui.includes('grid-template-columns:repeat(3,minmax(0,1fr))'));
assert(ui.includes('#tab-vocab .vocab-launch #startVocab{width:100%'));
// Both original search IDs are preserved and support visible keyboard focus.
for(const id of ['readingSearch','grammarSearch'])assert(html.includes('id="'+id+'"'));
assert(ui.includes('#tab-practice .tt-search-label input[type="search"]:focus-visible'));
assert(ui.includes('outline:2px solid var(--sage);outline-offset:2px'));
// All wrong-item badges retain the original data and gain a fixed grid slot.
assert(app.includes('class="pill warn">待複習'));
assert(ui.includes('#tab-mistakes #mistakesList .list-row>.pill'));
assert(ui.includes('grid-column:2;grid-row:1'));
// Existing four settings destinations, toggles, and read-only fallback survive.
for(const id of ['autoSyncDetails','settingsDataPanel','settingsInformation','settingsGoalTools'])
  assert(html.includes('id="'+id+'"'));
assert(ui.includes('#settingsInformation.tt-information-fold,#settingsGoalTools.tt-advanced-fold'));
assert(ui.includes('[open]>summary::after'));
assert(prefs.includes('#tab-settings .settings-fold>summary:after'));
// Scroll correction is deliberately restricted to idle reading/grammar tabs.
assert(app.includes("if((id==='reading'||id==='grammar')&&!quiz&&!readingRun)"));
assert(app.includes('if(currentTab===id&&!quiz&&!readingRun)'));
assert(app.includes("window.scrollTo({top:0,behavior:'instant'})"));
assert(app.includes('function renderMistakes()'));
for(const forbidden of ['localStorage.clear(', 'indexedDB.deleteDatabase(', 'lawLangGoalSystemV92'])
  assert(!ui.includes(forbidden));
assert(read('js/core.js').includes("const KEY='toeic-trainer-v01:learning-state'"));
assert(read('js/auto-sync.js').includes("const KEY='toeic-trainer:v051-link-settings'"));
console.log('PASS: V6.1 mobile count/search/review/settings/scroll presentation and data boundaries');
