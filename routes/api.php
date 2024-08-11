<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DataController;
use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\ProductController;

Route::post('/login', [AuthController::class, 'login']);

Route::group(['middleware' => 'auth:sanctum'], function () {

    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);
   

  



    Route::resource('/invoices', InvoiceController::class);
    Route::delete('/invoices/multiDestroy/{ids}', [InvoiceController::class, 'destroyMultiple']);
    Route::controller(DataController::class)->prefix('get')->group(function () {
        Route::get('/category', 'fetchCategory');
        Route::get('/product_by_category/{id}', 'fetchProductByCategory');
    });
    Route::post('import/products', [ProductController::class, 'import']);
});
