<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;


#[Fillable(['number',
    'category',
    'category_color',
    'title',
    'excerpt',
    'date',
    'read_time',
    'sort_order',
    'cover_image',
    'video_link',
    'source_link',
    'is_published',
    'slug',
])]
class TechTalk extends Model implements HasMedia
{
    use InteractsWithMedia;

    protected $table = 'tech_talks';

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('cover_image')
            ->singleFile() // Only 1 cover image
            ->acceptsMimeTypes(['image/jpeg', 'image/png', 'image/webp']);
    }
}
