<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VisitorAnalytics extends Model
{
    use HasFactory;

    protected $table = 'visitor_analytics';

    protected $fillable = [
        'ip_address',
        'user_agent',
        'referrer',
        'page_url',
        'latitude',
        'longitude',
        'city',
        'country',
        'total_visited',
        'last_visited_at',
    ];

    protected $casts = [
        'last_visited_at' => 'datetime',
    ];
}
