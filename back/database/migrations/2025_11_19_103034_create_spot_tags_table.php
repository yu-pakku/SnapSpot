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
        Schema::create('spot_tags', function (Blueprint $table) {
            $table->unsignedBigInteger("spot_id");
            $table->unsignedBigInteger("tag_id");
            $table->primary(['spot_id', 'tag_id']);
            $table->foreign('spot_id')->references('id')->on('spots')->onDelete('cascade');
            $table->foreign('tag_id')->references('id')->on('tags')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('spot_tags');
    }
};
