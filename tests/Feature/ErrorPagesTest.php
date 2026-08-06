<?php

use Inertia\Testing\AssertableInertia as Assert;

test('unknown paths render the error page with a 404 status', function () {
    $response = $this->get('/definitely-not-a-page');

    $response->assertNotFound();
    $response->assertInertia(fn (Assert $page) => $page
        ->component('error')
        ->where('status', 404),
    );
});

test('error responses keep JSON semantics for API-style requests', function () {
    $response = $this->getJson('/definitely-not-a-page');

    $response->assertNotFound();
    $response->assertHeader('content-type', 'application/json');
});
