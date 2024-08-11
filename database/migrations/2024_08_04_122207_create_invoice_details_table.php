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
        Schema::create('invoice_details', function (Blueprint $table) {
            $table->id();
            $table->foreignId('category_id')->nullable()->references('id')->on('categories')->onDelete('no action')->onUpdate('no action');
            $table->foreignId('product_id')->nullable()->references('id')->on('products')->onDelete('no action')->onUpdate('no action');
            $table->integer('quantity')->nullable();
            $table->decimal('amount', 10, 2)->nullable();
            $table->foreignId('invoice_id')->nullable()->references('id')->on('invoices')->onDelete('no action')->onUpdate('no action');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('invoice_details');
    }
};
