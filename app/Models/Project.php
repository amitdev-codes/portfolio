<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

#[Fillable(['title', 'short_description', 'full_description', 'color', 'emoji', 'tech', 'accent', 'link', 'sort_order',
    'slug',
    'is_featured',
])]
class Project extends Model implements HasMedia
{
    use InteractsWithMedia;
    protected $table = 'projects';

    protected $casts = [
        'tech' => 'array',
        'is_featured' => 'boolean',
    ];


    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('project_cover')
            ->singleFile() // Only 1 cover image
            ->acceptsMimeTypes(['image/jpeg', 'image/png', 'image/webp']);

        $this->addMediaCollection('project_screenshots')
            ->acceptsMimeTypes(['image/jpeg', 'image/png', 'image/webp']);

        $this->addMediaCollection('default_images')
            ->acceptsMimeTypes(['image/jpeg', 'image/png', 'image/webp']);
    }
}
