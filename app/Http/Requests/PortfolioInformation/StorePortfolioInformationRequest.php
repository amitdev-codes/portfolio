<?php

namespace App\Http\Requests\PortfolioInformation;

use Illuminate\Foundation\Http\FormRequest;

class StorePortfolioInformationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'first_name' => ['required', 'string', 'max:255'],
            'middle_name' => ['nullable', 'string', 'max:255'],
            'last_name' => ['required', 'string', 'max:255'],
            'address' => ['nullable', 'string', 'max:500'],
            'latitude' => ['nullable', 'numeric', 'between:-90,90'],
            'longitude' => ['nullable', 'numeric', 'between:-180,180'],
            'phone_number' => ['nullable', 'string', 'max:30'],
            'mobile_number' => ['nullable', 'string', 'max:30'],
            'email' => ['required', 'email', 'max:255', 'unique:portfolio_informations,email'],
            'cv_link' => ['nullable', 'url', 'max:500'],
            'linkedin_link' => ['nullable', 'url', 'max:500'],
            'github_link' => ['nullable', 'url', 'max:500'],
            'website_link' => ['nullable', 'url', 'max:500'],
            'small_description' => ['nullable', 'string', 'max:500'],
            'description' => ['nullable', 'string'],
            'seo_title' => ['nullable', 'string', 'max:255'],
            'seo_metatags' => ['nullable', 'array'],
            'seo_metatags.*' => ['string', 'max:255'],

            'profile_image' => ['required', 'image', 'mimes:jpeg,png,jpg,webp', 'max:5120'],
            'cover_image'   => ['nullable', 'image', 'mimes:jpeg,png,jpg,webp', 'max:8192'],
        ];
    }
}
