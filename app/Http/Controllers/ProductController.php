<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use App\Imports\ProductImport;
use Maatwebsite\Excel\Facades\Excel;
use Maatwebsite\Excel\Validators\ValidationException;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        //
    }

    public function import(Request $request)
    {

        $request->validate([
            'file' => 'required|mimes:xlsx'
        ]);

        try {
            //code...
            $file = $request->file('file');

            if (!$file->isValid()) {
                return response()->json(['type' => 'error', 'message' => 'File is not valid.']);
            }

            Excel::import(new ProductImport, $file);
            return response()->json(['type' => 'success', 'message' => 'Data imported successfully.']);

        } catch (ValidationException $th) {

            return response()->json([ 'type' => 'error', 'message' => $th]);
        }
    }
}
