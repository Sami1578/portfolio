<?php

namespace App\Support;

/**
 * Allow-lists safe formatting/content tags for admin-authored post HTML (incl. inline images).
 */
trait SanitizesHtml
{
    protected function sanitizeHtml(string $html): string
    {
        $allowedTags = '<p><br><strong><em><s><u><h1><h2><h3><ul><ol><li>'
            . '<blockquote><code><pre><a><img>';

        $clean = strip_tags($html, $allowedTags);

        // Strip event handler attributes and javascript: URLs that could survive strip_tags.
        $clean = preg_replace('/\son\w+\s*=\s*("[^"]*"|\'[^\']*\')/i', '', $clean);
        $clean = preg_replace('/(href|src)\s*=\s*("javascript:[^"]*"|\'javascript:[^\']*\')/i', '$1="#"', $clean);

        return $clean ?? '';
    }
}
