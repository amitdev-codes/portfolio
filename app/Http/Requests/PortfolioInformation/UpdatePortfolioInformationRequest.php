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
            'address' => ['nullable', 'string', 'max:500'],
            'latitude' => ['nullable', 'numeric', 'between:-90,90'],
            'longitude' => ['nullable', 'numeric', 'between:-180,180'],
            'phone_number' => ['nullable', 'string', 'max:30'],
            'mobile_number' => ['nullable', 'string', 'max:30'],
            'email' => ['required', 'email', 'max:255', "unique:portfolio_informations,email,{$portfolioId}"],
            'cv_link' => ['nullable', 'url', 'max:500'],
            'linkedin_link' => ['nullable', 'url', 'max:500'],
            'github_link' => ['nullable', 'url', 'max:500'],
            'website_link' => ['nullable', 'url', 'max:500'],
            'small_description' => ['nullable', 'string', 'max:500'],
            'description' => ['nullable', 'string'],
            'seo_title' => ['nullable', 'string', 'max:255'],
            'seo_metatags' => ['nullable', 'array'],
            'seo_metatags.*' => ['string', 'max:255'],
        ];
    }
}
