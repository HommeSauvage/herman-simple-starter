# AGENTS.md

Operating contract for agents in this repo. `composer run ci:check` green is what "done" means.

## Non-negotiables

- **The gate is the contract.** `composer run ci:check` = ESLint, Prettier, `tsc`, fallow dead-code, Pint, PHPStan, Pest. The lefthook pre-commit hook runs exactly this — never `--no-verify` to dodge it.
- **Compose, don't invent.** Extend an existing block before creating a new one; check sibling files for conventions first.
- **No auth, no DB — deliberately.** This starter is static. When the product grows them, add them wholesale (guide in README); never reintroduce leftovers piecemeal.
- Don't touch dependencies, base folders, or docs files unless the user asks.

## Stack & tools

- Laravel 13 / PHP 8.5 / Inertia v3 + React 19 / Tailwind v4 / Pest 4 / Wayfinder — exact versions in `composer.json` / `package.json`.
- Activate the matching `**/skills/**` skill (laravel, inertia-react, pest, tailwind, wayfinder, shadcn) before working in that domain.
- Prefer Boost MCP over manual alternatives: `search-docs` (version-specific API docs), `browser-logs`, `get-absolute-url`.
- Scaffold with `php artisan make:* --no-interaction`; inspect with `route:list` / `config:show`.

## Quality gates

- **fallow dead-code** flags unused files/exports/deps you add. Exempt building blocks: `components/ui/**`, `components/sections/**`, `media-image.tsx`, `loading-state.tsx`, `use-mobile.tsx`. Flagged something? Delete it or wire it in — never add ignore rules.
- **Pint + PHPStan** judge PHP; run `vendor/bin/pint --dirty --format agent` after editing PHP.
- **Tests**: `php artisan make:test --pest Name`; run `php artisan test --compact` (`--filter=` to narrow). Never delete tests without approval. Write a test, not a throwaway script.

## Routes & wiring

- `routes/web.php` is only a loader: it globs `routes/web/*.php` in sorted order. One file per domain — add files, never edit the loader.
- After adding routes/controllers: `php artisan wayfinder:generate --with-form`. `resources/js/actions/` + `resources/js/routes/` are generated — never hand-edit.
- Frontend hits the backend via Wayfinder (`@/actions/...`, `@/routes/...`); PHP uses named routes / `route()`. Never hardcoded URLs.

## Pages, layouts & SEO

- Pages live in `resources/js/pages/public/` and get `PublicLayout` automatically (resolver in `app.tsx`); `error.tsx` opts out and wraps itself.
- Nav entries go in `resources/js/lib/nav.ts` (`publicNav`) — header, mobile menu, and footer render from it.
- Every page renders `<Seo title … description? />`; never raw `<Head>` titles (the app name appends itself).

## Building blocks (compose from these first)

- `layouts/public-layout.tsx` — public chrome, auto-applied to `pages/public/**`.
- `components/sections/` — `hero`, `page-header`, `feature-grid`, `feature-rows`, `stats-band`, `testimonial-band`, `pricing-table`, `faq`, `cta-band`, `card-grid`. List-driven ones render `EmptyState` when empty.
- Shared: `empty-state.tsx`, `loading-state.tsx`, `media-image.tsx`, `input-error.tsx`.
- Reference compositions: `public/home.tsx`, `public/about.tsx`. The contact flow is the form/mail quality bar.
- `components/ui/*` are shadcn primitives — compose, never edit. Token colors only (`bg-background`, …) — no `#hex`/`rgb(`/`oklch(`; values in `resources/css/app.css`; fonts from `bunny(...)` in `vite.config.ts`, never CDN links. (Details: `skills/tailwindcss-development`.)

## Contact flow (quality bar)

- GET `contact` renders `public/contact`; POST validates via `ContactRequest`, mails `ContactMessage` (markdown, `ShouldQueue`) to `MAIL_FROM_ADDRESS` with the visitor as reply-to, and flashes a toast.
- Mail logs to `storage/logs/laravel.log` (`MAIL_MAILER=log`); queue is `sync` until a worker exists. Point `MAIL_FROM_ADDRESS` at a real inbox to receive.
- Tests: `tests/Feature/Public/ContactTest.php` — sending (`Mail::fake` + `assertQueued`), validation, content (`assertSeeInHtml`). Keep that split for new mail.

## Misc

- Dev port: `SERVER_PORT=8001 APP_URL=http://localhost:8001 composer run dev`.
- Vite "manifest" errors or stale frontend? The user needs `bun run dev` / `bun run build` — ask.
- Inertia v3: no axios (built-in XHR client), `Inertia::optional()` replaces `lazy()`, events are `httpException`/`networkError`, `router.cancelAll()`. Full feature map: `skills/inertia-react-development`.
