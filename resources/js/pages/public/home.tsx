import { usePage } from '@inertiajs/react';
import {
    FileText,
    Layers,
    LayoutGrid,
    Mail,
    Palette,
    ShieldCheck,
} from 'lucide-react';
import CtaBand from '@/components/sections/cta-band';
import Faq from '@/components/sections/faq';
import FeatureGrid from '@/components/sections/feature-grid';
import Hero from '@/components/sections/hero';
import StatsBand from '@/components/sections/stats-band';
import TestimonialBand from '@/components/sections/testimonial-band';
import Seo from '@/components/seo';
import { about, contact } from '@/routes';

/**
 * Public home page. The copy carries the starter's core message: small
 * site now, real Laravel underneath, room to grow into a full app.
 */
export default function Home() {
    const { name } = usePage().props;

    return (
        <>
            <Seo
                title="Welcome"
                description={`${name} is a small Laravel starter for simple sites: three pages and a contact form that sends. Built on the real Laravel stack, so it can grow into a full application.`}
            />

            <Hero
                eyebrow="Laravel + Inertia + React"
                title={`A simple site on ${name}`}
                lede="Three pages, a contact form that sends, and a clear path to a full application. No auth to delete, no database to configure."
                actions={[
                    { label: 'Get in touch', href: contact() },
                    {
                        label: 'About this starter',
                        href: about(),
                        variant: 'outline',
                    },
                ]}
            />

            <FeatureGrid
                columns={3}
                features={[
                    {
                        icon: FileText,
                        title: 'Three pages, nothing to delete',
                        description:
                            'Home, about, and contact are the whole site. There is no login screen to remove and no database to wire up.',
                    },
                    {
                        icon: Mail,
                        title: 'A contact form that sends',
                        description:
                            'Validation, a markdown email, and a confirmation toast. Mail goes to the log by default; point MAIL_FROM_ADDRESS at your inbox when you are ready.',
                    },
                    {
                        icon: Layers,
                        title: 'Real Laravel under the hood',
                        description:
                            'The same stack a full application uses: Inertia, React, typed routes, and tests. Adding logic later is normal Laravel work, not a rewrite.',
                    },
                    {
                        icon: LayoutGrid,
                        title: 'Sections you compose',
                        description:
                            'Hero, features, pricing, FAQ. Pick the ready-made blocks, add your copy, and move on.',
                    },
                    {
                        icon: Palette,
                        title: 'One file for the design',
                        description:
                            'Every component reads from the same tokens, so changing the look of the site is a few variable edits.',
                    },
                    {
                        icon: ShieldCheck,
                        title: 'One command checks everything',
                        description:
                            'Lint, types, static analysis, and tests run together. Green means done, and the same gate runs before every commit.',
                    },
                ]}
            />

            <StatsBand
                stats={[
                    { value: '3', label: 'Pages' },
                    { value: '0', label: 'Databases to configure' },
                    { value: '1', label: 'Command for all checks' },
                    { value: '11', label: 'Ready-made sections' },
                ]}
            />

            <TestimonialBand
                note="Testimonials section, fictitious. Replace with real customer quotes."
                testimonials={[
                    {
                        quote: 'Our whole workflow runs through it now. Quotes, invoices, and follow-ups live in one place, and I answer customer questions without checking five tabs.',
                        name: 'Alex Rivera',
                        role: 'Founder, Northwind Labs',
                    },
                    {
                        quote: 'We plugged it into our stack on a Tuesday and it has not needed attention since. The API is boring in the best way.',
                        name: 'Priya Shah',
                        role: 'Engineering Lead, Meridian',
                    },
                    {
                        quote: 'I set it up on a Sunday night and Monday standup ran straight off it. That has never happened with the last three tools we tried.',
                        name: 'Sam Okafor',
                        role: 'Designer, Fieldnotes',
                    },
                ]}
            />

            <Faq
                items={[
                    {
                        question: `What is ${name}?`,
                        answer: 'A small Laravel starter for simple sites. It ships home, about, and a working contact form on the real Laravel stack, so it can grow into a full application.',
                    },
                    {
                        question: 'Why Laravel for a simple site?',
                        answer: 'Because simple sites rarely stay simple. When this one needs users, storage, or real logic, they are normal Laravel features you add in place, not a rebuild from scratch.',
                    },
                    {
                        question: 'Do I need a database?',
                        answer: 'No. There are no migrations and no database configured. Add one the day the site needs persistence.',
                    },
                    {
                        question: 'How does the contact form work?',
                        answer: 'Submissions are validated and sent as a markdown email to MAIL_FROM_ADDRESS, with the visitor set as reply-to. The default log mailer keeps messages local until you switch to a real mailer.',
                    },
                    {
                        question: 'How do I add a page?',
                        answer: 'Add a route in routes/web/public.php and a component in resources/js/pages/public/. The layout, navigation, and SEO head are applied automatically.',
                    },
                ]}
            />

            <CtaBand
                title="Say hello"
                lede="Questions, feedback, or a project in mind. One message is all it takes."
                actions={[{ label: 'Contact us', href: contact() }]}
            />
        </>
    );
}
