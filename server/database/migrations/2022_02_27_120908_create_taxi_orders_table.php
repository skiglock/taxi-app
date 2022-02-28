<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('taxi_orders', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->timestamps();
            $table->string('phone')->nullable();
            $table->json('adress_from')->nullable();
            $table->json('adress_where')->nullable();
            $table->enum('status', ['NEW', 'CANCELED'])->default('NEW');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('taxi_orders');
    }
};
