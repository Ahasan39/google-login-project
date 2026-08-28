import { Head, Link, router, usePage } from '@inertiajs/react';

export default function Dashboard() {
    const { user } = usePage().props.auth;

    function logout() {
        router.post('/logout');
    }

    const cards = [
        ['Authentication', 'Active', 'Protected by Laravel session authentication.', 'text-emerald-600'],
        ['Account', user.email, 'The email connected to your Laravel account.', 'text-[#14213d]'],
        ['Login Methods', 'Email / Google', 'Both methods resolve to the same Laravel user session.', 'text-[#14213d]'],
    ];

    return (
        <>
            <Head title="Dashboard" />

            <main className="min-h-screen bg-slate-100 text-[#14213d]">
                <header className="border-b border-slate-200 bg-white/90">
                    <div className="mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-4 px-5 sm:px-8 lg:px-10">
                        <Link href="/" className="flex items-center gap-3 font-bold tracking-tight focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e53e67]">
                            <span className="flex size-9 items-center justify-center rounded-xl bg-[#e53e67] text-sm font-black text-white">G</span>
                            <span>Google Auth Demo</span>
                        </Link>
                        <div className="flex items-center gap-3 sm:gap-4">
                            <span className="hidden text-sm font-medium text-slate-600 sm:inline">{user.name}</span>
                            <Link href="/profile" className="hidden min-h-11 items-center justify-center rounded-xl bg-slate-100 px-4 text-sm font-semibold transition hover:bg-slate-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#14213d] md:inline-flex">
                                Profile Settings
                            </Link>
                            <button type="button" onClick={logout} className="inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-300 bg-white px-4 text-sm font-semibold transition hover:border-slate-400 hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#14213d]">
                                Logout
                            </button>
                        </div>
                    </div>
                </header>

                <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14 lg:px-10">
                    <section className="rounded-3xl bg-[#14213d] px-6 py-9 text-white shadow-[0_24px_60px_-32px_rgba(15,23,42,0.6)] sm:px-10 sm:py-11">
                        <span className="inline-flex rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-rose-200">Authenticated dashboard</span>
                        <h1 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl">Welcome back, {user.name}</h1>
                        <p className="mt-3 text-sm leading-6 text-slate-300 sm:text-base">You're signed in and your Laravel session is active.</p>
                    </section>

                    <section className="mt-6 grid gap-4 lg:grid-cols-3">
                        {cards.map(([title, value, description, valueClass]) => (
                            <article key={title} className="min-w-0 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                                <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">{title}</p>
                                <p className={`mt-4 break-words text-xl font-bold ${valueClass}`}>{value}</p>
                                <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
                            </article>
                        ))}
                    </section>

                    <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#e53e67]">Session Overview</p>
                                <h2 className="mt-2 text-xl font-bold">Your current authenticated session</h2>
                            </div>
                            <span className="inline-flex w-fit rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700">Authenticated</span>
                        </div>

                        <dl className="mt-7 grid gap-4 sm:grid-cols-2">
                            {[
                                ['User', user.name],
                                ['Email', user.email],
                                ['Status', 'Authenticated'],
                                ['Protected route', '/dashboard'],
                            ].map(([label, value]) => (
                                <div key={label} className="min-w-0 rounded-xl bg-slate-50 p-4">
                                    <dt className="text-xs font-semibold text-slate-500">{label}</dt>
                                    <dd className="mt-1 break-words text-sm font-bold">{value}</dd>
                                </div>
                            ))}
                        </dl>

                        <div className="mt-7 flex flex-wrap gap-3">
                            <Link href="/" className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[#14213d] px-5 text-sm font-semibold text-white transition hover:bg-slate-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#14213d]">
                                Back to Home
                            </Link>
                            <Link href="/profile" className="inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-300 bg-white px-5 text-sm font-semibold transition hover:border-slate-400 hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#14213d]">
                                Profile Settings
                            </Link>
                            <button type="button" onClick={logout} className="inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-300 bg-white px-5 text-sm font-semibold transition hover:border-slate-400 hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#14213d]">
                                Logout
                            </button>
                        </div>
                    </section>
                </div>
            </main>
        </>
    );
}
