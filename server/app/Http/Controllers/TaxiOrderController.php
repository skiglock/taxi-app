<?php

namespace App\Http\Controllers;

use App\Http\Resources\TaxiOrderResource;
use App\Models\TaxiOrder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TaxiOrderHelpers {

    public static $regex = [
        'phone' => '/^[\+]?([0-9][\s]?|[0-9]?)([(][0-9]{3}[)][\s]?|[0-9]{3}[-\s\.]?)[0-9]{3}[-\s\.]?[0-9]{4,6}$/im',
        'latitude' => '/^-?(90|[1-8][0-9][.][0-9]{1,20}|[0-9][.][0-9]{1,20})$/',
        'longitude' => '/^-?(180|1[1-7][0-9][.][0-9]{1,20}|[1-9][0-9][.][0-9]{1,20}|[0-9][.][0-9]{1,20})$/'
    ];

    public static $status =  [
        'NEW' => 'NEW', 
        'CANCELED' => 'CANCELED'
    ];

    public static $createdFilters = [
        'ASC' => 'ASC',
        'DESC' => 'DESC'
    ];

    public static function validateAdress($adress) {
        return [
            $adress . '.latitude' => [
                'required', 
                'regex:' . self::$regex['latitude']
            ],
            $adress . '.longitude' => [
                'required', 
                'regex:' . self::$regex['longitude']
            ],
            $adress . '.description' => 'required | min: 5 | max: 500'
        ];
    }

}

class TaxiOrderController extends Controller
{

    public function index(Request $request)
    {
        $offset = 0;
        $limit = 6;

        if($request->offset >= 0) {
            $offset = $request->offset;
        }

        if($request->limit >= 1) {
            $limit = $request->limit;
        }

        $taxiOrder = TaxiOrder::offset($offset)->limit($limit);

        if(isset(TaxiOrderHelpers::$status[$request->status])) {
            $taxiOrder->where('status', '=', $request->status);
        }

        if(isset(TaxiOrderHelpers::$createdFilters[$request->created_at])) {
            $taxiOrder->orderBy('created_at', $request->created_at);
        }

        return $taxiOrder->get();
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'phone' => [
                'required', 
                'regex:' . TaxiOrderHelpers::$regex['phone']
            ]
        ] + TaxiOrderHelpers::validateAdress('adress_from') 
        + TaxiOrderHelpers::validateAdress('adress_where')
        );

        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        $taxiOrder = TaxiOrder::create([
            'phone' => $request->phone,
            'adress_from' => [
                'latitude' => $request->adress_from['latitude'],
                'longitude' => $request->adress_from['longitude'],
                'description' => $request->adress_from['description']
            ],
            'adress_where' => [
                'latitude' => $request->adress_where['latitude'],
                'longitude' => $request->adress_where['longitude'],
                'description' => $request->adress_where['description']
            ],
            'status' => TaxiOrderHelpers::$status['NEW'],

        ]);

        return response()->json(new TaxiOrderResource($taxiOrder), 201);
    }

    public function update(Request $request, TaxiOrder $taxiOrder)
    {
        $validator = Validator::make($request->all(), [
            'status' => 'required | in:' 
            . TaxiOrderHelpers::$status['NEW'] 
            . ',' 
            . TaxiOrderHelpers::$status['CANCELED'],
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        $taxiOrder->update($request->all());

        return response()->json($taxiOrder, 200);
    }

    public function destroy(TaxiOrder $taxiOrder)
    {
        $taxiOrder->delete();
        return response()->json(null, 204);
    }
}
