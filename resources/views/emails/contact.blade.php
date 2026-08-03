<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Contact Message</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <h2>New Portfolio Contact Form Submission</h2>
    <p><strong>Name:</strong> {{ $data['name'] }}</p>
    <p><strong>Email:</strong> {{ $data['email'] }}</p>
    <p><strong>Subject:</strong> {{ $data['subject'] }}</p>
    <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
    <p><strong>Message:</strong></p>
    <p style="white-space: pre-wrap; background: #f9f9f9; padding: 15px; border-radius: 5px;">{{ $data['message'] }}</p>
</body>
</html>