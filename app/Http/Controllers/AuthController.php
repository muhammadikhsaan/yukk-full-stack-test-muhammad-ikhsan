<?php

namespace App\Http\Controllers;

use App\Models\Balance;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class AuthController extends Controller
{
    private string $dir = 'Pages/Auth';

    public function index(){
        return to_route('auth.login');
    }

    public function LoginPage() {
        return Inertia::render($this->dir . '/Login/index', [
            "direct" => [
                "register" => route('auth.register')
            ],
            "api" => [
                "login" => route('auth.login.post')
            ]
        ]);
    }

    public function LoginRequest(Request $req) {
        $payload = $req->validate([
            'email'=>['required', 'email:rfc,dns'],
            'password'=>['required', 'min:8']
        ]);

        if (Auth::attempt($payload)) {
            $req->session()->regenerate();
            return to_route('transaction.history');
        }

        return back()->withErrors([
            'email' => 'Credentials do not match our records'
        ]);
    }

    public function RegisterPage() {
        return Inertia::render($this->dir . '/Register/index', [
            "direct" => [
                "login" => route('auth.login')
            ],
            "api" => [
                "register" => route('auth.register.post')
            ]
        ]);
    }

    public function RegisterRequest(Request $req){
        $payload = $req->validate([
            'name' => ['required', 'string'],
            'email'=>['required','unique:users,email', 'email:rfc,dns'],
            'password'=>['required', 'min:8']
        ]);

        try {
            DB::beginTransaction();
            $user = User::create($payload);

            Balance::create([
                "user_id" => $user->id,
                "total" => 0,
            ]);

            Auth::logout();

            DB::commit();
            return to_route('auth.login');
        } catch (\Throwable $th) {
            DB::rollBack();
            return back()->withErrors([
                'message' => $th->getMessage()
            ]);
        }
    }

    public function LogoutRequest(Request $req) {
        Auth::logout();
        return to_route('auth.login');
    }
}
