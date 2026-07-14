# ClinicalMind — Nurse Study Hub

React implementation of the `Study Hub.dc.html` design: a pathophysiology study
hub for nursing students covering 12 body systems, each with a mechanism map,
pathophysiology, priorities, interventions, clinical links, flashcards and a quiz.

## Content status

17 conditions (including the featured Heart failure example) currently have
full authored content. The remaining conditions are listed in the Library
with correct system/urgency metadata, but show the design's own
"Mechanism map in progress" placeholder until their content is backfilled —
this is an existing, designed fallback state, not a bug. See
`CONTENT_STATUS.md` for exactly which conditions are complete.

## Stack

- React + Vite (no router — a single view-state shell, matching the original design)
- Firebase (Anonymous Auth + Firestore) for backend-persisted study progress
- Falls back to `localStorage` automatically if no Firebase project is configured,
  so `npm run dev` works out of the box with no setup

## Setup

```bash
npm install
npm run dev
```

### Connecting a real Firebase backend

1. Create a project at https://console.firebase.google.com
2. **Build → Authentication → Sign-in method** → enable **Anonymous**
3. **Build → Firestore Database** → create a database
4. Deploy `firestore.rules` (in this folder) via the Firebase console's Rules
   tab, or with the Firebase CLI: `firebase deploy --only firestore:rules`
5. Project settings → General → "Your apps" → add a Web app → copy the config
6. Copy `.env.example` to `.env.local` and fill in the `VITE_FIREBASE_*` values
7. Restart `npm run dev`

Without a `.env.local`, the app runs standalone and persists progress to the
browser's `localStorage` instead — useful for local development without a
Firebase project.

## What's persisted per (anonymous) user

- Mechanism map nodes explored, per condition
- Flashcard ratings (Again/Hard/Good/Easy) with a simple spaced-repetition due date
- Quiz attempts, scores and best score, per condition
- Daily study activity → streak (current/best) and the 21-day heatmap

Dashboard stats, the review queue, "jump back in," and the Progress page's
mastery-by-system are all computed live from this data — nothing on those
pages is mocked.
