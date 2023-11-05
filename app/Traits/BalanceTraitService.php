<?php

namespace App\Traits;

use App\Enums\TransactionType;
use App\Models\Balance;

trait BalanceTraitService {
  public $balance;

  public function getBalance($user_id) {
    if (!$this->balance) {
      $this->balance = Balance::where('user_id', $user_id)->first();
    }

    return $this;
  }

  public function calculateBalance($type, $number) {
    switch ($type) {
      case TransactionType::TOPUP->value:
        return $this->balance->total + $number;
      case TransactionType::TRANSACTION->value:
        return $this->balance->total - $number;
      default:
        return $this->balance->total;
    }
  }
}