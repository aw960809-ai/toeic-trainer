# TOEIC Trainer V0.5.1 — independent Android PWA

**Independent GitHub Pages project**: `https://aw960809-ai.github.io/toeic-trainer/` (only after `aw960809-ai/toeic-trainer` is created and deployed).

- Separate PWA manifest id/scope `/toeic-trainer/`, separate icon / service worker cache namespace.
- Same HTTPS origin `aw960809-ai.github.io` as Goal Manager at `/my-goal-manager/`, so the **same Chrome profile** can share only the well-defined localStorage learning events.
- Trainer's original localStorage key `toeic-trainer-v01:learning-state` (Schema 1) remains unchanged; old sessions, SRS, corrections, word bank are not migrated automatically from `127.0.0.1:8766`.
- New opt-in key `toeic-trainer:v051-link-settings` deliberately does **not** accept the previous nested-site consent.
- All three TOEIC training modules still defer answers and explanations until whole-paper submission. No audio/listening section.

## Deploy
1. On GitHub, create an **empty public repository** `aw960809-ai/toeic-trainer` (no auto README).
2. On your Termux device, publish the locally prepared `~/goal-manager-work/toeic-v051-independent-site` folder to that repository using the companion deployment script, or GitHub Desktop.
3. Set repo **Settings → Pages → Source = GitHub Actions**, and wait for the supplied workflow to show success.
4. Open the exact project URL **in Chrome**; install the new TOEIC PWA from Chrome's menu (not from the old Goal Manager PWA). Keep Goal Manager installed.
5. If your old history was on `http://127.0.0.1:8766`, export backup there and import in the new app once; check sessions and SRS **before** enabling linkage.
6. The Goal Manager link and v0.5.1 data concurrency patch must be separately reviewed/deployed. Only after live tests and an extra Goal Manager backup should linkage be enabled.

## QA
Run `npm test` in the source repo; the GitHub Pages workflow runs the tests before publishing.
The existing 640 Part 5–7 written questions and 800 vocabulary cards have not been rewritten or rekeyed. Machine checks do not certify all answers semantically.
