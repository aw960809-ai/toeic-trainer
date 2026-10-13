/* V5 phase 3: source-specific settings CSS dedup and cascade guard. */
'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const cp=require('node:child_process');
const root=path.resolve(__dirname,'..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const css=read('css/preferences-v0433.css');
assert(!css.includes('#tab-settings .settings-heading{margin:6px 0 11px}'));
assert(css.includes('#tab-settings .settings-heading{margin:4px 0 5px}'));
assert.equal((css.match(/#tab-settings \.settings-heading h1\{font-size:20px\}/g)||[]).length,1);
assert(read('css/ui-layout-v4.css').includes('UI-LAYOUT-V4'));
assert(read('js/core.js').includes('toeic-trainer-v01:learning-state'));
assert(read('docs/CSS_OWNERSHIP_V5.md').includes('Chromium'));
cp.execFileSync('python3',['tools/css_cascade_audit_v5.py','--self-test'],{cwd:root,stdio:'inherit'});
cp.execFileSync('python3',['tools/css_cascade_audit_v5.py','--project','toeic','--check'],{cwd:root,stdio:'inherit'});
console.log('PASS: TOEIC Trainer V5 CSS duplicate removal and future cascade guard');
