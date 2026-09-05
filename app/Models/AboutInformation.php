<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable([
    'section_label', 'heading_main', 'heading_highlight',
    'highlights',
    'experience_heading', 'experiences',
    'tech_stack_label', 'tech_stack',
    'is_active',
])]
class AboutInformation extends Model
{
    protected $table = 'about_informations';

    protected $casts = [
        'highlights' => 'array',
        'experiences' => 'array',
        'tech_stack' => 'array',
        'is_active' => 'boolean',
    ];
}
