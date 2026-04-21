<?php

namespace App\Http\Requests\Stat;

use Illuminate\Foundation\Http\FormRequest;

class StoreStatRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // change if you use policies/permissions
    }

    public function rules(): array
    {
        return [
            'value' => ['required', 'string', 'max:255'],
            'label' => ['required', 'string', 'max:255'],
            'icon' => ['nullable', 'string', 'max:255'], // or 'image' if uploading file
            'sort_order' => ['nullable', 'integer', 'min:0', 'unique:stats,sort_order'],
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
