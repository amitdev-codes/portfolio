<?php

namespace App\Http\Requests\AboutInformation;

use Illuminate\Foundation\Http\FormRequest;

class StoreAboutInformationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'section_label' => ['nullable', 'string', 'max:100'],
            'heading_main' => ['nullable', 'string', 'max:100'],
            'heading_highlight' => ['nullable', 'string', 'max:100'],

            'highlights' => ['nullable', 'array'],
            'highlights.*.icon' => ['nullable', 'string', 'max:10'],
            'highlights.*.title' => ['required_with:highlights', 'string', 'max:100'],
            'highlights.*.desc' => ['required_with:highlights', 'string', 'max:300'],

            'experience_heading' => ['nullable', 'string', 'max:150'],
            'experiences' => ['nullable', 'array'],
            'experiences.*.year' => ['required_with:experiences', 'string', 'max:50'],
            'experiences.*.role' => ['required_with:experiences', 'string', 'max:150'],
            'experiences.*.company' => ['required_with:experiences', 'string', 'max:150'],
            'experiences.*.desc' => ['required_with:experiences', 'string', 'max:500'],

            'tech_stack_label' => ['nullable', 'string', 'max:100'],
            'tech_stack' => ['nullable', 'array'],
            'tech_stack.*' => ['string', 'max:50'],

            'is_active' => ['boolean'],
        ];
    }
}
