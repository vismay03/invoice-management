<?php

namespace App\Imports;

use App\Models\Part;
use App\Models\Color;
use App\Models\Product;
use App\Models\Category;
use App\Models\Size;
use Maatwebsite\Excel\Concerns\ToModel;

class ProductImport implements ToModel
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        if(empty($row[5]) || $row[0] == "PartType" ){
            return;
        }










        $category_id = !empty($row[0]) ? Category::firstOrCreate(['name'=> $row[0]])->id : Category::query()->latest()->value('id');
        $part_id = !empty($row[1]) ? Part::firstOrCreate(['name'=> $row[1]])->id : Part::query()->latest()->value('id');
        $size_id = !empty($row[2]) ? Size::firstOrCreate(['name'=> $row[2]])->id : Size::query()->latest()->value('id');
        $color_id = !empty($row[3]) ? Color::firstOrCreate(['name'=>$row[3]])->id : Color::query()->latest()->value('id');

        $product = Product::create([
            'part_number' => $row[5],
            'category_id' => $category_id,
            'part_id' => $part_id,
            'color_id' => $color_id,
            'size_id' => $size_id,
            'quantity' => $row[4],
        ]);



        $product->price()->create([
            'single_price' => $row[6],
            'bulk_price' => $row[7],
        ]);



        return $product;
    }
}
