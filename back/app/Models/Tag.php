<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    protected $fillable = [
        'category_id', 
        'name',
        'type'
        ];

    function spots() {
        return $this->belongsToMany(Spot::class);
    }
}
