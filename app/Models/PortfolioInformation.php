<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

#[Fillable(['first_name', 'middle_name', 'last_name', 'address', 'latitude', 'longitude', 'phone_number',
    'mobile_number', 'email', 'cv_link', 'linkedin_link', 'github_link', 'website_link', 'small_description',
    'description', 'seo_title', 'seo_metatags'])]

class PortfolioInformation extends Model implements HasMedia
{
    use InteractsWithMedia;

    protected $table = 'portfolio_informations';

    protected $casts = [
        'is_active' => 'boolean',
        'seo_metatags' => 'array',
    ];
}
