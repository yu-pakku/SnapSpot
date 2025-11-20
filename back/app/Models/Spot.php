<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Spot extends Model
{
    protected $fillable = [
        'image_url',
        'lat',
        'lng',
        'address_ja',
        'address_en',
        'address_zh',
        'address_ko',
        'name_ja',
        'name_en',
        'name_zh',
        'name_ko',
        'title_ja',
        'title_en',
        'title_zh',
        'title_ko'
        ];

    function tags() {
        return $this->belongsToMany(Tag::class);
    }
}
