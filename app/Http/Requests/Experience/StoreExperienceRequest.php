<?php

namespace App\Http\Requests\Experience;

use Illuminate\Foundation\Http\FormRequest;

class StoreExperienceRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // adjust if using policies
    }

    public function rules(): array
    {
        return [
            'role' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'company' => ['required', 'string', 'max:255'],

            'start_date' => ['required', 'date'],
            'end_date' => ['nullable', 'date', 'after_or_equal:start_date'],

            'is_current' => ['nullable', 'boolean'],

            'company_logo' => ['nullable', 'image', 'mimes:jpg,jpeg,png,svg', 'max:2048'],
            'company_website' => ['nullable', 'url', 'max:255'],

            'sort_order' => ['nullable', 'integer', 'min:0'],
        ];
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'is_current' => filter_var($this->is_current, FILTER_VALIDATE_BOOLEAN),
            'role' => trim($this->role),
            'company' => trim($this->company),
        ]);
    }
}
