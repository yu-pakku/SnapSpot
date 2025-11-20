<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Spot;

class SpotController extends Controller
{
    public function index(Request $request)
    {
        $spots = Spot::all()->map(function ($spot) {
            return [
                "id" => $spot->id,
                "imageUrl" => $spot->image_url,
                "lat" => $spot->lat,
                "lng" => $spot->lng,
                "addressJa" => $spot->address_ja,
                "addressEn" => $spot->address_en,
                "addressZh" => $spot->address_zh,
                "addressKo" => $spot->address_ko,
                "nameJa" => $spot->name_ja,
                "nameEn" => $spot->name_en,
                "nameZh" => $spot->name_zh,
                "nameKo" => $spot->name_ko,
                "titleJa" => $spot->title_ja,
                "titleEn" => $spot->title_en,
                "titleZh" => $spot->title_zh,
                "titleKo" => $spot->title_ko,
                "createdAt" => $spot->created_at,
                "updatedAt" => $spot->updated_at,
            ];
        });

        return response()->json([
            "success" => true,
            "data" => $spots,
        ]);
    }

    public function store(Request $request)
    {
        $spot = Spot::create([
            "id" => $request->id,
            "image_url" => $request->imageUrl,
            "lat" => $request->lat,
            "lng" => $request->lng,
            "address_ja" => $request->addressJa,
            "address_en" => $request->addressEn,
            "address_zh" => $request->addressZh,
            "address_ko" => $request->addressKo,
            "name_ja" => $request->nameJa,
            "name_en" => $request->nameEn,
            "name_zh" => $request->nameZh,
            "name_ko" => $request->nameKo,
            "title_ja" => $request->titleJa,
            "title_en" => $request->titleEn,
            "title_zh" => $request->titleZh,
            "title_ko" => $request->titleKo,
        ]);

        return response()->json([
            "success" => true,
            "data" => $spot,
        ]);
    }
}
