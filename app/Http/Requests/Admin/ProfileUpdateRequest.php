<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class ProfileUpdateRequest extends FormRequest
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
            'name' => ['required', 'string', 'max:255'],
            'initials' => ['required', 'string', 'max:5'],
            'title' => ['required', 'string', 'max:255'],
            'tagline' => ['required', 'string'],
            'available' => ['required', 'boolean'],
            'availability_label' => ['required', 'string', 'max:255'],
            'location' => ['required', 'string', 'max:255'],
            'stack' => ['array'],
            'stack.*' => ['string', 'max:255'],
            'stats' => ['array'],
            'stats.*.value' => ['required', 'string', 'max:255'],
            'stats.*.label' => ['required', 'string', 'max:255'],
        ];
    }
}
