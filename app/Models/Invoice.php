<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    use HasFactory;


    protected function casts(): array
    {
        return [
            'total_amount' => 'double',
        ];
    }
    protected $guarded = ['id', 'created_at', 'updated_at'];

    public function invoice_details()
    {
        return $this->hasMany(InvoiceDetails::class);
    }
}
