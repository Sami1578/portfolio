<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>New Comment</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <h2>New comment awaiting review</h2>
    <p><strong>Post:</strong> {{ $comment->post->title }}</p>
    <p><strong>Name:</strong> {{ $comment->author_name }}</p>
    <p><strong>Email:</strong> {{ $comment->author_email }}</p>
    <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
    <p><strong>Comment:</strong></p>
    <p style="white-space: pre-wrap; background: #f9f9f9; padding: 15px; border-radius: 5px;">{{ $comment->body }}</p>
    <p style="margin-top: 24px;">
        <a href="{{ route('admin.comments.index') }}">Review comments in the admin dashboard</a>
    </p>
</body>
</html>
