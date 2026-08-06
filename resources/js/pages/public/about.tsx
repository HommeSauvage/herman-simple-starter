import { usePage } from '@inertiajs/react';
import { ArrowUpRight, Layers, ShieldCheck, Target } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import CtaBand from '@/components/sections/cta-band';
import FeatureRows from '@/components/sections/feature-rows';
import PageHeader from '@/components/sections/page-header';
import Seo from '@/components/seo';
import { contact } from '@/routes';

/** Token-styled media slot for feature rows (no images shipped). */
function RowMedia({ icon: Icon }: { icon: LucideIcon }): ReactNode {
    return (
        <div className="flex aspect-video items-center justify-center rounded-xl border bg-muted/50">
            <Icon className="size-12 text-muted-foreground" aria-hidden />
        </div>
    );
}

/**
 * About page. Tells the starter's story: small site today, real Laravel
 * underneath, and a clear path to a full application.
 */
export default function About() {
    const { name } = usePage().props;

    return (
        <>
            <Seo
                title="About"
                description={`${name} starts as a small site and grows into a full application. Three pages and a contact form on the real Laravel stack.`}
            />

            <PageHeader
                eyebrow="About"
                title={`Small now, an app later`}
                lede={`${name} is a simple site with a real application stack under it. Three pages today, a full Laravel app when you need one.`}
            />

            <FeatureRows
                rows={[
                    {
                        eyebrow: 'Purpose',
                        title: 'The smallest site that is still a site',
                        description:
                            'Home, about, and contact are the entire product surface, and the contact form really sends. There is nothing to remove on day one.',
                        media: <RowMedia icon={Target} />,
                    },
                    {
                        eyebrow: 'Stack',
                        title: 'The real Laravel stack',
                        description:
                            'Laravel 13, Inertia v3, React 19, Tailwind CSS v4, typed routes, and tests. The same pieces a full application runs on, so the jump from site to app is a small one.',
                        media: <RowMedia icon={Layers} />,
                    },
                    {
                        eyebrow: 'Growing',
                        title: 'A path to a full app',
                        description:
                            'Users, storage, business logic. Each one is a normal Laravel feature you add on top of this foundation, because the foundation is a real application, not a toy.',
                        media: <RowMedia icon={ArrowUpRight} />,
                    },
                    {
                        eyebrow: 'Maintenance',
                        title: 'Checks that keep it honest',
                        description:
                            'Lint, types, static analysis, and tests run as one command, and a pre-commit hook runs the same gate. The small site stays easy to change as it grows.',
                        media: <RowMedia icon={ShieldCheck} />,
                    },
                ]}
            />

            <CtaBand
                title="Want to talk?"
                lede="Questions about the starter, or a project it could power. The contact form is the fastest way to reach us."
                actions={[{ label: 'Get in touch', href: contact() }]}
            />
        </>
    );
}
