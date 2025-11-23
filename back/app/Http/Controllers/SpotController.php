<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Spot;
use DeepL\Translator;
use Illuminate\Support\Facades\Log;

class SpotController extends Controller
{
    public function index(Request $request)
    {
        $requestedType = strtolower($request->get('type', 'en'));
        $langKey = substr($requestedType, 0, 2);
        $nameField = "name_{$langKey}";
        $titleField = "title_{$langKey}";

        $spots = Spot::all()->map(function ($spot) use ($nameField, $titleField) {
            return [
                "id"        => $spot->id,
                "imageFile" => $spot->image_url,
                "name"      => $spot->{$nameField} ?? '',
                "title"     => $spot->{$titleField} ?? '',
            ];
        });

        return response()->json([
            "success" => true,
            "data"    => $spots
        ]);
    }

    public function show(Request $request, $id)
    {
        $requestedType = strtolower($request->get('type', 'en'));
        $langKey = substr($requestedType, 0, 2);
        $addressField = "address_{$langKey}";

        $spot = Spot::with('tags')->findOrFail($id);

        return response()->json([
            "id"        => $spot->id,
            "message"   => "Spot retrieved successfully",
            "lat"       => $spot->lat,
            "lng"       => $spot->lng,
            "address"   => $spot->{$addressField} ?? '',
            "tags"      => $spot->tags->map(function ($tag) use ($langKey) {
                $nameField = "name_{$langKey}";
                return [
                    "id"   => $tag->id,
                    "name" => $tag->{$nameField} ?? $tag->name_en,
                ];
            }),
        ]);
    }


    public function store(Request $request)
    {
        $request->validate([
            'imageFile' => 'required|file|image',
            'lat' => 'required|numeric',
            'lng' => 'required|numeric',
            'name' => 'required|string|max:255',
            'type' => 'required|in:ja,en,ko,zh',
            'address' => 'nullable|string|max:255',
            'title' => 'nullable|string|max:255',
            'tags' => 'nullable|array',
            'tags.*' => 'exists:tags,id',
        ]);

        try {
            $path = $request->file('imageFile')->store('spots', 'public');
            $imageUrl = url("storage/$path");
        } catch (\Exception $e) {
            Log::error('Failed to store Spot image', ['message' => $e->getMessage()]);
            return response()->json(['message' => 'Failed to store image'], 500);
        }

        $name = trim($request->name);
        $sourceLang = substr(strtolower($request->type), 0, 2);

        $translator = new Translator(env('DEEPL_API_KEY'));
        $locales = ['ja' => 'JA', 'en' => 'EN-US', 'ko' => 'KO', 'zh' => 'ZH'];

        try {
            $translatedName = [];
            foreach ($locales as $code => $deeplCode) {
                $translatedName[$code] = ($code === $sourceLang) ? $name : $translator->translateText($name, null, $deeplCode)->text;
            }

            $address = trim($request->address ?? '');
            $translatedAddress = [];
            foreach ($locales as $code => $deeplCode) {
                $translatedAddress[$code] = ($code === $sourceLang) ? $address : ($address === '' ? '' : $translator->translateText($address, null, $deeplCode)->text);
            }

            $title = trim($request->title ?? '');
            $translatedTitle = [];
            foreach ($locales as $code => $deeplCode) {
                $translatedTitle[$code] = ($code === $sourceLang) ? $title : ($title === '' ? '' : $translator->translateText($title, null, $deeplCode)->text);
            }

        } catch (\Exception $e) {
            Log::error('DeepL translation failed for Spot', [
                'message' => $e->getMessage(),
                'input' => ['name' => $name, 'address' => $request->address ?? '', 'title' => $request->title ?? ''],
            ]);

            foreach (array_keys($locales) as $code) {
                $translatedName[$code] = $name;
                $translatedAddress[$code] = $request->address ?? '';
                $translatedTitle[$code] = $request->title ?? '';
            }
        }

        $spot = Spot::create([
            'image_url' => $imageUrl,
            'lat' => $request->lat,
            'lng' => $request->lng,
            'type' => $sourceLang,
            'name_ja' => $translatedName['ja'],
            'name_en' => $translatedName['en'],
            'name_ko' => $translatedName['ko'],
            'name_zh' => $translatedName['zh'],
            'address_ja' => $translatedAddress['ja'],
            'address_en' => $translatedAddress['en'],
            'address_ko' => $translatedAddress['ko'],
            'address_zh' => $translatedAddress['zh'],
            'title_ja' => $translatedTitle['ja'],
            'title_en' => $translatedTitle['en'],
            'title_ko' => $translatedTitle['ko'],
            'title_zh' => $translatedTitle['zh'],
        ]);

        if ($request->has('tagIds')) {
            $spot->tags()->sync($request->tagIds);
        }

        return response()->json([
            'success' => true,
            'data' => $spot,
        ]);
    }
}