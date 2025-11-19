<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Spot extends Model
{
    protected $fillable = [
        'image_url', 
        'address',
        'name',
        'lat',
        'lng',
        'title'
        ];

    function tags() {
        return $this->belongsToMany(Tag::class);
    }
}
