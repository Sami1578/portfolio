<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ContactController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'    => 'required|string|max:255',
            'email'   => 'required|email|max:255',
            'subject' => 'required|string|max:255',
            'message' => 'required|string',
        ]);

        // Optional: Send an email notification or save to database
        // Mail::to('your-email@example.com')->send(new ContactMessageMail($validated));

        return back()->with('success', 'Message sent successfully!');
    }
}
