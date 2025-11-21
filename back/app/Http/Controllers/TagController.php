<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Tag;

class TagController extends Controller
{
    public function store(Request $request)
    {
        $tags = Tag::create([
            "name" => $request->name,
            "type" => $request->type,
        ]);

        return response()->json([
            "id" => $tags->id,
            "message" =>"Tag created successfully"
        ]);
    }
}
