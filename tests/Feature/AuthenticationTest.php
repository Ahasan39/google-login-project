<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class AuthenticationTest extends TestCase
{
    use RefreshDatabase;

    public function test_guest_can_view_login_page(): void
    {
        $this->get('/login')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page->component('Auth/Login'));
    }

    public function test_guest_is_redirected_from_dashboard_to_login(): void
    {
        $this->get('/dashboard')->assertRedirect('/login');
    }

    public function test_invalid_credentials_return_a_generic_authentication_error(): void
    {
        $this->post('/login', [
            'email' => 'student@example.com',
            'password' => 'incorrect-password',
            'remember' => false,
        ])->assertSessionHasErrors('email');

        $this->assertGuest();
    }

    public function test_user_can_login_and_view_the_dashboard(): void
    {
        $user = User::factory()->create([
            'name' => 'Student',
            'email' => 'student@example.com',
            'password' => Hash::make('password'),
        ]);

        $this->post('/login', [
            'email' => 'student@example.com',
            'password' => 'password',
            'remember' => true,
        ])->assertRedirect('/dashboard');

        $this->assertAuthenticatedAs($user);

        $this->get('/dashboard')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Dashboard')
                ->where('auth.user.name', 'Student'));
    }

    public function test_user_can_logout_and_can_no_longer_view_dashboard(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user)
            ->post('/logout')
            ->assertRedirect('/login');

        $this->assertGuest();
        $this->get('/dashboard')->assertRedirect('/login');
    }
}
