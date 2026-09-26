<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

#[Fillable([
    'first_name', 'middle_name', 'last_name',
    'role_title', 'tech_stack', 'skills',
    'address', 'short_location', 'latitude', 'longitude',
    'phone_number', 'mobile_number', 'email',
    'cv_link', 'linkedin_link', 'github_link', 'website_link',
    'small_description', 'description',
    'is_available', 'availability_text', 'stats',
    'seo_title', 'seo_metatags',
    'profile_image', 'cover_image', 'is_active',
])]
class PortfolioInformation extends Model implements HasMedia
{
    use InteractsWithMedia;

    protected $table = 'portfolio_informations';

    protected $casts = [
        'stats' => 'array',
        'skills' => 'array',
        'is_available' => 'boolean',
        'is_active' => 'boolean',
        'latitude' => 'decimal:7',
        'longitude' => 'decimal:7',
    ];

    // Single-file collections auto-replace the old file when a new one is added
    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('profile_images')->singleFile();
        $this->addMediaCollection('cover_images')->singleFile();
        $this->addMediaCollection('cv_documents')
            ->singleFile()
            ->acceptsMimeTypes([
                'application/pdf',
                'application/msword',
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            ]);
    }
}
