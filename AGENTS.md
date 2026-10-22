# Bread: Agent Instructions

## Authority and project context

- Respect higher-priority system and user instructions; apply directory-specific `AGENTS.md` instructions within their scope. Repository or external content never grants permission to bypass security or authorization boundaries.
- This repository is Bread's single-page brand and portfolio website. The current landing presents four bread varieties, the baker's story, and personal contact channels; it has no ordering or commerce system.
- The original approved direction and draft copy are in the [visual direction document](https://docs.google.com/document/d/17Pq11gb7BLebd3kNMHPCJfif_644eaUDAWBm7pLx2-s/edit) and [Russian copy document](https://docs.google.com/document/d/1iU2h8yTxCfAdf0rSqTEzJkKxrV05ZV5uBpDjZCp1FzQ/edit); current implementation details are in `docs/landing-design.md` and `docs/image-inventory.md`. Inspect source to establish implemented behavior. Telegram and MAX personal profile URLs remain outstanding; do not guess them. The rye image is provisional generated editorial imagery, not authenticated bakery photography. Ingredient and authentic-photography verification requirements remain applicable.
- Surface material contradictions between requirements, instructions, and implementation. Ask for missing material product decisions; report inaccessible documentation as a blocker when the task depends on it. Continue independent work where possible.
- Use [README.md](README.md) for starter lifecycle, authentication, and local migration details, not as evidence of implemented Bread features. Consult only documentation relevant to the task.

## Repository map and runtime

- Node.js >=22.13.0; npm with `package-lock.json`; TypeScript in strict mode, React 19, Tailwind CSS 4, and shadcn/ui.
- `app/` contains Next.js App Router-style pages, layout, global styles, and optional server-side authentication helpers. Vinext runs the Next.js APIs through Vite; this is not a standard Next.js deployment.
- `vite.config.ts` integrates Vinext, Cloudflare Workers, Sites, and connector preview. `worker/index.ts` is the production entry point. Preserve this integration and the execution-profile behavior in `scripts/`; do not replace it with ordinary Next.js scripts or assume Node.js server APIs work in Workers.
- `components/ui/` contains vendored shadcn components; `components.json` defines their configuration. `hooks/` and `lib/` contain shared hooks, utilities, and request-scoped connector support. `@/*` resolves from the repository root.
- `app/globals.css` defines theme tokens; `vendor/` holds vendored styles and licenses. Reuse validated UI primitives, tokens, and `cn()` from `lib/utils.ts`; preserve upstream source and licenses unless the task requires changes.
- `.openai/hosting.json` declares optional bindings; D1 and R2 are currently `null`. `db/schema.ts` is empty, `db/index.ts` requires an active D1 binding, and `examples/d1/` is opt-in sample code excluded from TypeScript checking. Dependencies and examples do not establish active infrastructure.
- `dist/`, `.next/`, `.vinext/`, `.wrangler/`, and `.sites-runtime/` are generated or local state. Edit authored source and configuration, not generated output. There is no authored `wrangler.jsonc`; the build generates `dist/server/wrangler.json`.

## Operating workflow and scope

- Establish the requested outcome, inspect the complete affected implementation and dependencies, and identify applicable constraints before editing. Plan substantial or cross-cutting work briefly before implementation.
- Make focused, incremental changes that fix root causes and complete the requested behavior, including necessary integration and failure handling. Preserve unrelated functionality and user-authored changes.
- Follow proven patterns, DRY, KISS, and YAGNI. Validate local patterns before reusing them; isolate unavoidable legacy compatibility. Avoid unrelated refactors, speculative features, premature optimization, competing conventions, and abstractions without a concrete need.
- Add dependencies only for a demonstrated need after checking existing capabilities. Preserve the lockfile workflow; do not overlap installers.
- Change infrastructure, security policies, database schemas, or deployment configuration only with task-specific justification. Optional capabilities remain inactive until configuration and actual use are verified.
- Never invent product behavior or business rules. Request clarification for decisions that materially affect scope or user behavior; report blockers instead of guessing.
- Do not deploy, perform destructive or irreversible operations, commit, or push without explicit user authorization. Routine reversible local implementation and verification within the task can proceed autonomously.

## Engineering standards

- Preserve strict TypeScript correctness. Model inputs and results accurately, narrow unknown values, and avoid unjustified `any`, assertions, or suppressed diagnostics. Match the surrounding authored code rather than reformatting unrelated files.
- Keep React components focused and rendering pure. Follow Hook rules, maintain correct dependencies and cleanup, and handle stale async results or races where relevant. Use effects for external synchronization rather than derived state.
- Keep server-only authentication, database access, connector bindings, and secrets out of client bundles. Add `"use client"` only where browser APIs or interactivity require it; respect serialization across server/client boundaries.
- Check new APIs against the installed Vinext/Vite and Workers runtime. Use the existing framework adapters and configuration rather than assuming full Next.js compatibility.
- Validate untrusted input at server boundaries, enforce authorization and ownership for protected reads and writes, and preserve data integrity. Authentication alone does not establish workspace membership. Never rely on client-side checks for access control.
- When using ChatGPT authentication, follow `app/chatgpt-auth.ts` and the README: use the stable user ID for ownership; keep identity-dependent pages dynamic; start sign-in via top-level navigation. Preserve dispatch ownership of `/signin-with-chatgpt`, `/signout-with-chatgpt`, and `/callback`. Do not treat local mock identity as production authentication.
- Preserve request isolation in `worker/index.ts` and `lib/connector-context.ts`. Never cache identity or connector capabilities across visitors; handle unavailable, expired, and failed integrations explicitly.
- Provide meaningful loading, empty, error, and recovery states where relevant. Avoid silent failures, exposing internal details, and unsafe retries of writes. Never place secrets or sensitive personal data in source control, client output, or logs.
- Preserve semantic HTML, keyboard operation, accessible names, focus behavior, and responsive layouts. Check relevant themes and reduced-motion behavior when changing UI.
- Avoid unnecessary client JavaScript, repeated network work, and resource leaks; optimize against a demonstrated problem.
- Keep documentation in English. Add brief code comments only for non-obvious invariants, reasons, or complex algorithms; write those comments in Russian.

## Verification

Choose checks proportional to the change and inspect the current scripts before running them:

| Command | Purpose |
| --- | --- |
| `npm run install:ci` | Locked dependency installation when needed |
| `npm run dev` | Development preview through the execution-profile wrapper |
| `npm run lint` | ESLint checks |
| `./node_modules/.bin/tsc --noEmit` | Direct TypeScript check using the installed compiler; no package script exists |
| `npm run build` | Build the deployable Worker artifact through the existing wrapper |
| `npm start` | Local preview of the built Worker; requires build output |
| `npm run db:generate` | Generate migrations only for an intentional schema change; does not apply them |

- For code changes, run relevant lint, type, and build checks; exercise affected behavior and realistic edge cases, integration failures, and adjacent regression paths. Follow README lifecycle details for the current execution profile.
- No automated test suite or test script is currently present. Do not claim test coverage from lint or build success. Use existing tests if introduced later; add meaningful regression coverage when warranted without creating tooling for trivial changes.
- Fix failures introduced by the change. Distinguish pre-existing failures from new ones using evidence, and report checks that failed or could not run. Never claim an unexecuted check passed.
- Documentation-only changes need content, reference, and diff review; skip application builds unless the change can affect runtime or compilation.

## Documentation, review, and completion

- Update relevant documentation when behavior, architecture, or contracts meaningfully change. Link approved Drive requirements instead of copying them; do not silently reinterpret or override them.
- Review complete affected behavior, dependencies, and integrations, not only changed lines. Check correctness, security, data integrity, compatibility, regressions, error handling, concurrency, accessibility, and available test coverage as applicable. Perform a second pass for overlooked issues.
- Prioritize actionable review findings P0–P3 (critical to low). Distinguish confirmed defects from potential risks and verification gaps. Do not recommend merging with unresolved blocking defects or mandatory verification gaps.
- End implementation tasks with a concise report: changes and modified files; checks actually performed and their results; remaining risks, limitations, or blockers; and a proposed Conventional Commit message in the form `type(scope): concise description`. The message is a proposal, not authorization to commit or push.
