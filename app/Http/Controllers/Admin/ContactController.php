<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\ContactUpdateRequest;
use App\Models\Contact;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ContactController extends Controller
{
    public function edit(): Response
    {
        return Inertia::render('Admin/Contact/Edit', [
            'contact' => Contact::firstOrNew([]),
        ]);
    }

    public function update(ContactUpdateRequest $request): RedirectResponse
    {
        $contact = Contact::firstOrNew([]);
        $contact->fill($request->validated())->save();

        return back()->with('success', 'Contact details updated successfully.');
    }
}
