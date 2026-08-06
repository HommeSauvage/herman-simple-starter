import { Form, usePage } from '@inertiajs/react';
import { Clock, Mail } from 'lucide-react';
import ContactController from '@/actions/App/Http/Controllers/Public/ContactController';
import InputError from '@/components/input-error';
import PageHeader from '@/components/sections/page-header';
import Section from '@/components/sections/section';
import Seo from '@/components/seo';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

/**
 * Contact page, the only form in the starter. Submits through the
 * Wayfinder action for ContactController@store; validation errors render
 * per-field via InputError and success is announced by a toast
 * (see use-flash-toast).
 */
export default function Contact() {
    const { contactEmail } = usePage().props;

    return (
        <>
            <Seo
                title="Contact"
                description={`Send ${contactEmail} a message. The contact form goes straight to our inbox.`}
            />

            <PageHeader
                eyebrow="Contact"
                title="Say hello"
                lede="Questions, feedback, or a project in mind. Send a message and it lands in our inbox."
            />

            <Section className="py-8 md:py-12">
                <div className="grid gap-6 lg:grid-cols-3">
                    <Card className="lg:col-span-2">
                        <CardHeader>
                            <CardTitle>Send a message</CardTitle>
                            <CardDescription>
                                We read everything and reply to the email you
                                provide.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Form
                                {...ContactController.store.form()}
                                className="flex flex-col gap-5"
                            >
                                {({ processing, errors }) => (
                                    <>
                                        <div className="grid gap-2">
                                            <Label htmlFor="name">Name</Label>
                                            <Input
                                                id="name"
                                                name="name"
                                                autoComplete="name"
                                                required
                                            />
                                            <InputError message={errors.name} />
                                        </div>

                                        <div className="grid gap-2">
                                            <Label htmlFor="email">Email</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                name="email"
                                                autoComplete="email"
                                                required
                                            />
                                            <InputError
                                                message={errors.email}
                                            />
                                        </div>

                                        <div className="grid gap-2">
                                            <Label htmlFor="message">
                                                Message
                                            </Label>
                                            <Textarea
                                                id="message"
                                                name="message"
                                                rows={6}
                                                required
                                            />
                                            <InputError
                                                message={errors.message}
                                            />
                                        </div>

                                        <Button
                                            type="submit"
                                            size="lg"
                                            className="mt-2 w-fit"
                                            disabled={processing}
                                        >
                                            {processing
                                                ? 'Sending…'
                                                : 'Send message'}
                                        </Button>
                                    </>
                                )}
                            </Form>
                        </CardContent>
                    </Card>

                    <div className="flex flex-col gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Mail className="size-4" aria-hidden />
                                    Email us
                                </CardTitle>
                                <CardDescription>
                                    Prefer writing directly? Mail us anytime.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <a
                                    href={`mailto:${contactEmail}`}
                                    className="font-medium text-primary hover:underline"
                                >
                                    {contactEmail}
                                </a>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Clock className="size-4" aria-hidden />
                                    Response time
                                </CardTitle>
                                <CardDescription>
                                    We usually reply within two business days.
                                </CardDescription>
                            </CardHeader>
                        </Card>
                    </div>
                </div>
            </Section>
        </>
    );
}
