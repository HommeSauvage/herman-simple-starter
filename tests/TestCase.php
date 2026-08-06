<?php

namespace Tests;

use Illuminate\Foundation\Testing\TestCase as BaseTestCase;

abstract class TestCase extends BaseTestCase
{
    protected function setUp(): void
    {
        parent::setUp();

        // SSR needs a live dev server (vite) and makes rendered output
        // environment-dependent. Keep tests deterministic by exercising
        // the plain Inertia render path (blade fallback head) instead.
        config(['inertia.ssr.enabled' => false]);
    }
}
