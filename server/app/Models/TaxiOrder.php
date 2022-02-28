<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class TaxiOrder extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $casts = [
        'adress_from' => 'array',
        'adress_where' => 'array',
    ];

    protected $fillable = [
        'phone',
        'adress_from',
        'adress_where',
        'status',
    ];

    public function setUpdatedAtAttribute($value)
    {
        // to Disable updated_at
    }

    protected static function boot()
    {
        parent::boot();
        static::creating(function ($taxiOrder) {
            $taxiOrder->{$taxiOrder->getKeyName()} = (string) Str::uuid();
        });
    }

    public function getIncrementing()
    {
        return false;
    }

    public function getKeyType()
    {
        return 'string';
    }
}
