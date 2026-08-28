# Google Login Learning Project

A small full-stack authentication project built to learn Laravel's session authentication and Google OAuth without using an authentication starter kit.

The application supports email/password login, Google sign-in through Laravel Socialite, a protected dashboard, logout, and authenticated profile/password management.

## Tech stack

- Laravel 12.68
- PHP 8.2+
- React 19
- Inertia.js 3
- Tailwind CSS 4
- Vite 7
- MySQL
- Laravel Socialite 5

## Features

- Manual Laravel session-based email/password authentication
- Google OAuth redirect and callback flow
- Safe matching of Google users by Google ID and email
- Protected dashboard and profile routes
- Profile name updates with fresh Inertia shared props
- Password creation for Google-only accounts
- Password changes with current-password validation
- Responsive React and Tailwind interfaces
- Automated authentication, Google OAuth, and profile tests

No Breeze, Jetstream, Fortify, Sanctum, JWT, or frontend UI framework is used.

## Requirements

- PHP 8.2 or newer
- Composer
- Node.js and npm
- MySQL
- A Google Cloud OAuth 2.0 Web Client for Google sign-in

## Local installation

1. Clone the repository and enter the project directory:

   ```bash
   git clone https://github.com/Ahasan39/google-login-project.git
   cd google-login-project
   ```

2. Install PHP and JavaScript dependencies:

   ```bash
   composer install
   npm install
   ```

3. Create the environment file and application key:

   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

   On Windows PowerShell, use `Copy-Item .env.example .env` instead of `cp`.

4. Create a MySQL database named `google_login_project`, then configure `.env`:

   ```dotenv
   APP_URL=http://127.0.0.1:8000

   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=google_login_project
   DB_USERNAME=root
   DB_PASSWORD=
   ```

   Set `DB_PASSWORD` to your own local MySQL password. Do not commit credentials.

5. Run the migrations and development seeder:

   ```bash
   php artisan migrate --seed
   ```

6. Start Laravel and Vite in separate terminals:

   ```bash
   php artisan serve
   ```

   ```bash
   npm run dev
   ```

7. Open [http://127.0.0.1:8000](http://127.0.0.1:8000).

## Development login

Running the database seeder creates or updates this local learning account:

```text
Email: student@example.com
Password: password
```

Do not use these credentials in production.

## Google OAuth configuration

Create an OAuth 2.0 Web Client in Google Cloud and add this authorized redirect URI:

```text
http://127.0.0.1:8000/auth/google/callback
```

Then configure the following values only in your local `.env`:

```dotenv
GOOGLE_CLIENT_ID=your-client-id
GOOGLE_CLIENT_SECRET=your-client-secret
GOOGLE_REDIRECT_URI=http://127.0.0.1:8000/auth/google/callback
```

If the Google consent screen is in testing mode, add the Google account you intend to use as a test user. Never commit the client secret or other OAuth credentials.

## Build and test

Create a production frontend build:

```bash
npm run build
```

Run the Laravel test suite:

```bash
php artisan test
```

Google OAuth tests mock Socialite and do not contact Google or require real credentials.

## Main routes

| Method | Path | Purpose |
| --- | --- | --- |
| `GET` | `/` | Home page |
| `GET`, `POST` | `/login` | Login page and email/password authentication |
| `GET` | `/auth/google/redirect` | Begin Google OAuth |
| `GET` | `/auth/google/callback` | Complete Google OAuth |
| `GET` | `/dashboard` | Protected dashboard |
| `GET`, `PATCH` | `/profile` | View and update the authenticated profile |
| `PUT` | `/profile/password` | Create or update the authenticated user's password |
| `POST` | `/logout` | End the authenticated session |

## Security notes

- Google access and refresh tokens are not stored.
- Google-only users have a nullable password until they intentionally create one.
- Sessions are regenerated after successful authentication and password changes.
- OAuth failures show a generic user-facing message and do not expose secrets.
- The `.env` file is ignored by Git; `.env.example` contains placeholders only.

## License

This learning project is open-sourced under the [MIT License](https://opensource.org/licenses/MIT).
