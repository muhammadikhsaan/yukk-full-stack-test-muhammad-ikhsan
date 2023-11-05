<?php

namespace App\Http\Controllers;

use App\Enums\TransactionType;
use App\Models\Balance;
use App\Models\Transaction;
use App\Traits\BalanceTraitService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class TransactionController extends Controller
{
    use BalanceTraitService;

    private string $dir = 'Pages/Transaction';

    public function index(){
        return to_route('transaction.history');
    }
    
    public function HistoryPage(Request $req){
        $data = [
            "balance" => 0,
            "paginate" => [
                "total" => 0,
            ],
            "history" => [],
            "calculate" => [
                "TOPUP" => [
                    "money" => 0,
                    "amount" => 0
                ],
                "TRANSACTION" => [
                    "money" => 0,
                    "amount" => 0
                ],
            ]
        ];

        $queryString = $req->all();

        if (empty($queryString['endDate'])) {
            $queryString['endDate'] = date("Y-m-d");
        }

        if (empty($queryString['startDate'])) {
            $current = Carbon::now();
            $lastMonth = $current->addMonth(-1);
            $queryString['startDate'] = date("Y-m-d", $lastMonth->getTimestamp());
        }

        $user_id = Auth::id();
        
        $balance = Balance::where('user_id', $user_id)->first();
        $data["balance"] = $balance->total;

        $calculate = Transaction::selectCalculateQuery($user_id, $queryString);
        $data["history"] = Transaction::selectHistoryQuery($user_id, $queryString);
        $data["paginate"]["total"] = Transaction::selectCountDataQuery($user_id, $queryString);


        foreach ($calculate as $value) {
            $data['calculate'][$value->type] = [
                "money" => $value->total_money,
                "amount" => $value->total_transaction
            ];
        }
        
        return Inertia::render($this->dir . '/History/index', [
            "direct" => [
                "insert" => route('transaction.insert'),
                "logout" => route('auth.logout.delete')
            ],
            "transactionType" => TransactionType::cases(),
            "data" => $data,
        ]);
    }

    public function InsertPage(){
        return Inertia::render($this->dir . '/Insert/index', [
            "direct" => [
                "history" => route('transaction.history')
            ],
            "api" => [
                "insert" => route('transaction.insert.post'),
            ],
            "transactionType" => TransactionType::cases()
        ]);
    }

    public function InserRequest(Request $req){
        $payload = $req->validate([
            'type' => ['required', 'string'],
            'amount' => ['required', 'numeric', 'min:20000'],
            'note' => ['nullable', 'string']
        ]);

        try {
            DB::beginTransaction();

            $user_id = Auth::id();
            $payload['user_id'] = $user_id;

            $b = $this->getBalance($user_id);

            $total = $b->calculateBalance($payload['type'], $payload['amount']);

            if ($total < 0) {
                return back()->withErrors([
                    "amount" => "insufficient balance",
                ]);
            }

            if (!$payload['note']) {
                unset($payload['note']);
            }

            $transaction = Transaction::create($payload);

            $b->balance->update([
                "total" => $total,
                "last_transaction_id" => $transaction->id
            ]);

            DB::commit();

            return to_route("transaction.history")->withInput([
                'success' => true
            ]);
        } catch (\Throwable $th) {
            DB::rollBack();
            return back()->withErrors([
                'success' => false,
                'message' => $th->getMessage()
            ]);
        }
    }

}
