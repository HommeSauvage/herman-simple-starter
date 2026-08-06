<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Http\Requests\ContactRequest;
use App\Mail\ContactMessage;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    /**
     * Send the contact form message to the site owner.
     *
     * The recipient is the configured "from" address (MAIL_FROM_ADDRESS)
     * and the visitor is set as the reply-to, so hitting "Reply" in the
     * inbox answers the right person.
     */
    public function store(ContactRequest $request): RedirectResponse
    {
        $message = new ContactMessage(
            name: $request->name,
            email: $request->email,
            message: $request->message,
        );

        $message->replyTo($request->email, $request->name);

        Mail::to(config('mail.from.address'))->send($message);

        return back()->with('toast', [
            'type' => 'success',
            'message' => 'Thanks — your message is on its way.',
        ]);
    }
}
