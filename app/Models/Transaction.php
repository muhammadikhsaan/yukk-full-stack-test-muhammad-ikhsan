<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Transaction extends Model
{
    use HasFactory;

    private static $limit = 5;

    protected $fillable = [
        'user_id',
        'amount',
        'type',
        'note',
    ];

    private static function mainQueryTransaction($user_id, $queryString) {
        $queryTransaction = self::query();

        $queryTransaction->where('user_id', $user_id);

        foreach ($queryString as $key => $value) {
            switch ($key) {
                case 'page':
                    $queryTransaction->offset(($value-1)*self::$limit);
                    break;
                case 'startDate':
                    $queryTransaction->whereDate("created_at", '>=', $value);
                    break;
                case 'endDate':
                    $queryTransaction->whereDate("created_at", '<=', $value);
                    break;
                case 'type':
                    $queryTransaction->where("type", $value);
                    break;
                case 'keyword':
                    $queryTransaction->where("note", 'ilike', '%'.$value.'%');
                    break;
                default:
                    break;
            }
        }

        return $queryTransaction;
    }
    
    public static function selectCountDataQuery($user_id, $queryString) {
        $query = self::mainQueryTransaction($user_id, $queryString);
        $query->offset(0);

        return $query->count();
    }

    public static function selectHistoryQuery($user_id, $queryString) {
        $query = self::mainQueryTransaction($user_id, $queryString);

        $query->limit(self::$limit);
        $query->orderByDesc('created_at');

        return $query->get();
    }

    public static function selectCalculateQuery($user_id, $queryString) {
        $query = self::mainQueryTransaction($user_id, $queryString);
        $query->offset(0);

        $query->groupBy('type');
        $query->select("type", DB::raw('SUM("amount") as total_money'), DB::raw('SUM(1) as total_transaction'));

        return $query->get();
    }
}
