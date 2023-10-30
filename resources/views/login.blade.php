<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Login</title>
</head>
<body>
    <header>
        <h1>Login</h1>
    </header>
    <form method="POST" action="/login">
        @csrf
        <div>
            <label for="user">Username</label>
            <input type="text" name="user"/>
            @error('user')
            <p class="text-red-500 text-xs mt-1">{{$message}}</p>
            @enderror
        </div>
        <div>
            <label for="password">Password</label>
            <input type="text" name="password"/>
            @error('password')
            <p class="text-red-500 text-xs mt-1">{{$message}}</p>
            @enderror
        </div>
        <button
        type="submit"> Login</button>
    </form>
    @if(session()->has('message'))
    <p class="text-red-500 text-xs mt-1">{{$message}}</p>
    @endif
</body>
</html>