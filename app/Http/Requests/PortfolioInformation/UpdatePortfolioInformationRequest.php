<?php

namespace App\Http\Requests\PortfolioInformation;

use App\Models\PortfolioInformation;
use Illuminate\Foundation\Http\FormRequest;

class UpdatePortfolioInformationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $portfolioInformation = $this->route('portfolio_information');
        $portfolioId = $portfolioInformation instanceof PortfolioInformation
            ? $portfolioInformation->id
            : $this->route('id');

        return [
            'first_name' => ['required', 'string', 'max:255'],
            'middle_name' => ['nullable', 'string', 'max:255'],
            'last_name' => ['required', 'string', 'max:255'],

            // Hero / display settings
            'role_title' => ['nullable', 'string', 'max:255'],
            'tech_stack' => ['nullable', 'string', 'max:255'],
            'is_available' => ['boolean'],
            'availability_text' => ['nullable', 'string', 'max:255'],
            'stats' => ['nullable', 'array'],
            'stats.*.value' => ['required_with:stats', 'string', 'max:20'],
            'stats.*.label' => ['required_with:stats', 'string', 'max:50'],
            'skills' => ['nullable', 'array'],
            'skills.*' => ['string', 'max:50'],

            'address' => ['nullable', 'string', 'max:500'],
            'short_location' => ['nullable', 'string', 'max:255'],
            'latitude' => ['nullable', 'numeric', 'between:-90,90'],
            'longitude' => ['nullable', 'numeric', 'between:-180,180'],

            'phone_number' => ['nullable', 'string', 'max:30'],
            'mobile_number' => ['nullable', 'string', 'max:30'],
            'email' => ['required', 'email', 'max:255', "unique:portfolio_informations,email,{$portfolioId}"],

            'cv_link' => ['nullable', 'url', 'max:500'],
            'cv_file' => ['nullable', 'file', 'mimes:pdf,doc,docx', 'max:10240'],

            'linkedin_link' => ['nullable', 'url', 'max:500'],
            'github_link' => ['nullable', 'url', 'max:500'],
            'website_link' => ['nullable', 'url', 'max:500'],

            'small_description' => ['nullable', 'string', 'max:500'],
            'description' => ['nullable', 'string'],

            'seo_title' => ['nullable', 'string', 'max:255'],
            'seo_metatags' => ['nullable', 'string', 'max:1000'],

            // Optional on update — only replace if a new file is uploaded
            'profile_image' => ['nullable', 'image', 'mimes:jpeg,png,jpg,webp', 'max:5120'],
            'cover_image' => ['nullable', 'image', 'mimes:jpeg,png,jpg,webp', 'max:8192'],
        ];
    }
}
