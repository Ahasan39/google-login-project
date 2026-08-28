import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    function submit(event) {
        event.preventDefault();
        post('/login');
    }

    function keepPlaceholderInactive(event) {
        event.preventDefault();
    }

    return (
        <>
            <Head title="Sign In" />

            <main className="min-h-screen bg-slate-100 px-4 py-7 text-[#14213d] sm:px-6 sm:py-10 lg:px-8">
                <div className="mx-auto w-full max-w-[1180px]">
                    <Link
                        href="/"
                        className="mb-5 inline-flex min-h-11 items-center text-sm font-semibold text-slate-600 transition hover:text-[#e53e67] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e53e67]"
                    >
                        <span aria-hidden="true" className="mr-2 text-lg">←</span>
                        Back to Home
                    </Link>

                    <section className="grid min-h-[700px] overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_24px_70px_-28px_rgba(15,23,42,0.35)] lg:grid-cols-12">
                        <div className="relative hidden overflow-hidden bg-gradient-to-br from-blue-950 via-slate-900 to-rose-950 lg:col-span-7 lg:flex">
                            <div
                                className="absolute inset-0 bg-cover bg-center"
                                style={{ backgroundImage: "url('/images/auth/study-abroad.jpg')" }}
                                aria-hidden="true"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/55 to-blue-950/20" />
                            <div className="absolute -right-24 -top-24 size-80 rounded-full bg-blue-400/20 blur-3xl" />

                            <div className="relative mt-auto max-w-2xl p-10 text-white xl:p-14">
                                <p className="text-xs font-bold uppercase tracking-[0.24em] text-rose-300">
                                    Study abroad, simplified
                                </p>
                                <h1 className="mt-5 text-4xl font-semibold leading-tight tracking-tight xl:text-5xl">
                                    Your study abroad journey, all in one place.
                                </h1>
                                <p className="mt-5 max-w-xl text-base leading-7 text-slate-200">
                                    Manage your applications, counselling and study plans securely.
                                </p>

                                <div className="mt-8 flex flex-wrap gap-2.5">
                                    {[
                                        'Secure account access',
                                        'Your application journey',
                                        'Guidance when you need it',
                                    ].map((benefit) => (
                                        <span
                                            key={benefit}
                                            className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-medium text-white backdrop-blur-sm"
                                        >
                                            {benefit}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center lg:col-span-5">
                            <div className="w-full p-6 sm:p-10 lg:p-12 xl:p-14">
                                <div className="mb-10 flex items-center gap-3">
                                    <span className="flex size-10 items-center justify-center rounded-xl bg-[#e53e67] text-lg font-bold text-white shadow-sm">G</span>
                                    <span className="text-sm font-bold tracking-wide text-[#14213d]">Google Auth Demo</span>
                                </div>

                                <div className="mb-8">
                                    <h2 className="text-3xl font-semibold tracking-tight text-[#14213d]">Welcome back</h2>
                                    <p className="mt-2 text-sm leading-6 text-slate-500">Sign in to continue your journey.</p>
                                </div>

                                <form onSubmit={submit} className="space-y-5">
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-semibold text-slate-700">Email</label>
                                        <input
                                            id="email"
                                            type="email"
                                            value={data.email}
                                            onChange={(event) => setData('email', event.target.value)}
                                            autoComplete="email"
                                            autoFocus
                                            required
                                            aria-invalid={errors.email ? 'true' : 'false'}
                                            aria-describedby={errors.email ? 'email-error' : undefined}
                                            placeholder="you@example.com"
                                            className="mt-2 block min-h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-[#14213d] outline-none transition placeholder:text-slate-400 focus:border-[#e53e67] focus:bg-white focus:ring-4 focus:ring-rose-100"
                                        />
                                        {errors.email && <p id="email-error" className="mt-2 text-sm text-red-600">{errors.email}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="password" className="block text-sm font-semibold text-slate-700">Password</label>
                                        <div className="relative mt-2">
                                            <input
                                                id="password"
                                                type={showPassword ? 'text' : 'password'}
                                                value={data.password}
                                                onChange={(event) => setData('password', event.target.value)}
                                                autoComplete="current-password"
                                                required
                                                aria-invalid={errors.password ? 'true' : 'false'}
                                                aria-describedby={errors.password ? 'password-error' : undefined}
                                                placeholder="Enter your password"
                                                className="block min-h-12 w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-4 pr-16 text-sm text-[#14213d] outline-none transition placeholder:text-slate-400 focus:border-[#e53e67] focus:bg-white focus:ring-4 focus:ring-rose-100"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword((visible) => !visible)}
                                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                                                aria-pressed={showPassword}
                                                className="absolute inset-y-0 right-0 flex min-w-14 items-center justify-center rounded-r-xl px-3 text-xs font-bold text-slate-500 transition hover:text-[#e53e67] focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-[#e53e67]"
                                            >
                                                {showPassword ? 'Hide' : 'Show'}
                                            </button>
                                        </div>
                                        {errors.password && <p id="password-error" className="mt-2 text-sm text-red-600">{errors.password}</p>}
                                    </div>

                                    <div className="flex flex-wrap items-center justify-between gap-3">
                                        <label className="flex min-h-11 cursor-pointer items-center gap-2.5 text-sm text-slate-600">
                                            <input
                                                type="checkbox"
                                                checked={data.remember}
                                                onChange={(event) => setData('remember', event.target.checked)}
                                                className="size-4 rounded border-slate-300 accent-[#e53e67] focus:ring-[#e53e67]"
                                            />
                                            Remember me
                                        </label>
                                        <button
                                            type="button"
                                            onClick={keepPlaceholderInactive}
                                            className="min-h-11 text-sm font-semibold text-[#e53e67] transition hover:text-rose-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e53e67]"
                                        >
                                            Forgot password?
                                        </button>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="min-h-12 w-full rounded-xl bg-[#e53e67] px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-rose-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e53e67] disabled:cursor-not-allowed disabled:opacity-60"
                                    >
                                        {processing ? 'Signing in...' : 'Sign In'}
                                    </button>
                                </form>

                                <div className="my-7 flex items-center gap-4" aria-hidden="true">
                                    <span className="h-px flex-1 bg-slate-200" />
                                    <span className="text-xs font-bold tracking-widest text-slate-400">OR</span>
                                    <span className="h-px flex-1 bg-slate-200" />
                                </div>

                                <a
                                    href="/auth/google/redirect"
                                    aria-label="Continue with Google (coming soon)"
                                    className="flex min-h-12 w-full items-center justify-center gap-3 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-[#14213d] shadow-sm transition hover:border-slate-400 hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                                >
                                    <span
                                        aria-hidden="true"
                                        className="bg-[conic-gradient(from_-45deg,#4285f4_0_25%,#34a853_25%_45%,#fbbc05_45%_65%,#ea4335_65%_85%,#4285f4_85%)] bg-clip-text text-lg font-black text-transparent"
                                    >
                                        G
                                    </span>
                                    Continue with Google
                                </a>

                                <p className="mt-8 text-center text-xs leading-5 text-slate-500">
                                    Need help accessing your account?{' '}
                                    <span className="font-semibold text-slate-700">Contact support</span>
                                </p>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </>
    );
}
