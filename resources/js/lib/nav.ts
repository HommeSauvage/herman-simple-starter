import { about, contact, home } from '@/routes';
import type { NavItem } from '@/types';

/**
 * Navigation registry — the single place to add or remove nav entries.
 *
 * `publicNav` is consumed by PublicLayout (desktop header, mobile menu,
 * and footer). There is no authenticated nav in this starter — add one
 * here when your product grows it.
 */
export const publicNav: NavItem[] = [
    {
        title: 'Home',
        href: home(),
    },
    {
        title: 'About',
        href: about(),
    },
    {
        title: 'Contact',
        href: contact(),
    },
];
