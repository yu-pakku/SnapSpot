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

    public function index(Request $request)
    {
        $tags = Tag::all()->map(function ($tag) {
            return [
                "id" => $tag->id,
                "nameJa" => $tag->name_ja,
                "nameEn" => $tag->name_en,
                "nameZh" => $tag->name_zh,
                "nameKo" => $tag->name_ko,
                "type"=> $tag->type,
            ];
        });

        return response()->json([
            "data" => $tags,
            "message" => "Tags retrieved successfully"
        ]);
    }

}
