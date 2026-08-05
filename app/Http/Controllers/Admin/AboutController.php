<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\AboutUpdateRequest;
use App\Models\About;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class AboutController extends Controller
{
    public function edit(): Response
    {
        return Inertia::render('Admin/About/Edit', [
            'about' => About::firstOrNew([]),
        ]);
    }

    public function update(AboutUpdateRequest $request): RedirectResponse
    {
        $about = About::firstOrNew([]);
        $about->fill($request->validated())->save();

        return back()->with('success', 'About section updated successfully.');
    }
}
