<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class Player extends Authenticatable
{
    use HasFactory;
    protected $table = 'players';

    protected $fillable = [
        'user', 
        'password'
    ];
}
