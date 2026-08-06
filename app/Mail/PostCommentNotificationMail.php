<?php

namespace App\Mail;

use App\Models\PostComment;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class PostCommentNotificationMail extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public function __construct(public PostComment $comment)
    {
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'New comment awaiting review: ' . $this->comment->post->title,
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.post-comment-notification',
        );
    }

    public function attachments(): array
    {
        return [];
    }
}
