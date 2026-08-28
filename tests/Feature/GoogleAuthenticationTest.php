<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Laravel\Socialite\Contracts\Provider;
use Laravel\Socialite\Contracts\User as SocialiteUser;
use Laravel\Socialite\Facades\Socialite;
use Mockery;
use RuntimeException;
use Tests\TestCase;

class GoogleAuthenticationTest extends TestCase
{
    use RefreshDatabase;

    public function test_google_callback_creates_and_logs_in_a_new_user(): void
    {
        $this->mockGoogleUser();

        $this->get('/auth/google/callback')->assertRedirect('/dashboard');

        $user = User::where('email', 'google.student@example.com')->firstOrFail();

        $this->assertAuthenticatedAs($user);
        $this->assertSame('google-user-123', $user->google_id);
        $this->assertSame('https://example.com/avatar.jpg', $user->avatar);
        $this->assertNull($user->password);
        $this->assertNotNull($user->email_verified_at);
    }

    public function test_google_callback_links_an_existing_user_without_creating_a_duplicate(): void
    {
        $existingUser = User::factory()->create([
            'email' => 'google.student@example.com',
            'google_id' => null,
        ]);

        $this->mockGoogleUser();

        $this->get('/auth/google/callback')->assertRedirect('/dashboard');

        $existingUser->refresh();

        $this->assertAuthenticatedAs($existingUser);
        $this->assertSame('google-user-123', $existingUser->google_id);
        $this->assertSame('https://example.com/avatar.jpg', $existingUser->avatar);
        $this->assertDatabaseCount('users', 1);
    }

    public function test_google_callback_finds_an_existing_user_by_google_id_first(): void
    {
        $existingUser = User::factory()->create([
            'email' => 'original@example.com',
            'google_id' => 'google-user-123',
        ]);

        $this->mockGoogleUser();

        $this->get('/auth/google/callback')->assertRedirect('/dashboard');

        $this->assertAuthenticatedAs($existingUser);
        $this->assertDatabaseCount('users', 1);
        $this->assertDatabaseMissing('users', ['email' => 'google.student@example.com']);
    }

    public function test_google_callback_handles_oauth_failure_gracefully(): void
    {
        $provider = Mockery::mock(Provider::class);
        $provider->shouldReceive('user')->once()->andThrow(new RuntimeException('Provider failure'));

        Socialite::shouldReceive('driver')
            ->once()
            ->with('google')
            ->andReturn($provider);

        $this->get('/auth/google/callback')
            ->assertRedirect('/login')
            ->assertSessionHas('error', 'Google sign-in failed. Please try again.');

        $this->assertGuest();

        $this->get('/login')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Auth/Login')
                ->where('flash.error', 'Google sign-in failed. Please try again.'));
    }

    private function mockGoogleUser(): void
    {
        $googleUser = Mockery::mock(SocialiteUser::class);
        $googleUser->shouldReceive('getId')->once()->andReturn('google-user-123');
        $googleUser->shouldReceive('getName')->once()->andReturn('Google Student');
        $googleUser->shouldReceive('getEmail')->once()->andReturn('google.student@example.com');
        $googleUser->shouldReceive('getAvatar')->once()->andReturn('https://example.com/avatar.jpg');

        $provider = Mockery::mock(Provider::class);
        $provider->shouldReceive('user')->once()->andReturn($googleUser);

        Socialite::shouldReceive('driver')
            ->once()
            ->with('google')
            ->andReturn($provider);
    }
}
