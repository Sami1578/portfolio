<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thanks for reaching out!</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f5; font-family: 'Segoe UI', Arial, sans-serif; color: #1a1a2e;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f5; padding: 40px 0;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08);">

                    {{-- Header --}}
                    <tr>
                        <td style="background: linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%); padding: 40px 48px; text-align: center;">
                            <p style="margin: 0 0 8px; font-size: 13px; letter-spacing: 3px; text-transform: uppercase; color: #94a3b8;">Portfolio</p>
                            <h1 style="margin: 0; font-size: 26px; font-weight: 700; color: #ffffff; letter-spacing: -0.5px;">Sami Ahmed</h1>
                            <p style="margin: 6px 0 0; font-size: 13px; color: #7dd3fc;">Full-Stack Developer</p>
                        </td>
                    </tr>

                    {{-- Body --}}
                    <tr>
                        <td style="padding: 48px 48px 32px;">
                            <p style="margin: 0 0 8px; font-size: 15px; color: #64748b;">Hi <strong style="color: #0f172a;">{{ $data['name'] }}</strong>,</p>

                            <h2 style="margin: 0 0 20px; font-size: 22px; font-weight: 700; color: #0f172a; line-height: 1.3;">
                                Thanks for getting in touch!
                            </h2>

                            <p style="margin: 0 0 16px; font-size: 15px; line-height: 1.7; color: #475569;">
                                I've received your message and appreciate you taking the time to reach out. I'll review it carefully and get back to you as soon as possible — usually within <strong>1–2 business days</strong>.
                            </p>

                            <p style="margin: 0 0 28px; font-size: 15px; line-height: 1.7; color: #475569;">
                                In the meantime, feel free to explore my work or connect with me on LinkedIn.
                            </p>

                            {{-- Summary card --}}
                            <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; border-left: 4px solid #3b82f6; border-radius: 6px; margin-bottom: 32px;">
                                <tr>
                                    <td style="padding: 20px 24px;">
                                        <p style="margin: 0 0 4px; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: #94a3b8;">Your Message Summary</p>
                                        <p style="margin: 0 0 10px; font-size: 14px; color: #64748b;"><strong style="color: #0f172a;">Subject:</strong> {{ $data['subject'] }}</p>
                                        <p style="margin: 0; font-size: 14px; color: #64748b; line-height: 1.6; white-space: pre-wrap;">{{ \Illuminate\Support\Str::limit($data['message'], 200) }}</p>
                                    </td>
                                </tr>
                            </table>

                            <p style="margin: 0; font-size: 15px; line-height: 1.7; color: #475569;">
                                Looking forward to connecting with you,
                            </p>
                            <p style="margin: 4px 0 0; font-size: 16px; font-weight: 700; color: #0f172a;">Sami Ahmed</p>
                        </td>
                    </tr>

                    {{-- Footer --}}
                    <tr>
                        <td style="background-color: #f8fafc; padding: 24px 48px; border-top: 1px solid #e2e8f0; text-align: center;">
                            <p style="margin: 0; font-size: 12px; color: #94a3b8; line-height: 1.6;">
                                This is an automated confirmation. Please do not reply to this email directly.<br>
                                You are receiving this because you submitted the contact form on my portfolio.
                            </p>
                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>
</body>
</html>
