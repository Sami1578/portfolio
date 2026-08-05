<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class ProjectRequest extends FormRequest
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
            'title' => ['required', 'string', 'max:255'],
            'subtitle' => ['nullable', 'string', 'max:255'],
            'architecture_tag' => ['nullable', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'highlights' => ['array'],
            'highlights.*' => ['required', 'string'],
            'stats' => ['array'],
            'stats.*.value' => ['required', 'string', 'max:255'],
            'stats.*.label' => ['required', 'string', 'max:255'],
            'tech_stack' => ['array'],
            'tech_stack.*' => ['required', 'string', 'max:255'],
            'is_featured' => ['required', 'boolean'],
            'sort_order' => ['required', 'integer', 'min:0'],
        ];
    }
}
