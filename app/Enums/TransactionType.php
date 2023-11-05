<?php
namespace App\Enums;

enum TransactionType: string {
  case TOPUP = 'TOPUP';
  case TRANSACTION = 'TRANSACTION';
}