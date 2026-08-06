---
name: inertia-react-development
description: "Develops Inertia.js v3 React client-side applications. Activates when creating React pages, forms, or navigation; using <Link>, <Form>, useForm, useHttp, setLayoutProps, or router; working with deferred props, prefetching, optimistic updates, instant visits, or polling; or when user mentions React with Inertia, React pages, React forms, or React navigation."
license: MIT
metadata:
  author: laravel
---

# Inertia React Development

## When to Apply

- Creating or modifying React page components for Inertia
- Forms in React (`<Form>`, `useForm`, `useHttp`)
- Client-side navigation with `<Link>` or `router`
- v3 features: deferred props, prefetching, optimistic updates, instant visits, layout props, WhenVisible, InfiniteScroll, once props, flash data, polling

Use `search-docs` for detailed Inertia v3 syntax. This file covers this starter's conventions and the v3 feature map.

## Starter Conventions (override generic Inertia examples)

1. **Never hardcode URLs.** Every `href`, `action`, and `router`/`useForm` target comes from Wayfinder: default-import the controller from `@/actions/...` or use named routes from `@/routes/...`. After route changes run `php artisan wayfinder:generate --with-form`.
2. **Compose `components/ui/*`.** Forms use `Input`, `Label`, `Button`, and `InputError` (`@/components/input-error`) — never raw styled `<input>`/`<button>`. Never edit the `ui/*` primitives themselves.
3. **Token colors only.** Skeletons use the `<Skeleton />` component (`ui/skeleton`) or `bg-muted` — never palette classes like `bg-gray-200`.
4. **Pages live in `resources/js/pages/`** — `pages/public/**` gets `PublicLayout`, and the `error` page opts out of the resolver and wraps itself (see `app.tsx`). Every page renders `<Seo title … />` (never raw `<Head>` titles).
5. **Loading states:** deferred props → skeleton, form submits → the form's `processing` state, everything else → spinner (`components/loading-state.tsx`).
6. **The contact form is the canonical form reference** — compose like `pages/public/contact.tsx` (`<Form>` + Wayfinder action + `InputError` + `processing` button).

## Canonical Form (starter style)

```tsx
import { Form } from '@inertiajs/react';
import ContactController from '@/actions/App/Http/Controllers/Public/ContactController';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ContactForm() {
    return (
        <Form {...ContactController.store.form()} className="flex flex-col gap-6">
            {({ processing, errors }) => (
                <>
                    <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" name="name" required />
                        <InputError message={errors.name} />
                    </div>
                    <Button type="submit" disabled={processing}>
                        {processing ? 'Sending…' : 'Send message'}
                    </Button>
                </>
            )}
        </Form>
    );
}
```

- Route parameters go into the Wayfinder call: `SomeController.store.form(slug)`.
- Prefer `<Form>` for standard submits. Reset props: `resetOnSuccess`, `resetOnError`, `setDefaultsOnSuccess` (`search-docs`: `form component resetting`).
- Use `useForm` for programmatic control (controlled inputs, dependent fields). Use `useHttp` for plain JSON endpoints that are not page visits (search boxes, autosave).

## Deferred Props

Server: `Inertia::defer(fn () => …)`. The prop is `undefined` on first render — always handle it with a skeleton:

```tsx
import { Skeleton } from '@/components/ui/skeleton';

{
    !users ? (
        <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
        </div>
    ) : (
        <ul>
            {users.map((user) => (
                <li key={user.id}>{user.name}</li>
            ))}
        </ul>
    );
}
```

## v3 Feature Map

Reach for these instead of hand-rolling. Syntax and options: `search-docs` (e.g. `optimistic updates`, `infinite scroll`).

| Feature                   | API                                       | Use when                                        |
| ------------------------- | ----------------------------------------- | ----------------------------------------------- |
| Standalone JSON requests  | `useHttp`                                 | Non-page-visit endpoints (search, autosave)     |
| Optimistic updates        | `router.optimistic()`, `<Form optimistic>` | Instant UI with automatic rollback on failure   |
| Instant visits            | `<Link component={…} pageProps={…}>`       | Render the target page before the server replies |
| Layout props              | `setLayoutProps()`                         | Page → persistent layout data                   |
| Deferred props            | `Inertia::defer()`                         | Slow props below the fold (always add skeleton) |
| Prefetching               | `<Link prefetch>`                          | Likely next navigations                         |
| Polling                   | `usePoll(ms, options)`                     | Live dashboards (throttles in inactive tabs)    |
| Scroll lazy-load          | `<WhenVisible>`                            | Load a prop when it scrolls into view           |
| Infinite scroll           | `<InfiniteScroll>` + `Inertia::scroll()`   | "Load more" feeds                               |
| Merging props             | `Inertia::merge()`                         | Append instead of replace on reload             |
| Once props                | `Inertia::once()`                          | Expensive props that never change               |

## v3 Breaking Changes (vs older training data)

- Axios removed — use the built-in XHR client. `Inertia::lazy()` / `LazyProp` removed — use `Inertia::optional()`.
- Events renamed: `invalid` → `httpException`, `exception` → `networkError`. `router.cancel()` → `router.cancelAll()`.

## Common Pitfalls

- Hardcoded URLs instead of Wayfinder functions (breaks this starter's routing contract)
- `<a>` instead of `<Link>` (breaks SPA behavior)
- Deferred props without `undefined` handling and a skeleton
- Raw `<input>`/`<button>` or palette colors instead of `ui/*` components and tokens
- Plain `<form>` without `<Form>` or `e.preventDefault()`
