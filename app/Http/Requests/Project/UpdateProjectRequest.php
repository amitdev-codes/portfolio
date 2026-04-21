<?php

namespace App\Http\Requests\Project;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateProjectRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }
    public function prepareForValidation(): void
    {
        if ($this->has('tech') && is_string($this->tech)) {
            $this->merge([
                'tech' => json_decode($this->tech, true),
            ]);
        }
    }

    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'short_description' => ['nullable', 'string'],
            'full_description' => ['nullable', 'string'],
            'color' => ['nullable', 'string', 'max:50'],
            'emoji' => ['nullable', 'string', 'max:10'],
            'tech' => ['nullable', 'array'],
            'tech.*' => ['string'],
            'accent' => ['nullable', 'string', 'max:50'],
            'link' => ['nullable', 'url'],
            'sort_order' => ['nullable', 'integer'],
            'slug' => [
                'nullable',
                'string',
                Rule::unique('projects', 'slug')->ignore($this->route('project')),
            ],
            'is_featured' => ['boolean'],

            // MEDIA
            'cover_image' => ['nullable', 'image', 'max:2048'],
            'screenshots' => ['nullable', 'array', 'max:10'],
            'screenshots.*' => ['image', 'max:2048'],
        ];
    }
}
