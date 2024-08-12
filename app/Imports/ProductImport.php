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
    
    public $category = null;

    public $part = null;

    public $size = null;

    public $color = null;

    /**
     * @param array $row
     *
     * @return \Illuminate\Database\Eloquent\Model|null
     */
    public function model(array $row)
    {
        if (empty($row[5]) || $row[0] == "PartType" || Product::where('part_number', $row[5])->exists()) {
            return;
        }



        if (!empty($row[0])) {
            $this->category = $row[0];
        }

        

        if (!empty($row[1])) {
            $this->part = $row[1];
        }

        if (!empty($row[2])) {
            $this->size = $row[2];
        }

        if (!empty($row[3])) {
            $this->color = $row[3];
        }


        $category_id =  Category::firstOrCreate(['name' => $this->category])->id;
        $part_id = Part::firstOrCreate(['name' => $this->part])->id;
        $size_id = Size::firstOrCreate(['name' => $this->size])->id;
        $color_id =  Color::firstOrCreate(['name' => $this->color])->id;

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
