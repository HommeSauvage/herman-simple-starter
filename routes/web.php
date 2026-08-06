<?php

/*
|--------------------------------------------------------------------------
| Web Routes Loader
|--------------------------------------------------------------------------
|
| One file per domain — add files to routes/web/, don't edit this loader.
| Every routes/web/*.php file is loaded automatically in sorted order:
|
|   routes/web/public.php    Public (marketing/content) routes
|
| This starter ships no authenticated routes — add a routes/web/*.php
| file (e.g. app.php) when your product grows one.
|
*/

$routeFiles = glob(__DIR__.'/web/*.php') ?: [];

sort($routeFiles);

foreach ($routeFiles as $routeFile) {
    require $routeFile;
}
