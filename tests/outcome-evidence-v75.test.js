'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const Core=require('../js/core.js');
const Review=require('../js/review-v74.js');
const script=fs.readFileSync(require('node:path').join(__dirname,'../js/app.js'),'utf8');
assert(script.includes('event.reviewDueIds=reviewDueIds;'));
assert(script.includes('event.reviewCorrectIds=reviewCorrectIds;'));
assert(script.includes('event.reviewMasteredIds=reviewMasteredIds;'));
assert(script.includes('Review.isDue(before,markedAt)'));
const prior={wrong:1,correct:0,reviewStage:3,dueAt:'2026-10-01T00:00:00Z',mastered:false};
const after=Review.recordWritten(prior,true,new Date('2026-10-18T00:00:00Z'),{masteryConfirmed:true});
assert.equal(after.mastered,true);
const e=Core.createSession({id:'tt-evidence-20261018',date:'2026-10-18',
 mode:'mistakes',unit:'review',part:5,seconds:125,answered:2,correct:1,questionIds:['a','b']});
e.reviewDueIds=['a'];e.reviewCorrectIds=['a'];e.reviewMasteredIds=['a'];
const restored=Core.normalized({...Core.fresh(),sessions:[e]});
assert.deepEqual(restored.sessions[0].reviewDueIds,['a']);
console.log('PASS: TOEIC evidence fields survive Schema 1 backup normalization without changing SRS');
