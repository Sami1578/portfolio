<?php

namespace App\Http\Controllers;

use App\Mail\ContactConfirmationMail;
use App\Mail\ContactMessageMail;
use App\Models\ContactMessage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'    => 'required|string|max:255|min:4',
            'email'   => 'required|email|max:255|min:6',
            'subject' => 'required|string|max:255',
            'message' => 'required|string|min:10',
        ]);

        ContactMessage::create($validated);

        Mail::to(config('mail.to.address'))->send(new ContactMessageMail($validated));
        Mail::to($validated['email'])->send(new ContactConfirmationMail($validated));


        Log::info('Contact form submitted:', $validated);

        return back()->with('success', 'Message sent successfully!');
    }
}
