<x-mail::message>
# New contact message

Someone used the contact form on {{ config('app.name') }}.

**Name:** {{ $name }}

**Email:** [{{ $email }}](mailto:{{ $email }})

**Message:**

{{ $message }}

<x-mail::button :url="'mailto:'.$email">
Reply to {{ $name }}
</x-mail::button>
</x-mail::message>
