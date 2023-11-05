<?php

use App\Enums\TransactionType;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        $transactionType = TransactionType::cases();
        $enum = array_column($transactionType, 'value');

        Schema::create('transactions', function (Blueprint $table) use($enum) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->enum("type", $enum);
            $table->bigInteger('amount');
            $table->string('note')->nullable();
            $table->timestamps();
            $table->index(['type']);
            $table->foreign('user_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
