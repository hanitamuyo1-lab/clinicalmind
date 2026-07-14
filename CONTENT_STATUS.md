# Content status

All **81 conditions** across 12 body systems are fully authored and live —
mechanism map (10 nodes + edges), pathophysiology summary + cascade,
priorities, interventions, clinical links, flashcards, and quiz for each.

Data was extracted from the full `Study Hub.dc.html` design source
(`design-reference/`) via `tools/build.mjs`, which serializes the prototype's
authored data to `tools/out.json`, then regenerated into `src/data/*.js`.

## Refreshing the data

If the design source changes, rebuild `tools/build.mjs` from the HTML's
`<script type="text/x-dc">` body (stub `DCLogic`/`document`, keep the
serialization footer), run `node tools/build.mjs`, then regenerate the
`src/data/*.js` modules from the resulting `tools/out.json`.
