<?php

namespace App\Http\Controllers;

use App\Mail\PostCommentNotificationMail;
use App\Models\Post;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\Rule;

class BlogCommentController extends Controller
{
    public function store(Request $request, Post $post): RedirectResponse
    {
        $validated = $request->validate([
            'author_name' => ['required', 'string', 'max:255'],
            'author_email' => ['required', 'email', 'max:255'],
            'body' => ['required', 'string', 'min:2', 'max:2000'],
            'parent_id' => [
                'nullable',
                Rule::exists('post_comments', 'id')->where('post_id', $post->id)->whereNull('parent_id'),
            ],
        ]);

        $comment = $post->comments()->create([
            'parent_id' => $validated['parent_id'] ?? null,
            'author_name' => $validated['author_name'],
            'author_email' => $validated['author_email'],
            'body' => $validated['body'],
            'status' => 'pending',
            'ip_address' => $request->ip(),
        ]);

        $request->session()->put('commenter_email', $validated['author_email']);

        Mail::to(config('mail.to.address'))->queue(new PostCommentNotificationMail($comment));

        return back()->with('success', 'Thanks! Your comment is awaiting review.');
    }
}
