<?php

namespace App\Http\Controllers;

use App\Http\Resources\TaxiOrderResource;
use App\Models\TaxiOrder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Enum\TaxiOrderEnum;
use App\Services\TaxiOrderService;


class TaxiOrderController extends Controller
{
    public function index(Request $request)
    {
        $limit = 6;

        if($request->limit >= 1) {
            $limit = $request->limit;
        }

        $taxiOrder = TaxiOrder::limit($limit);

        if(isset(TaxiOrderEnum::$status[$request->status])) {
            $taxiOrder->where('status', '=', $request->status);
        }

        if(isset(TaxiOrderEnum::$sort[$request->sort])) {
            $taxiOrder->orderBy('created_at', $request->sort);
        }
        
        return $taxiOrder->paginate($limit);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'phone' => [
                'required', 
                'regex:' . TaxiOrderEnum::$regex['phone']
            ],
            TaxiOrderService::adressValidate('adress_from'),
            TaxiOrderService::adressValidate('adress_where')
        ]
        );

        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        $taxiOrder = TaxiOrder::create([
            'phone' => $request->phone,
            TaxiOrderService::adressCreate('adress_from', $request),
            TaxiOrderService::adressCreate('adress_where', $request),
            'status' => TaxiOrderEnum::$status['NEW'],

        ]);

        return response()->json(new TaxiOrderResource($taxiOrder), 201);
    }

    public function update(Request $request, TaxiOrder $taxiOrder)
    {
        $validator = Validator::make($request->all(), [
            'status' => 'required | in:' 
            . TaxiOrderEnum::$status['NEW'] 
            . ',' 
            . TaxiOrderEnum::$status['CANCELED'],
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