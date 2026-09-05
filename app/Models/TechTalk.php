<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

#[Fillable([
    'number',
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
    'author_name',
    'slug',
])]
class TechTalk extends Model implements HasMedia
{
    use InteractsWithMedia;

    protected $table = 'tech_talks';

    protected $casts = [
        'date' => 'date',
        'is_published' => 'boolean',
    ];

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('cover_image')
            ->singleFile() // Only 1 cover image
            ->acceptsMimeTypes(['image/jpeg', 'image/png', 'image/webp']);
    }
//    public function getRouteKeyName(): string
//    {
//        return 'slug';
//    }

    public function codeExamples(): HasMany
    {
        return $this->hasMany(TechTalkCodeExample::class)->orderBy('sort_order');
    }

    public function screenshots(): HasMany
    {
        return $this->hasMany(TechTalkScreenshot::class)->orderBy('sort_order');
    }

    public function scopePublished($query)
    {
        return $query->where('is_published', true);
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('sort_order');
    }
}
