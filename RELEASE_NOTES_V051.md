# TOEIC Trainer V0.5.1

- Relocated into an independent `/toeic-trainer/` Github Pages project; Goal Manager remains at `/my-goal-manager/`.
- Manifest PWA ID, start_url, scope and service-worker cache prefix now distinct.
- New `v051` linkage opt-in key; older embedded-app consent cannot silently activate the new app.
- Corrected Goal Manager navigation URL from parent-folder `../../` to `/my-goal-manager/`.
- Preserved source learning state, score logs, drafts and SRS keys, 640 questions / 800 words.
- New standalone PWA and integration tests; no database changes.

**Not automatically deployed.** Do not enable sync until Goal Manager V98.13.7 safety patch and Android cross-tab tests are complete.
