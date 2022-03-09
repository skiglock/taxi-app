<?php

namespace App\Enum;

class TaxiOrderEnum
{

    public static $regex = [
        'phone' => '/^[\+]?([0-9][\s]?|[0-9]?)([(][0-9]{3}[)][\s]?|[0-9]{3}[-\s\.]?)[0-9]{3}[-\s\.]?[0-9]{4,6}$/im',
        'latitude' => '/^-?(90|[1-8][0-9][.][0-9]{1,20}|[0-9][.][0-9]{1,20})$/',
        'longitude' => '/^-?(180|1[1-7][0-9][.][0-9]{1,20}|[1-9][0-9][.][0-9]{1,20}|[0-9][.][0-9]{1,20})$/'
    ];

    public static $status =  [
        'NEW' => 'NEW',
        'CANCELED' => 'CANCELED'
    ];

    public static $sort = [
        'ASC' => 'ASC',
        'DESC' => 'DESC'
    ];
}
