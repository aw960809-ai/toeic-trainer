'use strict';
/* V7.4 review regression: deterministic synthetic learning history, no browser storage. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const Review = require('../js/review-v74.js');
const Core = require('../js/core.js');
const Exam = require('../js/exam.js');
const text = rel => fs.readFileSync(path.join(root, rel), 'utf8');
const t = new Date('2026-10-17T02:00:00Z');
const after = (date, millis) => new Date(date.getTime() + millis);
const MINUTE = 60000, DAY = 86400000;

// Error -> exactly 10 minutes -> one day -> three days -> seven days -> mastered.
let record = Review.recordWritten(null, false, t);
assert.equal(record.correct, 0);
assert.equal(record.wrong, 1);
assert.equal(record.reviewStage, 0);
assert.equal(record.dueAt, after(t, 10 * MINUTE).toISOString());
assert.equal(Review.reviewStatus(record, t), 'waiting');
assert(!Review.isDue(record, after(t, 10 * MINUTE - 1)));
assert(Review.isDue(record, after(t, 10 * MINUTE)));
const early = Review.recordWritten(record, true, after(t, 2 * MINUTE));
assert.equal(early.correct, 1, 'premature practice still counts in accuracy');
assert.equal(early.reviewStage, 0, 'premature practice cannot skip the 10 minute wait');
assert.equal(early.dueAt, record.dueAt);
const t1 = after(t, 10 * MINUTE);
record = Review.recordWritten(early, true, t1);
assert.equal(record.reviewStage, 1);
assert.equal(record.dueAt, after(t1, DAY).toISOString());
assert(!Review.isDue(record, after(t1, DAY - 1)));
const t2 = after(t1, DAY);
record = Review.recordWritten(record, true, t2);
assert.equal(record.reviewStage, 2);
assert.equal(record.dueAt, after(t2, 3 * DAY).toISOString());
const t3 = after(t2, 3 * DAY);
record = Review.recordWritten(record, true, t3);
assert.equal(record.reviewStage, 3);
assert.equal(record.dueAt, after(t3, 7 * DAY).toISOString());
const t4 = after(t3, 7 * DAY);
record = Review.recordWritten(record, true, t4);
assert.equal(record.mastered, true);
assert.equal(record.reviewStage, 4);
assert.equal(record.dueAt, null);
assert.equal(Review.reviewStatus(record, after(t4, 999 * DAY)), 'mastered');
assert(!Review.isDue(record, after(t4, 999 * DAY)), 'mastery exits review queue');
const stillMastered = Review.recordWritten(record, true, after(t4, 2 * DAY));
assert.equal(stillMastered.mastered, true);
const relapsed = Review.recordWritten(stillMastered, false, after(t4, 3 * DAY));
assert.equal(relapsed.mastered, false);
assert.equal(relapsed.reviewStage, 0);
assert.equal(relapsed.dueAt, after(after(t4, 3 * DAY), 10 * MINUTE).toISOString());
assert.equal(relapsed.wrong, 2);

// Last-stage success needs correct evidence from a linked variant if one exists.
const pending = Review.recordWritten({ wrong: 1, correct: 3, streak: 3,
  reviewStage: 3, dueAt: t.toISOString(), mastered: false }, true, t,
{ masteryConfirmed: false });
assert.equal(pending.mastered, false);
assert.equal(pending.masteryPending, true);
assert.equal(pending.reviewStage, 3);
assert.equal(pending.dueAt, after(t, DAY).toISOString());
assert.equal(Review.reviewLabel(pending), '待跨題驗證');
const confirmed = Review.recordWritten(pending, true, after(t, DAY), { masteryConfirmed: true });
assert.equal(confirmed.mastered, true);

// Old persisted state and its historical event IDs are not migrated or rewritten.
const historical = { appId: Core.APP_ID, schema: Core.SCHEMA, review: {
  v001: { repetitions: 3, intervalDays: 7, dueAt: '2026-10-31T00:00:00Z' }
}, questionStats: { 'p5-01': { correct: 4, wrong: 2, streak: 2,
  dueAt: after(t, 3 * DAY).toISOString(), lastAt: t.toISOString() } },
  sessions: [{ appId: Core.APP_ID, schema: 1, id: 'tt-legacy-20261017', seconds: 120,
    date: '2026-10-17', questionIds: ['p5-01'] }] };
const restored = Core.normalized(historical);
assert.deepEqual(restored.questionStats, historical.questionStats);
assert.deepEqual(restored.review, historical.review);
assert.deepEqual(restored.sessions, historical.sessions);
const old = restored.questionStats['p5-01'];
assert.equal(Review.stage(old), 2);
assert.equal(Review.reviewStatus(old, t), 'waiting');
assert.equal(Review.reviewStatus(old, after(t, 3 * DAY)), 'due');
const legacyAdvance = Review.recordWritten(old, true, after(t, 3 * DAY));
assert.equal(legacyAdvance.reviewStage, 3);
const legacyNoMaster = { correct: 10, wrong: 1, streak: 9, dueAt: after(t, -DAY).toISOString() };
assert.equal(Review.stage(legacyNoMaster), 3, 'legacy successes do not retroactively master');

// Vocabulary continues using the original 2,4,7,14,30-day scheduler.
let vocab = Review.recordVocab(null, true, Core.nextReview, t);
assert.equal(vocab.intervalDays, 2);
const vocabTooSoon = Review.recordVocab(vocab, true, Core.nextReview, after(t, DAY));
assert.equal(vocabTooSoon.repetitions, vocab.repetitions);
assert.equal(vocabTooSoon.dueAt, vocab.dueAt);
assert.equal(vocabTooSoon.times, vocab.times + 1);
vocab = Review.recordVocab(vocabTooSoon, true, Core.nextReview, after(t, 2 * DAY));
assert.equal(vocab.intervalDays, 4);
vocab = Review.recordVocab(vocab, true, Core.nextReview, after(t, 6 * DAY));
assert.equal(vocab.intervalDays, 7);
vocab = Review.recordVocab(vocab, true, Core.nextReview, after(t, 13 * DAY));
assert.equal(vocab.intervalDays, 14);
vocab = Review.recordVocab(vocab, true, Core.nextReview, after(t, 27 * DAY));
assert.equal(vocab.intervalDays, 30);
vocab = Review.recordVocab(vocab, false, Core.nextReview, after(t, 28 * DAY));
assert.equal(vocab.repetitions, 0);
assert.equal(vocab.intervalDays, 0);
assert.equal(vocab.dueAt, after(after(t, 28 * DAY), 10 * MINUTE).toISOString());

// Real authored bank, not only artificial examples: variants require same skill
// and DIFFERENT source context, with stable IDs, valid answer keys, no duplicates.
const context = {};
for (const rel of ['data/content.js','data/advanced.js','data/v04_bank.js',
 'data/v041_progression.js','data/v042_official.js','data/v73-authored.js']) {
 vm.runInNewContext(text(rel), context, { filename: rel });
}
const sources = [context.ToeicTrainerContent, context.ToeicTrainerAdvanced,
 context.ToeicTrainerV04, context.ToeicTrainerV041,
 context.ToeicTrainerV042, context.ToeicTrainerV73Authored];
const written = sources.flatMap(s => (s.questions || []).filter(q => q.part >= 5));
assert.equal(written.length, 737);
assert.equal(new Set(written.map(q => q.id)).size, written.length);
const targets = written.filter(q => q.part === 5 && q.grammarTopic === 'tense');
const target = targets[0];
assert(target);
const next = Review.chooseVariations([target], written, {}, { count: 1, random: () => .123 });
assert.equal(next.items.length, 1);
assert.equal(next.pairs[0].originalId, target.id);
assert.equal(next.pairs[0].variantId, next.items[0].id);
assert.equal(next.items[0].part, 5);
assert.equal(Review.questionKey(next.items[0]), Review.questionKey(target));
assert.notEqual(next.items[0].id, target.id);
const variant = next.items[0];
const group = targets.slice(0, 6);
const several = Review.chooseVariations(group, written, {}, { count: 4, random: () => .2 });
assert(several.items.length <= 4);
assert.equal(new Set(several.items.map(q => q.id)).size, several.items.length);
assert(several.items.every(q => !group.some(g => g.id === q.id)));
assert(several.pairs.every(pair => group.some(q => q.id === pair.originalId) &&
  several.items.some(q => q.id === pair.variantId)));
const noWrong = Review.chooseVariations([target], written,
 { [variant.id]: { wrong: 1 } }, { count: 1, random: () => .123 });
assert(noWrong.items.every(q => q.id !== variant.id));
const excludeAll = Review.chooseVariations([target], written, {}, { count: 2, allowed: () => false });
assert.deepEqual(excludeAll, { items: [], pairs: [] });
const readingTarget = written.find(q => q.part === 7 && q.tag === 'reading-cause' && q.readingId);
assert(readingTarget);
const readingNext = Review.chooseVariations([readingTarget], written, {},
  { count: 5, random: () => .456 });
assert(readingNext.items.length >= 2 && readingNext.items.length <= 5);
const matchingReadingItem = readingNext.items.find(q => q.id === readingNext.pairs[0].variantId);
assert(matchingReadingItem);
assert.notEqual(matchingReadingItem.readingId, readingTarget.readingId);
assert.equal(Review.questionKey(matchingReadingItem), Review.questionKey(readingTarget));
assert(matchingReadingItem.passage.length > 20, 'retain alternate article context');
assert(readingNext.items.every(q => q.readingId === matchingReadingItem.readingId &&
  q.passage === matchingReadingItem.passage), 'keep complete alternate document group');
const tooSmall = Review.chooseVariations([readingTarget], written, {}, { count: 1 });
assert.equal(tooSmall.items.length, 0, 'never break multi-question reading bundles');
const qIndex = new Map(written.map(q => [q.id, q]));
for (const q of next.items.concat(readingNext.items)) {
  const draft = Exam.start([q], { context: q.part === 7 ? 'reading' : 'grammar', mode: 'mistakes' });
  const answered = Exam.answer(draft, q.id, q.answer);
  assert.equal(Exam.score(answered, [q]).correct, 1);
  assert(qIndex.get(q.id), 'variant must be a real audited item');
}

// The application must actually use V7.4 for written practice, guided reading,
// vocabulary, review-pool filtering and persistent in-draft pair links.
const app = text('js/app.js'), html = text('index.html'), sw = text('sw.js');
for (const token of ['Review.isDue(', 'Review.recordWritten(', 'Review.recordVocab(',
 'Review.chooseVariations(', 'reviewPairs', 'Review.reviewLabel(',
 'Review.nextDue(', 'const Review=window.ToeicTrainerReviewV74']) {
  assert(app.includes(token), 'Review integration missing: ' + token);
}
assert(html.indexOf('js/review-v74.js') > html.indexOf('js/smart-random-v72.js'));
assert(html.indexOf('js/review-v74.js') < html.indexOf('js/app.js'));
assert(sw.includes("'./js/review-v74.js'"));
assert(app.includes('Core.normalized(JSON.parse(JSON.stringify(state)))'));
assert(app.includes('window.ToeicTrainerAutoSync?.notifyCompleted(event,{window})'));
assert(!text('js/review-v74.js').includes('localStorage.'));
assert(!text('js/review-v74.js').includes('lawLangGoalSystemV92'));
console.log('PASS V7.4: due-only 10min/1d/3d/7d, verified mastery/relapse, immutable legacy data, stable vocabulary SRS, real cross-context variations, safe scoring and app wiring');
