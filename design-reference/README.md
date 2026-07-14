# Handoff: ClinicalMind — Nursing Pathophysiology Study Hub

## Overview
ClinicalMind is a student study hub for nursing students covering pathophysiology across 12 body systems and 81 clinical conditions (cardiac, neuro, respiratory, renal/urology, GI/hepatic, endocrine, haem/onc, immune/infection, MSK, reproductive/OB, dermatological, eyes/ENT). For each condition it provides an interactive mechanism map, a pathophysiology cascade narrative, prioritized nursing actions, structured interventions, clinical pearls/labs/errors/related-conditions, flashcards (with simple spaced-repetition state), and a scored quiz. It also includes a dashboard (streak, stats, continue-studying, review queue), a searchable condition library grouped by system, a global search bar, and static pages (About, FAQ, Privacy Policy, Terms of Service).

## About the Design Files
The bundled HTML file (`Study Hub.dc.html`) is a **design reference** — a working prototype built to demonstrate exact look, feel, copy, and interaction behavior. It is **not production code to copy directly into your codebase.** It uses a proprietary component templating runtime (custom `<sc-if>`/`<sc-for>` tags, `{{ }}` template holes, a `DCLogic`-based class for state) that only works inside its authoring tool and will not run as-is in a normal web app.

**Your task is to recreate this design in your target codebase's existing environment** (React, Vue, Svelte, native mobile, etc.) using its established component patterns, state management, and libraries — or, if no environment exists yet, choose the most appropriate framework and set it up fresh. Treat the HTML file purely as a visual and behavioral reference: open it in a browser to see exact spacing, colors, copy, and animations, and use this README for the structured specification.

## Fidelity
**High-fidelity (hifi).** Every screen has final colors, typography, spacing, copy, and interaction behavior. Recreate pixel-perfectly, including the dark teal/emerald theme, exact font choices, and the specific microcopy used throughout (button labels, empty states, section headers, clinical content).

## Screens / Views

The app is a single-page shell (`<aside>` sidebar + `<main>` content area) that swaps content by a `view` state variable. Views: `dashboard`, `library`, `detail` (condition detail, with `tab` sub-state: `map` | `patho` | `priorities` | `interventions` | `links` | `cards` | `quiz`), `review`, `about`, `faq`, `privacy`, `terms`.

### Global shell
- **Layout**: `display:flex`, full-height. Left `<aside>` fixed width 248px, `border-right:1px solid var(--border)`, sticky, padding `22px 16px`, background `rgba(10,14,13,0.6)` with `backdrop-filter:blur(8px)`. Right `<main>` flex:1, contains a sticky `<header>` (14px 30px padding, border-bottom, blurred dark background) then a content `<div>` with generous padding.
- **Sidebar contents (top to bottom)**:
  1. Logo row: 36×36px white rounded-rect badge (`border-radius:10px`) with a 2px green ring (`box-shadow:0 0 0 2px #1fae57`) and red drop shadow (`0 4px 14px rgba(232,50,50,.35)`); inside, an SVG stethoscope drawn in green (`#1fae57`, stroke 1.4) wrapping around a red plus/cross (`#e83232` fill, two overlapping rounded rects). Next to it: wordmark "Clinical**Mind**" (serif, 18px, "Mind" colored `var(--teal-bright)`) with a small uppercase label "Nurse · Study Hub" beneath (9.5px, letterspacing .14em, `rgba(194,240,234,.42)`).
  2. Primary nav list: Dashboard, Library, Review, About, FAQ, Privacy, Terms — each a row with icon + label; active item highlighted; one item (Review) can carry a numeric badge (pill, `var(--teal-bright)` background, dark text).
  3. Bottom-anchored streak card (`margin-top:auto`): border card showing a 🔥 emoji, serif streak count ("12 days"), small caption, and a row of small day-dots below.
- **Header contents**: a max-width 440px search input (see Search below) on the left; on the right, a "review queue" pill button (pulsing dot + "N cards due" text, clickable → `review` view) and a small uppercase pill (context/status label).

### Dashboard (`view==='dashboard'`)
- Max-width 1080px content column.
- Eyebrow line (uppercase, small, teal-bright, icon + text) then a large serif H1 greeting: "Good evening, **{{learnerName}}**" (first name colored teal-bright), then a supporting paragraph with bolded stat callouts (e.g. "You have **18 flashcards** due…").
- **Stats row**: `display:grid; grid-template-columns:repeat(4,1fr); gap:12px`. Each stat is a bordered card (`border-radius:13px`, padding 16px, subtle teal-tinted background) with a large serif number (27px, teal-bright) and a small uppercase label caption beneath.
- **Two-column feature row**: `grid-template-columns:1.55fr 1fr; gap:16px`.
  - Left, "Continue studying" card: larger bordered card with a subtle diagonal gradient background, uppercase eyebrow ("Continue studying · Mechanism map"), serif title (25px, the in-progress condition name), a description sentence, a progress bar (7px height pill track, gradient fill) + percentage label, and a filled pill CTA button ("Continue" style, dark text on teal-bright background, arrow icon) — clicking opens that condition's detail/map tab.
  - Right, "Review queue" card: bordered card listing 3 upcoming review items, each a clickable row with a small icon chip (colored square/rounded icon showing an emoji per body system), title (truncated with ellipsis), and a caption (e.g. due time/system).
- (Further dashboard sections such as system breakdown / recently viewed may follow the same card-grid visual language — inspect the live file for any additional blocks below this point.)

### Library (`view==='library'`)
- Left rail or top grid of the 12 body systems (id, emoji icon, display name, short descriptor, condition count, percentage of total). Selecting a system filters a list of that system's conditions, each tagged with an urgency level (`critical` / `high` / `mod`) that maps to a colored dot/border (`--critical:#e85d5d`, `--high:#e8a84a`, `--mod:#36d472`). An urgency filter control (`urgFilter`) narrows the visible list to `all` or one urgency tier. Clicking a condition row opens it in `detail` view on the `map` tab.

### Condition detail (`view==='detail'`)
Tab bar across the top with 7 tabs, each rendering one structured section of the condition's authored content object (`entry` + `nodes`/`edges` + `cards` + `quiz`):
1. **Mechanism Map** (`tab==='map'`) — an interactive node/edge diagram (nodes = each `[title, subtitle, detail, clinicalNote]` tuple; edges connect them in the physiological cascade order). Clicking a node reveals its detail text and a "clinical note" callout. This is the flagship interactive visualization of the app.
2. **Pathophysiology** (`tab==='patho'`) — renders `entry.summary` (a dense narrative paragraph) and `entry.cascade` (an ordered list of 5–6 cascade stage strings: Trigger → physiological response → compensation → decompensation → clinical manifestations → end-organ consequences).
3. **Priorities** (`tab==='priorities'`) — renders `entry.priorities`: a ranked list (`rank`, `title`, `rationale`, `urgency: immediate|urgent|monitor`), each shown as a card with a rank badge and an urgency-colored tag.
4. **Interventions** (`tab==='interventions'`) — renders `entry.interventions`: grouped by `category` (Rapid assessment, Monitoring, Pharmacological, Non-pharmacological, Escalation and safety, Patient and family education), each category a bordered section with a bullet list of `actions`.
5. **Clinical Links** (`tab==='links'`) — renders `entry.links`: a highlighted "pearl" callout (a single clinically important insight), a `keyLabs` bullet list, an `errors` ("common pitfalls") bullet list, and a `related` list of clickable condition-name chips that navigate to other conditions.
6. **Flashcards** (`tab==='cards'`) — renders the `cards` array (`{q, a}` pairs) as a flip-card study interface with simple progress tracking (reviewed count) and next/prev navigation.
7. **Quiz** (`tab==='quiz'`) — renders the `quiz` array (`{q, opts:[4 strings], answer:index, explain}`) as a single-question-at-a-time multiple choice quiz with immediate feedback (correct/incorrect + explanation), running score, and a finished/summary state.

### Review (`view==='review'`)
Spaced-repetition style review queue aggregating due flashcards across conditions (see Review queue dashboard card for entry point).

### About / FAQ / Privacy / Terms (static content views)
Each is a simple centered content column, max-width ~760px:
- **About**: serif H1 + subtitle, then prose sections describing the product's purpose and audience.
- **FAQ**: serif H1 + subtitle, then an accordion or stacked list of Q/A bordered cards.
- **Privacy**: serif H1 ("Privacy policy") + subtitle, then a list of bordered sections (title + body paragraph), covering topics like local storage of progress, no account/no server data collection, etc.
- **Terms**: serif H1 ("Terms of service") + subtitle "Please read before using ClinicalMind for study.", then 7 bordered sections rendered from a `termsSections` array of `{title, body}`:
  1. Acceptance of terms
  2. Educational purpose only
  3. No warranty of accuracy
  4. No liability for clinical decisions
  5. Acceptable use
  6. Local data and your responsibility
  7. Changes to these terms
  
  Each section card: `border:1px solid var(--border); border-radius:13px; padding:18px 20px; background:rgba(15,107,94,0.05)`, with a 13.5px medium-weight white title and a 12.5px, 1.6 line-height, muted-teal body paragraph. See exact copy in `Study Hub.dc.html` (search for `termsSections`) — reproduce verbatim, this is legal/informational copy.

## Interactions & Behavior

### Search (header search bar)
- Controlled text input bound to `search` state; `onChange` updates it live.
- `searchFocused` boolean toggled on focus/blur (blur has a 150ms delay via `setTimeout` so a result click registers before the dropdown unmounts — replicate this in the target framework, e.g. via `onMouseDown` on results instead of `onClick`, or a blur delay).
- While focused with a non-empty trimmed query, a dropdown panel appears below the input (`position:absolute`, dark card, `box-shadow:0 18px 40px rgba(0,0,0,.5)`, max-height 360px, scrollable) showing up to 8 matching conditions (case-insensitive substring match on condition name across all 12 systems), each row showing an urgency-colored dot, the condition name, and its system name. Clicking a row navigates to that condition's detail view (map tab) and clears/unfocuses the search.
- Pressing Enter in the input jumps directly to the first matching condition (if any).
- An "✕" clear button appears inside the input (right side) whenever there is text; clicking clears the query.
- Empty-state: if focused with a query but no matches, show "No conditions match "{{query}}"" centered in the dropdown.

### Navigation
- Sidebar nav items are simple state-setters: clicking sets `view` (and resets sub-state like `tab` or `conditionId` where relevant).
- Condition cards/rows (dashboard continue-card, review queue rows, library rows, search results, related-condition chips) all navigate to `detail` view with `tab:'map'` and the appropriate `conditionId`/`selectedSystem` set.
- Detail-view tab bar: clicking a tab sets `tab` without leaving `detail` view or resetting `conditionId`.

### Flashcards tab
- Card flip on click/tap (reveal answer).
- Next/previous controls advance `cardIndex`; track a `reviewed` counter.

### Quiz tab
- Selecting an option locks in the answer (`qAnswered:true`), shows correct/incorrect styling and the `explain` text, and updates `qScore`.
- "Next question" advances `qIndex`; reaching the end sets `quizDone:true` and shows a final score summary.

### Streak / stats
- Streak card and day-dots are presentational (derived from persisted study-activity state — no complex logic beyond counting consecutive days with recorded activity).

## State Management
Recreate as whatever state-management approach fits your target framework/codebase (e.g. React `useState`/`useReducer`/Zustand, Vue `ref`/Pinia, etc.). Key state needed:

- `view`: `'dashboard' | 'library' | 'detail' | 'review' | 'about' | 'faq' | 'privacy' | 'terms'`
- `tab`: `'map' | 'patho' | 'priorities' | 'interventions' | 'links' | 'cards' | 'quiz'` (only relevant when `view==='detail'`)
- `conditionId`: string — the currently open condition's name (key into the conditions data, e.g. `'Heart failure'`)
- `selectedSystem`: string — currently selected body-system id in the Library (e.g. `'cardiac'`)
- `urgFilter`: `'all' | 'critical' | 'high' | 'mod'` — library urgency filter
- `search`: string — header search query
- `searchFocused`: boolean — whether the search input is focused (controls dropdown visibility)
- `selectedNode`: mechanism-map node currently expanded/selected, per condition
- Flashcard progress per condition: `cardIndex`, `flipped`, `reviewed`
- Quiz progress per condition: `qIndex`, `qSelected`, `qAnswered`, `qScore`, `qFinished`
- Study streak / stats: persisted count of consecutive study days, total conditions explored, cards reviewed, quiz average, etc. (drives the dashboard stat cards and streak widget)
- Spaced-repetition "explored"/"due" bookkeeping for the review queue (which cards are due, across which conditions)

No backend/data-fetching is required — all condition content is static, authored data (see Data Model below). Progress/streak state should persist client-side (e.g. localStorage) since there is no account system.

## Design Tokens

### Colors (CSS custom properties in the source — copy exact hex/rgba values)
```
--black:      #0a0e0d
--black2:     #111815
--black3:     #172220
--teal:       #0f6b5e
--teal-mid:   #1a9080
--teal-bright:#25c4a8
--teal-light: #7ae0cf
--teal-pale:  #c2f0ea
--green-mid:  #27a05f
--green-bright:#36d472
--white:      #f0faf7
--white2:     #e2f5ef
--critical:   #e85d5d
--high:       #e8a84a
--mod:        #36d472
--border:     rgba(37,196,168,0.18)
--border2:    rgba(37,196,168,0.38)
```
Logo-specific accents (not tokenized, used inline): green ring `#1fae57`, red cross `#e83232`.

Background: solid `#0a0e0d` base with a radial gradient accent `radial-gradient(circle at 88% -10%, rgba(15,107,94,...) ...)` (see `<div style="...background-image:radial-gradient(...)">` on the root wrapper for exact stops).

### Typography
```
--serif: 'DM Serif Display', Georgia, serif   → headings, big numbers, streak count
--sans:  'DM Sans', system-ui, sans-serif      → body text, UI chrome
```
Base body: `font-weight:300` (light), color `var(--white)`.
Common sizes observed: H1 greeting 38px (serif, line-height 1.08, letter-spacing -.03em); card titles 25px (serif); stat numbers 27px (serif); section eyebrows 10–11px uppercase with `letter-spacing:.1em–.14em`; body/paragraph 13–14px, `line-height:1.6`; captions 9.5–12.5px, muted via `rgba(194,240,234, .42–.6)` opacity steps.

### Spacing / radius / shadow
- Card border-radius: 13–16px (small chips/pills use 8–10px or `99px` for full pill shapes).
- Card padding: commonly 16–22px.
- Grid/flex gaps: 8–16px depending on density.
- Borders: 1px solid, using `--border` (subtle) or `--border2` (more emphasized, e.g. featured card).
- Card shadows: mostly borderless/flat with subtle background tints (`rgba(15,107,94,0.05–0.2)`); the logo badge uses a more pronounced shadow: `0 4px 14px rgba(232,50,50,0.35)` plus a `0 0 0 2px #1fae57` ring.
- Header/sidebar use `backdrop-filter:blur(8px)` over semi-transparent dark backgrounds for a sticky glass effect.

## Assets
- **Logo**: hand-drawn inline SVG (no external asset file) — a white rounded-square badge (36×36px, `border-radius:10px`) containing a green stethoscope outline (`viewBox="0 0 24 24"`, stroke `#1fae57`, `stroke-width:1.4`, rounded caps, includes a small circle for the earpiece/chestpiece) wrapped around a red medical cross (two overlapping rounded rectangles, fill `#e83232`). Recreate as SVG/icon component; do not rasterize.
- **Fonts**: Google Fonts — DM Serif Display, DM Sans. Load via `<link>`/`@import` or self-host per your codebase's font strategy.
- **Icons**: small inline SVGs throughout (search icon, chevron/arrow icons, clear "✕") — simple line icons, `stroke-width` ~1.5–1.8, rounded joins/caps, sized 14–19px. Emoji are used directly for system icons (🔥 streak, and one emoji per body system e.g. 🛡️ for Immune/Infection) and stat card icons — no icon library dependency.

## Data Model (condition content)
Each condition is a data object with:
```js
{
  edges: [...],           // shared cascade edge definitions
  nodes: mapFrom([         // array of [title, subtitle, detail, clinicalNote] tuples → mechanism map nodes
    ["Node title", "Short subtitle", "Longer explanatory detail paragraph", "Clinical pearl/note for this node"],
    ...
  ]),
  entry: {
    summary: "Dense narrative paragraph tying the whole mechanism together.",
    cascade: ["Trigger — ...", "Physiological response — ...", "Compensation — ...", "Decompensation — ...", "Clinical manifestations — ...", "End-organ consequences — ..."],
    priorities: [{rank:1, title:"...", rationale:"...", urgency:"immediate|urgent|monitor"}, ...],
    interventions: [{category:"Rapid assessment|Monitoring|Pharmacological|Non-pharmacological|Escalation and safety|Patient and family education", actions:["...", "..."]}, ...],
    links: {
      pearl: "Single high-value clinical insight.",
      keyLabs: ["...", "..."],
      errors: ["...", "..."],
      related: ["Other Condition Name", "..."]  // clickable chips → navigate to that condition
    }
  },
  cards: [{q:"...", a:"..."}, ...],           // flashcards
  quiz: [{q:"...", opts:["a","b","c","d"], answer:0, explain:"..."}, ...]  // MCQs
}
```
There are 81 such condition objects across 12 body systems (see `CONDS` map in the source for the system → condition-name → urgency-tier index, and the large data object further down the file for the full authored content per condition). When recreating in the target codebase, this content should be extracted into structured data files (e.g. JSON or per-condition modules) rather than re-typed — copy the authored English content verbatim; it is the product's core value and was carefully written for clinical accuracy and teaching quality.

## Files
- `Study Hub.dc.html` — the full design reference/prototype (all screens, all 81 conditions' authored content, all interaction logic). This is the primary source to inspect for exact copy, styling values, and behavior not fully captured above.
- `support.js` — internal runtime helper for the authoring tool; **not needed** in the target codebase (it only supports the proprietary `.dc.html` template format). Do not port this file — it has no equivalent purpose in a standard web app.
