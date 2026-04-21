<?php

namespace App\Http\Requests\Stat;

use Illuminate\Foundation\Http\FormRequest;

class UpdateStatRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // adjust if needed
    }

    public function rules(): array
    {
        return [
            'value' => ['required', 'string', 'max:255'],
            'label' => ['required', 'string', 'max:255'],
            'icon' => ['nullable', 'string', 'max:255'],
            'sort_order' => [
                'nullable',
                'integer',
                'min:0',
                'unique:stats,sort_order,' . $this->route('stat')->id,
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'value.required' => 'Value is required.',
            'label.required' => 'Label is required.',
        ];
    }
}
