<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TechTalkCodeExample extends Model
{
    protected $fillable = [
        'tech_talk_id',
        'title',
        'language',
        'code',
        'explanation',
        'sort_order',
    ];

    public function techTalk(): BelongsTo
    {
        return $this->belongsTo(TechTalk::class);
    }
}
