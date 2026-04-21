<?php

namespace App\DataTables;

use App\Models\PortfolioInformation;
use Illuminate\Database\Eloquent\Builder;

class PortfolioInformationDataTable extends BaseDataTable
{
    protected string $dataKey = 'PortfolioInformation';

    protected function query(): Builder
    {
        return PortfolioInformation::select([
            'id', 'first_name', 'middle_name', 'last_name', 'email', 'address',
            'latitude', 'longitude', 'small_description',
            'created_at',
        ]);
    }

    protected function searchableColumns(): array
    {
        return ['first_name'];
    }

    protected function filterableColumns(): array
    {
        return ['first_name'];
    }

    protected function filterHandlers(): array
    {
        return ['first_name'];
    }

    protected function transform($portfolioInformation): array
    {
        return [
            'id' => $portfolioInformation->id,
            'first_name' => $portfolioInformation->first_name,
            'middle_name' => $portfolioInformation->middle_name,
            'last_name' => $portfolioInformation->last_name,
            'address' => $portfolioInformation->address,
            'latitude' => $portfolioInformation->latitude,
            'longitude' => $portfolioInformation->longitude,
            'phone_number' => $portfolioInformation->phone_number,
            'mobile_number' => $portfolioInformation->mobile_number,
            'email' => $portfolioInformation->email,
            'cv_link' => $portfolioInformation->cv_link,
            'linkedin_link' => $portfolioInformation->linkedin_link,
            'github_link' => $portfolioInformation->github_link,
            'website_link' => $portfolioInformation->website_link,
            'small_description' => $portfolioInformation->small_description,
            'description' => $portfolioInformation->description,
            'seo_title' => $portfolioInformation->seo_title,
            'seo_metatags' => $portfolioInformation->seo_metatags,
            'profile_image' => $portfolioInformation->profile_image,
            'cover_image' => $portfolioInformation->cover_image,

            'created_at' => $portfolioInformation->created_at->format('Y-m-d H:i'),
        ];
    }

    public function extraProps(): array
    {
        return [];
    }
}
