<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;

class PasswordController extends Controller
{
    public function update(Request $request): RedirectResponse
    {
        $user = $request->user();
        $hasPassword = ! is_null($user->password);

        $rules = [
            'password' => ['required', 'confirmed', Password::min(8)],
        ];

        if ($hasPassword) {
            $rules['current_password'] = ['required', 'current_password'];
            $rules['password'][] = 'different:current_password';
        }

        $validated = $request->validate($rules);

        $user->forceFill([
            'password' => Hash::make($validated['password']),
        ])->save();

        $request->session()->regenerate();

        $message = $hasPassword
            ? 'Password updated successfully.'
            : 'Password created successfully.';

        return back()->with('success', $message);
    }
}
