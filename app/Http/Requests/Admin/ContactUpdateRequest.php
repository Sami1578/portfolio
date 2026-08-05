<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class ContactUpdateRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'contact_info' => ['array'],
            'contact_info.*.label' => ['required', 'string', 'max:255'],
            'contact_info.*.value' => ['required', 'string', 'max:255'],
            'social_links' => ['array'],
            'social_links.*.label' => ['required', 'string', 'max:255'],
            'social_links.*.url' => ['required', 'string', 'max:255'],
            'whatsapp_number' => ['required', 'string', 'max:255'],
            'whatsapp_default_message' => ['required', 'string'],
        ];
    }
}
