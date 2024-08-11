<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;

class DataController extends Controller
{
    public function fetchCategory(){
        return Category::get(['id', 'name'])->all();
    }

    public function fetchProductByCategory($id){
        return Product::with('price:id,product_id,bulk_price,single_price')->whereCategoryId($id)->get(['id', 'part_number as name', 'quantity'])->all();
    }
}
