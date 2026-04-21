<?php

namespace App\Http\Requests\TechTalk;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Str;

class StoreTechTalkRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'number' => ['nullable', 'integer', 'min:0'],
            'category' => ['required', 'string', 'max:255'],
            'category_color' => ['nullable', 'string', 'max:50'],

            'title' => ['required', 'string', 'max:255'],
            'excerpt' => ['nullable', 'string'],

            'date' => ['required', 'date'],
            'read_time' => ['nullable', 'string', 'max:50'],

            'sort_order' => ['nullable', 'integer', 'min:0'],

            'cover_image' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'],

            'video_link' => ['nullable', 'url'],
            'source_link' => ['nullable', 'url'],

            'is_published' => ['nullable', 'boolean'],

            'slug' => ['nullable', 'string', 'max:255', 'unique:tech_talks,slug'],
        ];
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'is_published' => filter_var($this->is_published, FILTER_VALIDATE_BOOLEAN),
            'title' => trim($this->title),
            'slug' => $this->slug ?: Str::slug($this->title),
        ]);
    }
}
