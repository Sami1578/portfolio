<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ResourceRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $resourceId = $this->route('resource')?->id;

        return [
            'title' => ['required', 'string', 'max:255'],
            'slug' => [
                'nullable',
                'string',
                'max:255',
                'alpha_dash',
                Rule::unique('resources', 'slug')->ignore($resourceId),
            ],
            'short_description' => ['required', 'string', 'max:255'],
            'instructions' => ['nullable', 'string'],

            // Multiple media uploads — each still validated individually.
            'preview_files' => ['nullable', 'array', 'max:10'],
            'preview_files.*' => ['file', 'mimes:jpeg,jpg,png,webp,gif,mp4,webm', 'max:20480'],

            // IDs of existing ResourceMedia rows to delete on update, sent
            // from the edit form's per-thumbnail remove button when it's
            // queued instead of fired immediately.
            'remove_media_ids' => ['nullable', 'array'],
            'remove_media_ids.*' => ['integer', 'exists:resource_media,id'],

            'code_bundle' => ['nullable', 'file', 'mimes:zip', 'max:51200'],
            'tech_tags' => ['nullable', 'array'],
            'tech_tags.*' => ['string', 'max:50'],
            'is_active' => ['boolean'],
        ];
    }
}
