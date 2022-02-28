<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TaxiOrderController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/orders', [TaxiOrderController::class, 'index']);
Route::post('/order/new', [TaxiOrderController::class, 'store']);
Route::put('/orders/{taxiOrder}', [TaxiOrderController::class, 'update']);
Route::delete('/orders/{taxiOrder}', [TaxiOrderController::class, 'destroy']);
