<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['role', 'description', 'company', 'start_date', 'end_date', 'is_current', 'company_logo', 'company_website', 'sort_order'])]
class Experience extends Model
{
    protected $table = 'experiences';
}
