# Project spec: Aseem Portfolio + AI Digital Twin

**Goal:** a portfolio for Mohammed Aseem (3rd-year Digital Transformation
student, Atria University) with an embedded AI "Digital Twin" that answers
questions about him accurately — from a verified knowledge base only, never
by inventing facts — while still answering unrelated general/technical
questions like a normal AI assistant. Audience: recruiters, instructors, and
anyone evaluating the assignment.

**Status (as of 26 Sep 2026):** deployed and live. Core features working
end to end; personal content (bio, resume, contact email) partially filled
in and clearly marked wherever it isn't.

## 1. Core features

| Area | What it does |
|---|---|
| Hero / About | Name, university, program, year, interests. |
| AI Digital Twin | Chat widget that classifies each question (personal / project / technical / general) and answers personal or project questions only from `src/data/*.ts`; explicitly says "I don't have that information in my Digital Twin knowledge base" rather than guessing. General/technical questions get normal, unrestricted answers. |
| Projects | Real GitHub repositories only, pulled from Aseem's actual account and manually verified — each one labeled with an honest status rather than a polished description if its content couldn't be confirmed. |
| Skills | Skills actually used across the listed projects, linked to which project each one appears in. |
| Learning Journey | Timeline of milestones; confirmed items marked as such, unconfirmed ones left as placeholders rather than invented. |
| Contact | Form that sends a real email via Resend when configured, and falls back to opening the visitor's own email app (`mailto:`) if it isn't — never a dead button either way. |
| Resume | Honest "not uploaded yet" state instead of a broken download link, until a real file is added. |

## 2. Claude Code project components

This project currently uses **no Claude Code plugin components** (no custom
skills, slash commands, hooks, subagents, or MCP servers defined in the
repo; there is no `.claude/` folder).

| Component | Status | Notes |
|---|---|---|
| `CLAUDE.md` | Done | Authored project guidance (this repo). |
| Skills / slash commands | Not created | Candidates below. |
| Hooks | Not created | Candidates below. |

Suggested additions (pending, optional):
- **Command `/check`:** run `npx tsc --noEmit && npx eslint src --max-warnings 0`, then `npm run build`.
- **Skill "update-portfolio-content":** how to add a verified project or
  skill to `src/data/*.ts` without breaking the Digital Twin's knowledge
  base.
- **Hook (PostToolUse on Edit):** run `tsc --noEmit` after editing `src/**`.
- **Hook (PreToolUse on Write/Edit):** block edits to `.env.local`.

## 3. Done

- Next.js + TypeScript + Tailwind app scaffolded and deployed on Vercel
- Anti-hallucination Digital Twin chat, backed by a server-side Anthropic API
  route (key never exposed to the browser)
- Verified project list (real GitHub repos only, no fabricated projects)
- Working contact form with real-email + mailto fallback (Resend)
- Rate limiting on both API routes
- Verified: `tsc --noEmit` clean, ESLint clean (0 warnings), production build
  succeeds, manually tested chat and contact flows on the live deployment

## 4. Pending

- **Real bio** — currently a labeled placeholder in `src/data/profile.ts`.
- **Resume file** — not yet uploaded; button honestly disabled until it is.
- **Full project coverage** — only the repositories that could be directly
  verified are listed; the rest of the GitHub account wasn't confirmed and
  is deliberately left out rather than guessed at.
- **Visual/animation polish** — no 3D scene, intro animation, or
  scroll-driven effects; scope was kept to what could be verified working
  reliably in the time available.
- **Claude Code plugin components** (skills/commands/hooks listed above) —
  none built yet, listed as candidates only.
