<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class ProfileTest extends TestCase
{
    use RefreshDatabase;

    public function test_guest_cannot_access_profile_routes(): void
    {
        $this->get('/profile')->assertRedirect('/login');
        $this->patch('/profile', ['name' => 'Updated'])->assertRedirect('/login');
        $this->put('/profile/password', [])->assertRedirect('/login');
    }

    public function test_authenticated_user_can_open_profile(): void
    {
        $user = User::factory()->create([
            'google_id' => 'google-123',
            'avatar' => 'https://example.com/avatar.jpg',
        ]);

        $this->actingAs($user)
            ->get('/profile')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Profile/Edit')
                ->where('auth.user.id', $user->id)
                ->where('auth.user.email', $user->email)
                ->where('auth.user.avatar', 'https://example.com/avatar.jpg')
                ->where('auth.user.has_password', true)
                ->where('auth.user.google_connected', true));
    }

    public function test_user_can_update_only_their_name(): void
    {
        $user = User::factory()->create([
            'email' => 'original@example.com',
            'google_id' => 'google-123',
            'avatar' => 'https://example.com/avatar.jpg',
        ]);

        $this->actingAs($user)
            ->patch('/profile', [
                'name' => 'Updated Name',
                'email' => 'changed@example.com',
                'google_id' => 'changed-google-id',
                'avatar' => 'https://malicious.example/avatar.jpg',
            ])
            ->assertRedirect()
            ->assertSessionHas('success', 'Profile updated successfully.');

        $user->refresh();

        $this->assertSame('Updated Name', $user->name);
        $this->assertSame('original@example.com', $user->email);
        $this->assertSame('google-123', $user->google_id);
        $this->assertSame('https://example.com/avatar.jpg', $user->avatar);

        $this->actingAs($user)
            ->get('/profile')
            ->assertInertia(fn (Assert $page) => $page
                ->component('Profile/Edit')
                ->where('auth.user.name', 'Updated Name')
                ->where('flash.success', 'Profile updated successfully.'));
    }

    public function test_invalid_name_is_rejected(): void
    {
        $user = User::factory()->create(['name' => 'Original Name']);

        $this->actingAs($user)
            ->patch('/profile', ['name' => ''])
            ->assertSessionHasErrors('name');

        $this->assertSame('Original Name', $user->fresh()->name);
    }

    public function test_google_only_user_can_set_first_password_without_current_password(): void
    {
        $user = User::factory()->create([
            'password' => null,
            'google_id' => 'google-123',
        ]);

        $this->actingAs($user)
            ->put('/profile/password', [
                'password' => 'new-secure-password',
                'password_confirmation' => 'new-secure-password',
            ])
            ->assertRedirect()
            ->assertSessionHas('success', 'Password created successfully.');

        $this->assertAuthenticatedAs($user);
        $this->assertTrue(Hash::check('new-secure-password', $user->fresh()->password));
    }

    public function test_user_with_password_must_provide_current_password(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user)
            ->put('/profile/password', [
                'password' => 'new-secure-password',
                'password_confirmation' => 'new-secure-password',
            ])
            ->assertSessionHasErrors('current_password');
    }

    public function test_wrong_current_password_is_rejected(): void
    {
        $user = User::factory()->create();
        $originalPassword = $user->password;

        $this->actingAs($user)
            ->put('/profile/password', [
                'current_password' => 'wrong-password',
                'password' => 'new-secure-password',
                'password_confirmation' => 'new-secure-password',
            ])
            ->assertSessionHasErrors('current_password');

        $this->assertSame($originalPassword, $user->fresh()->password);
    }

    public function test_correct_current_password_updates_and_hashes_new_password(): void
    {
        $user = User::factory()->create([
            'password' => Hash::make('current-password'),
        ]);

        $this->actingAs($user)
            ->put('/profile/password', [
                'current_password' => 'current-password',
                'password' => 'new-secure-password',
                'password_confirmation' => 'new-secure-password',
            ])
            ->assertRedirect()
            ->assertSessionHas('success', 'Password updated successfully.');

        $this->assertAuthenticatedAs($user);
        $updatedUser = $user->fresh();
        $this->assertTrue(Hash::check('new-secure-password', $updatedUser->password));
        $this->assertFalse(Hash::check('current-password', $updatedUser->password));
    }

    public function test_google_only_user_can_log_in_with_email_after_setting_password(): void
    {
        $user = User::factory()->create([
            'email' => 'google.user@example.com',
            'password' => null,
            'google_id' => 'google-123',
        ]);

        $this->actingAs($user)->put('/profile/password', [
            'password' => 'new-secure-password',
            'password_confirmation' => 'new-secure-password',
        ]);

        $this->post('/logout')->assertRedirect('/login');

        $this->post('/login', [
            'email' => 'google.user@example.com',
            'password' => 'new-secure-password',
            'remember' => false,
        ])->assertRedirect('/dashboard');

        $this->assertAuthenticatedAs($user);
    }
}
