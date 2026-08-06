# Herman Simple Starter

A small Laravel starter for simple sites. Three pages (home, about, contact), one contact form that actually sends mail, and the same stack a full Laravel application runs on.

It starts small on purpose. When the site needs auth, a database, or real logic, you grow it in place instead of starting over.

Built on Laravel 13, Inertia v3, React 19, and Tailwind CSS v4, with typed Wayfinder routes and one command that runs linting, types, static analysis, and tests.

[![Laravel](https://img.shields.io/badge/Laravel-13-FF2D20?style=flat-square&logo=laravel&logoColor=white)](https://laravel.com)
[![Inertia](https://img.shields.io/badge/Inertia-v3-9553E9?style=flat-square)](https://inertiajs.com)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![PHP](https://img.shields.io/badge/PHP-8.3%2B-777BB4?style=flat-square&logo=php&logoColor=white)](https://www.php.net)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](LICENSE)

## What this is for

Most Laravel starters assume you are building a SaaS. They ship login screens, teams, and a database, and the first day of a simple project is spent deleting all of it.

This starter assumes the opposite. The whole product surface is three pages and a form that sends mail. There is no auth to remove and no database to configure.

That is not a limit. This is still Laravel, Inertia, and React, the same pieces a full application uses. When the simple site stops being simple, adding users, storage, or business logic is normal Laravel work on top of this foundation, not a rewrite.

## What's inside

- Home, about, and contact behind one layout, with navigation kept in a single file
- A contact form that validates input, sends a markdown email, and confirms with a toast
- A sections library (hero, features, pricing, FAQ, and more) so pages are composed from ready-made blocks instead of hand-built
- Design tokens in one file, so a retheme is a few variable edits
- Tests for every page and the contact flow, plus a pre-commit hook that runs the same checks as CI

## Stack

| Layer        | Choice                                    |
|--------------|-------------------------------------------|
| Backend      | Laravel 13, PHP 8.3+                      |
| Frontend     | Inertia v3, React 19, Tailwind CSS v4     |
| Routes (TS)  | Wayfinder                                 |
| Tests        | Pest 4                                    |
| Tooling      | Pint, Larastan, ESLint, Prettier, fallow  |
| Database     | none                                      |

## Requirements

- PHP 8.3+ (8.5 recommended)
- [Composer](https://getcomposer.org)
- [Bun](https://bun.sh) (preferred) or Node.js 20+

No database server. The starter is deliberately DB-less.

## Quick start

```bash
composer setup
```

This installs PHP dependencies, copies `.env`, generates the app key, installs JavaScript dependencies, builds assets, and installs the git pre-commit hook.

Then start the local stack:

```bash
composer run dev
```

Open [http://localhost:8000](http://localhost:8000).

Manual setup, if you prefer:

```bash
composer install
cp .env.example .env
php artisan key:generate
bun install
bun run build
composer run dev
```

Different port:

```bash
SERVER_PORT=8001 APP_URL=http://localhost:8001 composer run dev
```

## Receiving contact mail

The contact form sends to `MAIL_FROM_ADDRESS` with the visitor set as the reply-to address. Out of the box, mail is logged to `storage/logs/laravel.log` (`MAIL_MAILER=log`), so nothing is required to start.

To receive real messages:

1. Set `MAIL_FROM_ADDRESS` to your inbox. This is also the recipient.
2. Switch `MAIL_MAILER` to `smtp` or a provider such as Mailgun, Postmark, or Resend, and add the matching credentials.
3. In production, run a queue worker (`php artisan queue:work`). The mailable is `ShouldQueue`, and `.env` uses `QUEUE_CONNECTION=sync` for now.

## Project layout

```
app/
├── Http/Controllers/Public/ContactController.php   # form -> mail
├── Http/Requests/ContactRequest.php                # validation
├── Mail/ContactMessage.php                         # markdown mailable
└── Middleware/                                     # Inertia, appearance

resources/js/
├── pages/public/           # home.tsx, about.tsx, contact.tsx, error.tsx
├── layouts/public-layout.tsx
├── components/             # ui/ (shadcn), sections/, shared pieces
└── lib/nav.ts              # the single place navigation is defined

routes/web/public.php       # one file per domain; routes/web.php loads them

tests/Feature/Public/       # HomeTest, AboutTest, ContactTest
```

## Development

| Command                    | Purpose                                      |
|----------------------------|----------------------------------------------|
| `composer run dev`         | PHP server, queue, logs, Vite                |
| `composer test`            | Pint check + PHPStan + Pest                  |
| `composer run ci:check`    | everything, including the frontend gates     |
| `bun run lint` / `format`  | ESLint / Prettier                            |
| `bun run types:check`      | TypeScript                                   |
| `bun run deadcode:check`   | unused files, exports, and dependencies      |
| `php artisan test`         | Pest only                                    |

`composer setup` installs a lefthook pre-commit hook: every `git commit` runs `composer run ci:check`. Bypass it only in emergencies with `--no-verify`.

Filter tests while iterating:

```bash
php artisan test --compact --filter=Contact
```

## Growing into a full app

Adding a database, auth, or real features is the point of building on Laravel. Nothing here is half-configured, so there is nothing to undo first:

- **Database.** Add migrations, then set `DB_CONNECTION` and the session, cache, and queue drivers in `.env`.
- **Auth.** Add the users table and model, enable the auth middleware, and point the layout resolver in `app.tsx` at an app layout when authenticated pages exist.

Until then, keep the site small. That is its whole point.

## Contributing

Issues and pull requests are welcome. Please:

1. Keep changes focused and consistent with the existing conventions
2. Add or update Pest tests for behavioral changes
3. Run `composer run ci:check` (or the relevant subset) before opening a PR

## License

This project is open-sourced software licensed under the [MIT license](LICENSE).
