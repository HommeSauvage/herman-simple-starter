<?php

use Inertia\Testing\AssertableInertia as Assert;

test('about page returns a successful response', function () {
    $this->get(route('about'))->assertOk();
});

test('about page renders the public about component', function () {
    $this->get(route('about'))
        ->assertInertia(fn (Assert $page) => $page->component('public/about'));
});

test('about page contains no Laravel marketing or hardcoded brand links', function () {
    $response = $this->get(route('about'));

    $response->assertOk();
    $response->assertDontSee('laravel.com');
});
