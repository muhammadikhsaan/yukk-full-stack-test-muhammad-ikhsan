<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title> Muhammad Ikhsan - Payment Application</title>
        @viteReactRefresh
        @vite('resources/js/App.jsx')
        @vite('resources/css/app.css')
    </head>
    <body>
        @inertia
    </body>
</html>
