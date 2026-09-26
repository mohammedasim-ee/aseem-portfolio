# Mohammed Aseem — Portfolio + AI Digital Twin

A Next.js + TypeScript + Tailwind portfolio with an AI Digital Twin chat, built to run and be
maintained on Windows in Claude Code.

## Honest status (read this first)

- **Projects section** only lists repositories actually verified on
  `github.com/mohammedasim-ee` on 26 Sep 2026. GitHub blocks automated tools from loading the
  full repository list, and the public API was rate-limited from the build environment, so **only
  6 of the profile's 12 repos could be inspected**. The other 6 aren't listed — not because they
  don't matter, but because nothing about them is verified. Add them yourself in
  `src/data/projects.ts` once you can see them.
- Every one of the 6 verified repos is coursework or a practice exercise (HTML/CSS fundamentals,
  one Python OOP file, one empty repo) — not a polished app. The site says so honestly instead of
  dressing them up.
- **Bio, resume, contact email, and learning-journey milestones are placeholders.** Edit
  `src/data/profile.ts` and `src/data/journey.ts` yourself — the AI Digital Twin will not invent
  these, by design.

## Stack

- **Next.js 15 (App Router) + TypeScript** — one framework, server and client code together.
- **Tailwind CSS** — utility classes, no separate stylesheet to maintain.
- **A Next.js Route Handler** (`src/app/api/chat/route.ts`) as the secure backend for the AI
  Digital Twin — this is what keeps your AI API key off the browser.

## Project structure

```
aseem-portfolio/
├── src/
│   ├── app/
│   │   ├── page.tsx           # home page, composes all sections
│   │   ├── layout.tsx         # fonts, metadata
│   │   ├── globals.css        # Tailwind + design tokens
│   │   └── api/chat/route.ts  # the Digital Twin's backend endpoint
│   ├── components/            # Nav, Hero, About, DigitalTwin, Projects, Skills, Journey, Contact
│   ├── data/                  # profile.ts, projects.ts, skills.ts, journey.ts — edit these, not the AI
│   └── lib/                   # knowledgeBase.ts (system prompt), aiProvider.ts, rateLimit.ts, chatClient.ts
├── .env.example
└── package.json
```

## How the Digital Twin works

1. The chat UI sends `{ question, history }` to `POST /api/chat`.
2. `knowledgeBase.ts` picks out relevant verified projects by simple keyword matching, then builds
   a system prompt: classification rules (personal/project/technical/general/mixed) plus the full
   contents of `profile.ts`, `skills.ts`, and `journey.ts`.
3. That prompt + conversation goes to the AI provider (Anthropic's Claude API by default, via
   `aiProvider.ts`).
4. The answer comes back as plain text and renders as markdown in the chat.

Because retrieval is a plain function returning JSON, it can be swapped for real vector search
later without touching the route or the frontend.

## Setup on Windows

Requires [Node.js 18+](https://nodejs.org) installed. Use **PowerShell** or the VS Code integrated
terminal for these commands (they work identically in PowerShell and Command Prompt except where
noted).

```powershell
cd aseem-portfolio
npm install
```

### Configure your AI provider

```powershell
copy .env.example .env.local
```

Open `.env.local` in VS Code and fill in:

```
AI_API_KEY=sk-ant-...
AI_MODEL=claude-sonnet-4-6
```

**Never commit `.env.local`.** It's already excluded in `.gitignore`.

## Run it locally

```powershell
npm run dev
```

Open `http://localhost:3000` in your browser. Changes to any file under `src/` hot-reload
automatically.

## Verify everything works (what I already ran before handing this to you)

```powershell
npx tsc --noEmit      # type-check — should print nothing
npx eslint src         # lint — should report 0 problems
npm run build          # production build — should finish with no errors
npm run start           # serves the production build on http://localhost:3000
```

I ran all four of these against this exact codebase: type-check clean, lint clean (0 warnings), 
production build succeeds, and the chat API correctly returns friendly errors for an empty
question, malformed JSON, and a missing API key, without ever crashing or leaking a stack trace.

## Editing content

- **Profile/bio/contact:** `src/data/profile.ts`
- **Projects:** `src/data/projects.ts` — add a repo once you've verified its actual contents;
  don't guess
- **Skills:** `src/data/skills.ts` — keep the neutral "used in projects" framing unless you want to
  explicitly claim a proficiency level
- **Learning journey:** `src/data/journey.ts` — replace the `confirmed: false` placeholder entries
  as you confirm real milestones

The Digital Twin automatically reflects any change here on its next request — no need to touch
`knowledgeBase.ts` unless you're changing the rules themselves.

## Deployment

- **Recommended:** deploy the whole Next.js app as one unit to [Vercel](https://vercel.com) — it
  hosts both the frontend and the `/api/chat` route together, so there's no separate backend to
  manage. Set `AI_API_KEY` and `AI_MODEL` as environment variables in the Vercel project settings
  (never in code).
- Any other Node hosting (Render, Railway, a VPS) works too: `npm run build` then `npm run start`.

## Known limitations

- Retrieval is keyword-based, not embeddings — fine for a handful of projects.
- Rate limiting is in-memory per server instance — fine for a personal site, not for
  multi-instance production scaling.
- Only 6 of 12 GitHub repos are represented — see "Honest status" above.
