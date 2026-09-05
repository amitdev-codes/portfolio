<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TechTalkScreenshot extends Model
{
    protected $fillable = [
        'tech_talk_id',
        'image_path',
        'caption',
        'sort_order',
    ];

    public function techTalk(): BelongsTo
    {
        return $this->belongsTo(TechTalk::class);
    }

    public function getUrlAttribute(): string
    {
        return asset('storage/'.$this->image_path);
    }
}
