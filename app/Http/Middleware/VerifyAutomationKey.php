<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class VerifyAutomationKey
{
    /**
     * Shared auth for both automation endpoints (blog + resources).
     *
     * Uses a single key — config('app.blog_automation_key') — so both
     * GitHub Actions workflows authenticate the same way. The config name
     * is kept as "blog_automation_key" since that's the existing env var
     * (BLOG_AUTOMATION_KEY) already set in production; no need to rotate
     * secrets or add a second one just to rename it.
     */
    public function handle(Request $request, Closure $next)
    {
        $key = $request->header('X-Automation-Key');

        if (!$key || $key !== config('app.blog_automation_key')) {
            return response()->json(['message' => 'Unauthorized key.'], 401);
        }

        return $next($request);
    }
}