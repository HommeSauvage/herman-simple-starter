import { Link, usePage } from '@inertiajs/react';
import { Mail, Menu } from 'lucide-react';
import type { ReactNode } from 'react';
import AppLogoIcon from '@/components/app-logo-icon';
import { Button } from '@/components/ui/button';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { useCurrentUrl } from '@/hooks/use-current-url';
import { publicNav } from '@/lib/nav';
import { cn } from '@/lib/utils';
import { home } from '@/routes';

/**
 * Layout for public pages: sticky header, main slot, footer.
 *
 * Applied automatically to every page in `resources/js/pages/public/`:
 * see the layout resolver in `resources/js/app.tsx`. This starter has no
 * other layout; introduce one when authenticated pages arrive.
 */
export default function PublicLayout({ children }: { children: ReactNode }) {
    const { name, contactEmail } = usePage().props;
    const { isCurrentUrl } = useCurrentUrl();

    const year = new Date().getFullYear();

    return (
        <div className="flex min-h-svh flex-col bg-background text-foreground">
            <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 md:px-6">
                    <Link
                        href={home()}
                        className="flex items-center gap-2 font-semibold"
                        prefetch
                    >
                        <span className="flex aspect-square size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
                            <AppLogoIcon className="size-5 fill-current" />
                        </span>
                        <span className="truncate">{name}</span>
                    </Link>

                    <nav
                        className="hidden items-center gap-1 md:flex"
                        aria-label="Primary"
                    >
                        {publicNav.map((item) => (
                            <Button
                                key={item.title}
                                variant="ghost"
                                size="sm"
                                asChild
                                className={cn(
                                    isCurrentUrl(item.href) &&
                                        'bg-accent text-accent-foreground',
                                )}
                            >
                                <Link href={item.href} prefetch>
                                    {item.title}
                                </Link>
                            </Button>
                        ))}
                    </nav>

                    <div className="flex items-center md:hidden">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    aria-label="Open menu"
                                >
                                    <Menu className="size-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-72">
                                <SheetHeader>
                                    <SheetTitle className="flex items-center gap-2">
                                        <span className="flex aspect-square size-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
                                            <AppLogoIcon className="size-4 fill-current" />
                                        </span>
                                        {name}
                                    </SheetTitle>
                                </SheetHeader>
                                <nav
                                    className="flex flex-col gap-1 px-4"
                                    aria-label="Mobile"
                                >
                                    {publicNav.map((item) => (
                                        <SheetClose asChild key={item.title}>
                                            <Link
                                                href={item.href}
                                                className={cn(
                                                    'rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground',
                                                    isCurrentUrl(item.href) &&
                                                        'bg-accent text-accent-foreground',
                                                )}
                                            >
                                                {item.title}
                                            </Link>
                                        </SheetClose>
                                    ))}
                                </nav>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </header>

            <main className="flex-1">{children}</main>

            <footer className="border-t">
                <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-10 md:grid-cols-3 md:px-6">
                    <div className="space-y-3">
                        <Link
                            href={home()}
                            className="flex items-center gap-2 font-semibold"
                        >
                            <span className="flex aspect-square size-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
                                <AppLogoIcon className="size-4 fill-current" />
                            </span>
                            {name}
                        </Link>
                        <p className="max-w-xs text-sm text-muted-foreground">
                            Built with Laravel, Inertia, React, and Tailwind
                            CSS.
                        </p>
                    </div>
                    <nav aria-label="Footer">
                        <p className="mb-3 text-sm font-semibold">Explore</p>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            {publicNav.map((item) => (
                                <li key={item.title}>
                                    <Link
                                        href={item.href}
                                        className="hover:text-foreground"
                                    >
                                        {item.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                    <div>
                        <p className="mb-3 text-sm font-semibold">Say hello</p>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>
                                <a
                                    href={`mailto:${contactEmail}`}
                                    className="inline-flex items-center gap-2 hover:text-foreground"
                                >
                                    <Mail className="size-4" aria-hidden />
                                    {contactEmail}
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="border-t">
                    <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 text-xs text-muted-foreground md:px-6">
                        <span>
                            © {year} {name}. All rights reserved.
                        </span>
                    </div>
                </div>
            </footer>
        </div>
    );
}
