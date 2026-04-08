<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    protected $fillable = [
        'title',
        'file_path',
        'original_name',
        'mime_type',
        'file_size',
        'extracted_data',
        'extracted_at',
    ];

    protected $casts = [
        'extracted_data' => 'array',
        'extracted_at' => 'datetime',
    ];
}
