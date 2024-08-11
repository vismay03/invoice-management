<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\StoreInvoiceRequest;
use App\Http\Requests\UpdateInvoiceRequest;
use Illuminate\Http\Request;

class InvoiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        $search = $request->search;

        $data = Invoice::
        when($search, function ($q) use ($search) {
            $q->where('customer_name', 'like', '%' . $search . '%');
        })->
        paginate(10);
        return response()->json([
            'data' => $data
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreInvoiceRequest $request)
    {
        //
        try {




            $invoice = Invoice::create($request->validated());
            $invoice->invoice_details()->createMany($request->invoice_details);


            return response()->json([
                'success' => true,
                'type' => "success",
                'message' => "Invoice created successfully",
            ]);
        } catch (\Throwable $th) {

            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Invoice $invoice)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Invoice $invoice)
    {
        $invoice->load('invoice_details');
        try {
            return response()->json([
                'data' => $invoice
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'type' => "error",
                'message' => $th->getMessage(),
            ]);
        }
        
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateInvoiceRequest $request, Invoice $invoice)
    {
        DB::beginTransaction();
        try {


          

            $invoice->update($request->validated());
            $invoice->invoice_details()->delete();
            $invoice->invoice_details()->createMany($request->invoice_details);




            DB::commit();
            return response()->json([
                'success' => true,
                'type' => "success",
                'message' => "Invoice updated successfully",
            ]);
        } catch (\Throwable $th) {
            DB::rollback();
            return response()->json([
                'type' => 'error',
                'message' => $th->getMessage()
            ], 500);
        }

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Invoice $invoice)
    {
        DB::beginTransaction();
        try {

            $invoice->invoice_details()->delete();
            $invoice->delete();


            DB::commit();

            return response()->json([
                'success' => true,
                'type' => "delete",
                'message' => "Invoice deleted successfully",
            ]);
        } catch (\Throwable $th) {
            DB::rollback();
            return response()->json([
                'type' => 'error',
                'message' => $th->getMessage()
            ], 500);
        }
    }

    public function destroyMultiple($ids)
    {
        try {

            DB::beginTransaction();

            $ids = explode(',', $ids);

            $invoices = Invoice::find($ids);

            foreach ($invoices as $invoice) {
                $invoice->invoice_details()->delete();
                $invoice->delete();
            }


            DB::commit();

          

            return response()->json([
                'success' => true,
                'type' => "delete",
                'message' => "Invoice deleted successfully",
            ]);
        } catch (\Throwable $th) {
            DB::rollback();
            return response()->json([
                'type' => 'error',
                'message' => $th->getMessage()
            ], 500);
        }
    }
}
