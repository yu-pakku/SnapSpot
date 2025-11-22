<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Tag;
use DeepL\Translator;
use Illuminate\Support\Facades\Log;

class TagController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            "name" => "required|string",
            "type" => "required|string",
        ]);

        $name = $request->name;
        $sourceLang = strtolower($request->type);

        $translator = new Translator(env('DEEPL_API_KEY'));

        try {
            $translated = [
                "ja" => $translator->translateText($name, null, "JA")->text,
                "en" => $translator->translateText($name, null, "EN-US")->text,
                "ko" => $translator->translateText($name, null, "KO")->text,
                "zh" => $translator->translateText($name, null, "ZH")->text,
            ];
        } catch (\Exception $e) {
            Log::error('DeepL translation failed', [
                'message' => $e->getMessage(),
                'input' => $name,
            ]);

            return response()->json([
                'message' => 'Translation service unavailable',
                'error' => $e->getMessage(),
            ], 502);
        }

        $exists = Tag::where("name_en", $translated["en"])->first();
        if ($exists) {
            return response()->json([
                "id" => $exists->id,
                "message" => "Tag already exists"
            ], 200);
        }

        $tag = Tag::create([
            "type"    => $sourceLang,
            "name_ja" => $translated["ja"],
            "name_en" => $translated["en"],
            "name_zh" => $translated["zh"],
            "name_ko" => $translated["ko"],
        ]);

        return response()->json([
            "id" => $tag->id,
            "message" => "Tag created successfully"
        ]);
    }

    public function index(Request $request)
    {
        // Normalize requested type (accepts 'en', 'en-US', 'ja', etc.)
        $requestedType = strtolower($request->get('type', 'en'));
        $langKey = substr($requestedType, 0, 2);

        $fieldMap = [
            'ja' => 'name_ja',
            'en' => 'name_en',
            'ko' => 'name_ko',
            'zh' => 'name_zh',
        ];

        $field = $fieldMap[$langKey] ?? 'name_en';

        $tags = Tag::all()->map(function ($tag) use ($field) {
            return [
                'id' => $tag->id,
                'name' => $tag->{$field} ?? '',
            ];
        });

        return response()->json([
            'data' => $tags,
            'message' => 'Tags retrieved successfully',
        ]);
    }
}
