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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('part_number')->nullable();
            $table->foreignId('category_id')->nullable()->references('id')->on('categories')->onDelete('no action')->onUpdate('no action');
            $table->foreignId('part_id')->nullable()->references('id')->on('parts')->onDelete('no action')->onUpdate('no action');
            $table->foreignId('color_id')->nullable()->references('id')->on('colors')->onDelete('no action')->onUpdate('no action');
            $table->foreignId('size_id')->nullable()->references('id')->on('sizes')->onDelete('no action')->onUpdate('no action');
            $table->integer('quantity')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
