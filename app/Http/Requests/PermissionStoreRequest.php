<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class PermissionStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:100|alpha_dash',
            'guard_name' => 'nullable|string|in:web,api',
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'Permission name is required',
            'name.alpha_dash' => 'Permission name can only contain letters, numbers, dashes and underscores',
        ];
    }
}
