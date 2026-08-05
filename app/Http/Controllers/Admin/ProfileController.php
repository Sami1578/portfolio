<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\ProfileUpdateRequest;
use App\Models\Profile;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    public function edit(): Response
    {
        return Inertia::render('Admin/Profile/Edit', [
            'profile' => Profile::firstOrNew([]),
        ]);
    }

    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $profile = Profile::firstOrNew([]);
        $profile->fill($request->validated())->save();

        return back()->with('success', 'Profile updated successfully.');
    }
}
