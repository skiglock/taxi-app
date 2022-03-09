<?php

namespace App\Services;

use App\Enum\TaxiOrderEnum;
use App\Models\TaxiOrder;


class TaxiOrderService
{
    public static function adressValidate ($adress) {
        return [
            $adress . '.latitude' => [
                'required',
                'regex:' . TaxiOrderEnum::$regex['latitude']
            ],
            $adress . '.longitude' => [
                'required',
                'regex:' . TaxiOrderEnum::$regex['longitude']
            ],
            $adress . '.description' => 'required | min: 5 | max: 500'
        ];
    }
    public static function adressCreate ($adress, $request) {
        return [
            $adress => [
                'latitude' => $request->$adress['latitude'],
                'longitude' => $request->$adress['longitude'],
                'description' => $request->$adress['description']
            ],
        ];
    }
}