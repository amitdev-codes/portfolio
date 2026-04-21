<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['value',
    'label',
    'icon',
    'sort_order'])]
class Stat extends Model
{
    protected $table = 'stats';
}
