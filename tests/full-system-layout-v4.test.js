/* TOEIC UI V4: reading and active exam safeguards, six destinations, offline CSS. */
'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..');
const read=n=>fs.readFileSync(path.join(root,n),'utf8');
const css=read('css/ui-layout-v4.css'),html=read('index.html'),sw=read('sw.js');
assert(css.includes('UI-LAYOUT-V4'));
for(const id of ['tab-home','tab-vocab','tab-practice','tab-mistakes','tab-history','tab-settings']){
  assert(html.includes(`id="${id}"`));
  assert(css.includes('#'+id),`V4 style missing ${id}`);
}
assert(html.indexOf('css/ui-layout-v4.css')>html.indexOf('css/preferences-v0433.css'));
assert(sw.includes("'./css/ui-layout-v4.css'"));
assert(css.includes('.main-nav .nav-btn'));
assert(css.includes('min-height:44px'));
assert(css.includes('#tab-practice .reading-paragraph{font-size:17px'));
assert(css.includes('#tab-practice .answer'));
assert(css.includes('#tab-settings #settingsInformation.tt-information-fold'));
assert(css.includes('@media(max-width:700px)'));
assert(!css.includes('display:none!important'));
assert(!/@import|url\(/.test(css));
assert(read('js/core.js').includes("const KEY='toeic-trainer-v01:learning-state'"));
assert(read('js/preferences.js').includes("const SUITE_KEY='gm-suite:appearance-v1'"));
assert(read('index.html').includes('id="toeicSuiteAppearanceStrip"'));
console.log('PASS: TOEIC six pages, long English, 44px exam targets, dark/theme inheritance and offline asset');
