<?php

namespace App\Http\Controllers;

use App\Models\Player;
use App\Events\UserMoved;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Broadcast;

class PlayerController extends Controller
{
    public function index() {
        return view('login');
    }

    public function register() {
        return view('register');
    }

   public function store(Request $request) {
        $formFields = $request->validate([
            'user' => ['required', Rule::unique('players', 'user')],
            'password' => ['required']
        ]);
        $formFields['password'] = bcrypt($formFields['password']);

        $user = Player::create($formFields);
        auth()->login($user);
        return redirect('/');
   }


   public function authenticate(Request $request){
        $formFields = $request->validate([
            'user' => ['required'],
            'password' => 'required'
        ]);

        if(auth()->attempt($formFields)) {
            $request->session()->regenerate();
            return redirect('/game');
        }

        return redirect('/')->withErrors(['user' => 'Invalid Credentials'])->onlyInput('user');
   }

   public function moveStickman(Request $request) {
        $user = Auth::user();
        $x = $request->x;
        $y = $request->y;
        
        broadcast(new UserMoved($user, $x, $y))->toOthers();
        return response()->json(['message' => 'se moveu com sucesso']);
   }
}
