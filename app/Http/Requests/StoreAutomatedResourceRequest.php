<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreAutomatedResourceRequest extends FormRequest
{
    public function authorize(): bool
    {
        // Authorization is handled by the VerifyAutomationKey middleware at
        // the route level, not here.
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'short_description' => ['required', 'string', 'max:500'],
            'instructions' => ['required', 'string'],
            'tech_tags' => ['required', 'string'], // JSON-encoded array string from the script
            'code_bundle_original_name' => ['nullable', 'string', 'max:255'],
            'thumbnail_url' => ['nullable', 'url'],
            'user_id' => ['nullable', 'integer', 'exists:users,id'],
            'code_bundle' => ['nullable', 'file', 'mimes:zip', 'max:10240'], // 10MB
        ];
    }
}