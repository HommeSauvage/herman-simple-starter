<?php

use App\Mail\ContactMessage;
use Illuminate\Support\Facades\Mail;
use Inertia\Testing\AssertableInertia as Assert;

test('contact page returns a successful response', function () {
    $this->get(route('contact'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page->component('public/contact'));
});

test('a valid message is mailed to the configured address and shows a toast', function () {
    Mail::fake();

    $response = $this
        ->from(route('contact'))
        ->post(route('contact.store'), [
            'name' => 'Jane Doe',
            'email' => 'jane@example.com',
            'message' => 'Hello, I have a question about your product.',
        ]);

    Mail::assertQueued(ContactMessage::class, function (ContactMessage $mail) {
        return $mail->hasTo(config('mail.from.address'))
            && $mail->hasReplyTo('jane@example.com', 'Jane Doe')
            && $mail->name === 'Jane Doe'
            && $mail->message === 'Hello, I have a question about your product.';
    });

    $response->assertRedirect(route('contact'));

    $response->assertSessionHas('toast', [
        'type' => 'success',
        'message' => 'Thanks — your message is on its way.',
    ]);
});

test('an invalid message is not mailed and shows validation errors', function () {
    Mail::fake();

    $response = $this
        ->from(route('contact'))
        ->post(route('contact.store'), [
            'name' => '',
            'email' => 'not-an-email',
            'message' => '',
        ]);

    Mail::assertNothingQueued();

    $response->assertSessionHasErrors(['name', 'email', 'message']);
});

test('contact message content renders the visitor details', function () {
    $mail = new ContactMessage(
        name: 'Jane Doe',
        email: 'jane@example.com',
        message: 'Hello from the contact form.',
    );

    $mail->assertSeeInHtml('Jane Doe');
    $mail->assertSeeInHtml('jane@example.com');
    $mail->assertSeeInHtml('Hello from the contact form.');
});
