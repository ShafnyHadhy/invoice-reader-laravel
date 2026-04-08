<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    protected $fillable = [
        'invoice_id',
        'vendor',
        'transaction_date',
        'currency',
        'subtotal',
        'tax',
        'total',
        'transaction_type',
        'category',
        'line_items',
    ];

    protected $casts = [
        'line_items' => 'array',
        'transaction_date' => 'date',
    ];
}
