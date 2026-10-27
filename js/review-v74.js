/* TOEIC Trainer V7.4 — due-only review, mastery and same-skill variations.
 * No storage, network, UI or Goal Manager writes. Old review/state IDs are unchanged.
 */
(function (root, factory) {
  'use strict';
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.ToeicTrainerReviewV74 = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';
  const DAY = 86400000;
  const MINUTE = 60000;
  const STAGES = Object.freeze([10 * MINUTE, DAY, 3 * DAY, 7 * DAY]);
  const asList = value => Array.isArray(value) ? value : [];
  const safeRecord = value => value && typeof value === 'object' && !Array.isArray(value) ? value : {};
  const clamp = value => Math.max(0, Math.min(3, Math.floor(Number(value) || 0)));
  function nowDate(now) {
    const date = now instanceof Date ? now : new Date(now);
    if (!Number.isFinite(date.getTime())) throw new Error('Invalid review clock');
    return date;
  }
  function stage(record) {
    const r = safeRecord(record);
    if (!(Number(r.wrong) > 0)) return -1;
    if (r.mastered === true) return 4;
    if (Number.isInteger(r.reviewStage)) return clamp(r.reviewStage);
    // Legacy records have 'streak' and 'dueAt', but no progress metadata.
    // Do not silently mark historical records as mastered during migration.
    return clamp(r.streak);
  }
  function reviewStatus(record, now = new Date()) {
    const r = safeRecord(record);
    if (!(Number(r.wrong) > 0)) return 'unseen';
    if (r.mastered === true) return 'mastered';
    const due = Date.parse(r.dueAt || '');
    return !Number.isFinite(due) || due <= nowDate(now).getTime() ? 'due' : 'waiting';
  }
  function isDue(record, now = new Date()) {
    return reviewStatus(record, now) === 'due';
  }
  function recordWritten(previous, correct, now = new Date(), options = {}) {
    const at = nowDate(now);
    const before = safeRecord(previous);
    const oldStage = stage(before);
    const stats = {
      ...before,
      correct: (Number(before.correct) || 0) + (correct ? 1 : 0),
      wrong: (Number(before.wrong) || 0) + (correct ? 0 : 1),
      streak: correct ? (Number(before.streak) || 0) + 1 : 0,
      lastAt: at.toISOString()
    };
    if (!correct) {
      // A failed review steps back exactly one stage; it never resets all progress.
      // -1 (unseen) and 0 remain at 0; mastered (4) steps back to 3.
      const retryStage = Math.max(0, Math.max(0, oldStage) - 1);
      return { ...stats, reviewStage: retryStage, mastered: false, masteryAt: null,
        masteryPending: false, dueAt: new Date(at.getTime() + STAGES[retryStage]).toISOString() };
    }
    if (oldStage === -1) {
      // Never create a mistake review just because an unseen question was answered correctly.
      return { ...stats, dueAt: new Date(at.getTime() + DAY).toISOString() };
    }
    if (oldStage === 4) {
      // Correct free practice cannot undo a completed review. A later error can.
      return { ...stats, reviewStage: 4, mastered: true, masteryPending: false, dueAt: null };
    }
    if (!isDue(before, at)) {
      // A premature success still counts in accuracy, but cannot skip the due date.
      return { ...stats, reviewStage: oldStage, mastered: false, dueAt: before.dueAt };
    }
    if (oldStage === 3) {
      if (options.masteryConfirmed === false) {
        // A failed same-skill check prevents false mastery. Try again tomorrow.
        return { ...stats, reviewStage: 3, mastered: false, masteryPending: true,
          dueAt: new Date(at.getTime() + DAY).toISOString() };
      }
      return { ...stats, reviewStage: 4, mastered: true, masteryPending: false,
        masteryAt: at.toISOString(), dueAt: null };
    }
    const nextStage = oldStage + 1;
    return { ...stats, reviewStage: nextStage, mastered: false, masteryPending: false,
      dueAt: new Date(at.getTime() + STAGES[nextStage]).toISOString() };
  }
  function recordVocab(previous, correct, coreNextReview, now = new Date()) {
    if (typeof coreNextReview !== 'function') throw new Error('Missing existing vocabulary scheduler');
    const at = nowDate(now);
    const before = safeRecord(previous);
    const updated = coreNextReview(previous, correct ? 'good' : 'again', at);
    if (!correct || !before.dueAt) return updated;
    const due = Date.parse(before.dueAt);
    if (Number.isFinite(due) && due > at.getTime()) {
      // Preserve the original 2/4/7/14/30 day SRS and stop early practice
      // from silently advancing a vocabulary card to the next interval.
      return { ...updated,
        repetitions: Number(before.repetitions) || 0,
        intervalDays: Number(before.intervalDays) || 0,
        dueAt: before.dueAt };
    }
    return updated;
  }
  function nextDue(questionStats, now = new Date()) {
    const limit = nowDate(now).getTime();
    let earliest = Infinity;
    for (const record of Object.values(safeRecord(questionStats))) {
      if (reviewStatus(record, limit) !== 'waiting') continue;
      const due = Date.parse(record.dueAt);
      if (Number.isFinite(due) && due < earliest) earliest = due;
    }
    return Number.isFinite(earliest) ? new Date(earliest).toISOString() : null;
  }
  function reviewLabel(record) {
    const s = stage(record);
    if (s === -1) return '尚未列入錯題';
    if (s === 4) return '已掌握';
    if (safeRecord(record).masteryPending) return '待跨題驗證';
    return ['短期重測', '第 1 階段', '第 2 階段', '第 3 階段'][s];
  }
  function questionKey(q) {
    if (!q || ![5, 6, 7].includes(q.part)) return null;
    if (q.part < 7) {
      const topic = String(q.grammarTopic || q.tag || '').toLowerCase().trim();
      return topic ? 'grammar:' + topic : null;
    }
    const topic = String(q.skill || q.tag || '').toLowerCase().trim().replace(/^reading-/, '');
    if (!topic) return null;
    const replace = [
      [/cause|reason|explanation|root-cause/, 'cause'],
      [/condition|contingen|rule-application|eligib|requirement/, 'condition'],
      [/inferen|deduction/, 'inference'],
      [/deadline|schedule|timeline|time|sequence/, 'time'],
      [/purpose|main-idea|summary/, 'purpose'],
      [/location|route|direction/, 'location'],
      [/exception|restriction|exclusion/, 'exception'],
      [/detail|evidence|status/, 'detail'],
      [/comparison|contrast|distinction|difference/, 'comparison'],
      [/outcome|result|consequence|effect/, 'result'],
      [/procedure|step|process|action|solution/, 'process']
    ];
    return 'reading:' + (replace.find(([regex]) => regex.test(topic))?.[1] || topic);
  }
  function documentKey(q) {
    return q?.readingId || q?.docGroup || q?.passage || q?.id || '';
  }
  function chooseVariations(originals, bank, questionStats = {}, {
    count = 0, sessions = [], random = Math.random, allowed = null
  } = {}) {
    const chosen = [], pairs = [], used = new Set(asList(originals).map(q => q.id));
    const stats = safeRecord(questionStats);
    const limit = Math.max(0, Math.floor(Number(count) || 0));
    const recent = new Set();
    for (const session of asList(sessions).slice(-5)) {
      for (const id of asList(session?.questionIds)) recent.add(id);
    }
    for (const original of asList(originals)) {
      if (chosen.length >= limit) break;
      const key = questionKey(original);
      if (!key) continue;
      const candidates = asList(bank).filter(q => q && !used.has(q.id) && q.id !== original.id &&
        questionKey(q) === key && documentKey(q) !== documentKey(original) &&
        (original.part === 7 ? q.part === 7 : q.part === 5) &&
        Array.isArray(q.options) && q.options.length === 4 && q.question && q.reason &&
        Number(stats[q.id]?.wrong || 0) === 0 &&
        (typeof allowed !== 'function' || allowed(q)));
      if (!candidates.length) continue; // Never manufacture or pretend to find a verified variant.
      const eligibleGroups = candidates.map(q => {
        // Preserve all questions belonging to an alternate Part 7 document.
        // Displaying one isolated question from a 5-question article would
        // violate the existing full-document bundle policy.
        const group = original.part === 7
          ? asList(bank).filter(other => other.part === 7 && documentKey(other) === documentKey(q))
          : [q];
        const valid = group.length > 0 && group.length <= limit - chosen.length &&
          group.every(other => !used.has(other.id) &&
            Number(stats[other.id]?.wrong || 0) === 0 &&
            Array.isArray(other.options) && other.options.length === 4 &&
            (typeof allowed !== 'function' || allowed(other)));
        if (!valid) return null;
        return { q, group, history: group.some(other => recent.has(other.id)) ? 2 : 0,
          seen: group.some(other => stats[other.id]) ? 1 : 0,
          random: Math.max(0, Math.min(.999999, Number(random()) || 0)) };
      }).filter(Boolean);
      if (!eligibleGroups.length) continue;
      eligibleGroups.sort((a, b) => a.history - b.history || a.seen - b.seen || a.random - b.random);
      const alternate = eligibleGroups[0];
      for (const q of alternate.group) { used.add(q.id); chosen.push(q); }
      pairs.push({ originalId: original.id, variantId: alternate.q.id });
    }
    return { items: chosen, pairs };
  }
  return Object.freeze({ STAGES, stage, reviewStatus, isDue,
    recordWritten, recordVocab, nextDue, reviewLabel, questionKey, chooseVariations });
});
