<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class RedirectOldDomain
{
    public function handle(Request $request, Closure $next)
    {
        if (str_contains($request->header('host'), 'onrender.com')) {
            return redirect()->to('https://samiahmed.dev' . $request->getRequestUri(), 301);
        }

        return $next($request);
    }
}