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
            'name' => 'required|string|max:255',
            'type' => 'required|string|in:ja,en,ko,zh',
        ]);

        $name = trim($request->name);
        $sourceLang = substr(strtolower($request->type), 0, 2);

        $translator = new Translator(env('DEEPL_API_KEY'));

        // Build translations but avoid translating into the source language (use original)
        try {
            $translated = [];
            $locales = ['ja' => 'JA', 'en' => 'EN-US', 'ko' => 'KO', 'zh' => 'ZH'];
            foreach ($locales as $code => $deeplCode) {
                if ($code === $sourceLang) {
                    $translated[$code] = $name;
                } else {
                    $translated[$code] = $translator->translateText($name, null, $deeplCode)->text;
                }
            }
        } catch (\Exception $e) {
            // Log and fallback: use original name for all languages to keep creation robust
            Log::error('DeepL translation failed for Tag', [
                'message' => $e->getMessage(),
                'input' => $name,
            ]);

            $translated = [
                'ja' => $name,
                'en' => $name,
                'ko' => $name,
                'zh' => $name,
            ];
        }

        // Check duplicate using the requested language column and type
        $fieldMap = ['ja' => 'name_ja', 'en' => 'name_en', 'ko' => 'name_ko', 'zh' => 'name_zh'];
        $checkField = $fieldMap[$sourceLang] ?? 'name_en';
        $checkValue = $translated[$sourceLang] ?? $name;

        $exists = Tag::where($checkField, $checkValue)->where('type', $sourceLang)->first();
        if ($exists) {
            return response()->json([
                'id' => $exists->id,
                'message' => 'Tag already exists'
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
