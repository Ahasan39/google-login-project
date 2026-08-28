<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Laravel\Socialite\Facades\Socialite;
use Throwable;
use UnexpectedValueException;

class GoogleAuthController extends Controller
{
    public function redirect(): RedirectResponse
    {
        return Socialite::driver('google')->redirect();
    }

    public function callback(Request $request): RedirectResponse
    {
        try {
            $googleUser = Socialite::driver('google')->user();

            $googleId = $googleUser->getId();
            $name = $googleUser->getName();
            $email = $googleUser->getEmail();
            $avatar = $googleUser->getAvatar();

            if (! $googleId || ! $name || ! $email) {
                throw new UnexpectedValueException('Google did not return the required identity fields.');
            }

            $user = User::where('google_id', $googleId)->first();

            if (! $user) {
                $user = User::where('email', $email)->first();

                if ($user && $user->google_id && $user->google_id !== $googleId) {
                    throw new UnexpectedValueException('This email is already linked to another Google account.');
                }
            }

            if ($user) {
                $updates = ['google_id' => $googleId];

                if ($avatar) {
                    $updates['avatar'] = $avatar;
                }

                $user->forceFill($updates)->save();
            } else {
                $user = User::create([
                    'name' => $name,
                    'email' => $email,
                    'google_id' => $googleId,
                    'avatar' => $avatar,
                    'email_verified_at' => now(),
                ]);
            }

            Auth::login($user, true);
            $request->session()->regenerate();

            return redirect('/dashboard');
        } catch (Throwable $exception) {
            Log::warning('Google authentication failed.', [
                'exception_class' => $exception::class,
            ]);

            return redirect('/login')->with('error', 'Google sign-in failed. Please try again.');
        }
    }
}
