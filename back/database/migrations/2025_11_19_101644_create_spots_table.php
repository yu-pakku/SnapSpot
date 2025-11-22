<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('spots', function (Blueprint $table) {
            $table->id();
            $table->text("image_url");
            $table->double("lat",10,8);
            $table->double("lng",11,8);
            $table->string("address_ja");
            $table->string("address_en");
            $table->string("address_zh");
            $table->string("address_ko");
            $table->string("name_ja");
            $table->string("name_en");
            $table->string("name_zh");
            $table->string("name_ko");
            $table->string("title_ja");
            $table->string("title_en");
            $table->string("title_zh");
            $table->string("title_ko");
            $table->enum('type',['ja','en','zh','ko']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('spots');
    }
};
