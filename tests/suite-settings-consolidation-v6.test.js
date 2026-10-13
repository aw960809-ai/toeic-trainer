/* V6 presentation-only settings consolidation; no question or event mutations. */
'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const html=read('index.html'),css=read('css/preferences-v0433.css');
const sync=read('js/auto-sync.js'),prefs=require('../js/preferences.js');
for(const id of ['autoSyncDetails','autoSyncSummary','settingsDataPanel','settingsInformation',
                 'settingsGoalTools','bridgeDisclosure','settingsGoalGuide','qualityDisclosure',
                 'exportBackup','importBackupInput','autoSyncToggle','toeicSuiteAppearanceStrip'])
  assert(html.includes('id="'+id+'"'),'missing original setting: '+id);
for(const label of ['01 · Goal Manager 自動連動','02 · 資料與備份',
                    '03 · 題庫與學習管理','04 · 系統資訊與進階工具'])
  assert(html.includes(label),'missing grouped setting: '+label);
assert(html.includes('<details class="settings-section-group tt-advanced-fold" id="settingsGoalTools">'));
for(const [theme,name] of [['slate','霧藍'],['teal','鼠尾草綠'],
                           ['indigo','灰紫'],['graphite','石墨灰']])
  assert(html.includes('data-accent-value="'+theme+'"')&&html.includes('>'+name+'</button>'));
assert(css.includes('--tt-header-bg:#303D4C'));
assert(css.includes('.masthead{background:var(--tt-header-bg,#35475E)'));
assert(css.includes('SUITE-SETTINGS-V6'));
assert(css.includes('-webkit-tap-highlight-color:transparent'));
assert(sync.includes("const summary=document.getElementById('autoSyncSummary');"));
assert(sync.includes("timeZone:'Asia/Taipei'"));
assert(sync.includes('consent?.enabled'));
assert.equal(prefs.SUITE_KEY,'gm-suite:appearance-v1');
for(const file of ['index.html','css/preferences-v0433.css','js/auto-sync.js']){
  const text=read(file);
  for(const forbidden of ['localStorage.clear(','indexedDB.deleteDatabase(','lawLangGoalSystemV92'])
    assert(!text.includes(forbidden),'unsafe operation '+file);
}
assert(read('js/core.js').includes("const KEY='toeic-trainer-v01:learning-state'"));
console.log('PASS: V6 TOEIC four compact settings groups, matched theme, metadata status and isolated study data');
