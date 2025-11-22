<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    protected $fillable = [
        'category_id',
        'name',
        'type',
        'name_ja',
        'name_en',
        'name_zh',
        'name_ko',
        ];

    function spots() {
        return $this->belongsToMany(Spot::class);
    }
}
