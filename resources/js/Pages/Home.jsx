import { Head, Link, usePage } from '@inertiajs/react';

const features = [
    ['01', 'Email & Password', 'Traditional Laravel session authentication.'],
    ['02', 'Google OAuth', 'Secure Google sign-in powered by Laravel Socialite.'],
    ['03', 'Unified Session', 'Both login methods use the same Laravel authenticated session.'],
];

export default function Home() {
    const { user } = usePage().props.auth;

    return (
        <>
            <Head title="Google Auth Demo" />

            <main className="min-h-screen bg-slate-100 text-[#14213d]">
                <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
                    <nav className="flex min-h-20 items-center justify-between border-b border-slate-200/80" aria-label="Primary navigation">
                        <Link href="/" className="flex items-center gap-3 font-bold tracking-tight focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e53e67]">
                            <span className="flex size-9 items-center justify-center rounded-xl bg-[#e53e67] text-sm font-black text-white shadow-sm">G</span>
                            <span>Google Auth Demo</span>
                        </Link>

                        <div className="flex items-center gap-3">
                            {user && <span className="hidden text-sm text-slate-500 sm:inline">Hi, {user.name}</span>}
                            <Link href={user ? '/dashboard' : '/login'} className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[#14213d] px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#14213d]">
                                {user ? 'Dashboard' : 'Sign In'}
                            </Link>
                        </div>
                    </nav>

                    <section className="grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16 lg:py-24">
                        <div>
                            <span className="inline-flex rounded-full border border-rose-200 bg-rose-50 px-3.5 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[#d92f5a]">
                                Laravel OAuth Learning Project
                            </span>
                            <h1 className="mt-7 max-w-3xl text-4xl font-semibold leading-[1.08] tracking-[-0.035em] text-[#14213d] sm:text-5xl lg:text-6xl">
                                Secure authentication with Laravel and Google
                            </h1>
                            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
                                A simple learning project demonstrating Laravel session authentication, React, Inertia.js, and Google OAuth with Socialite.
                            </p>

                            <div className="mt-9 flex flex-wrap gap-3">
                                <Link href={user ? '/dashboard' : '/login'} className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#e53e67] px-6 text-sm font-bold text-white shadow-[0_12px_24px_-12px_rgba(229,62,103,0.9)] transition hover:-translate-y-px hover:bg-rose-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e53e67]">
                                    {user ? 'Open Dashboard' : 'Sign In'}
                                </Link>
                                {user ? (
                                    <Link href="/dashboard" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-300 bg-white px-6 text-sm font-semibold text-[#14213d] transition hover:border-slate-400 hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#14213d]">
                                        View Dashboard
                                    </Link>
                                ) : (
                                    <a href="#flow" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-300 bg-white px-6 text-sm font-semibold text-[#14213d] transition hover:border-slate-400 hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#14213d]">
                                        Learn the Flow
                                    </a>
                                )}
                            </div>
                        </div>

                        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_24px_60px_-32px_rgba(15,23,42,0.35)] sm:p-8">
                            <div className="rounded-2xl bg-[#14213d] p-6 text-white sm:p-8">
                                <div className="flex items-center justify-between gap-4">
                                    <span className="text-sm font-semibold">Authentication status</span>
                                    <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-bold text-emerald-300">
                                        {user ? 'Authenticated' : 'Ready'}
                                    </span>
                                </div>
                                <div className="mt-12">
                                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">One Laravel session</p>
                                    <p className="mt-3 text-2xl font-semibold tracking-tight">Email or Google. One secure destination.</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-3 pt-4">
                                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                                    <p className="text-xs font-medium text-slate-500">Backend</p>
                                    <p className="mt-1 font-bold">Laravel 12</p>
                                </div>
                                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                                    <p className="text-xs font-medium text-slate-500">Frontend</p>
                                    <p className="mt-1 font-bold">React + Inertia</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section id="flow" className="pb-16 sm:pb-24">
                        <div className="grid gap-4 md:grid-cols-3">
                            {features.map(([number, title, description]) => (
                                <article key={title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                                    <span className="text-xs font-black tracking-[0.16em] text-[#e53e67]">{number}</span>
                                    <h2 className="mt-5 text-lg font-bold">{title}</h2>
                                    <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
                                </article>
                            ))}
                        </div>
                    </section>
                </div>
            </main>
        </>
    );
}
