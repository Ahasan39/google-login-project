import { Head, Link, router, useForm, usePage } from '@inertiajs/react';

function FieldError({ message }) {
    return message ? <p className="mt-2 text-sm text-red-600">{message}</p> : null;
}

export default function Edit({ flash }) {
    const { user } = usePage().props.auth;
    const initials = user.name
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0].toUpperCase())
        .join('');

    const profileForm = useForm({ name: user.name });
    const passwordForm = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    function updateProfile(event) {
        event.preventDefault();
        profileForm.patch('/profile', { preserveScroll: true });
    }

    function updatePassword(event) {
        event.preventDefault();
        passwordForm.put('/profile/password', {
            preserveScroll: true,
            onSuccess: () => passwordForm.reset(),
        });
    }

    function logout() {
        router.post('/logout');
    }

    const inputClass = 'mt-2.5 block min-h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-[#14213d] shadow-sm outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-[#e53e67] focus:bg-white focus:ring-4 focus:ring-rose-100';

    return (
        <>
            <Head title="Profile Settings" />

            <main className="min-h-screen bg-slate-100 text-[#14213d]">
                <header className="border-b border-slate-200 bg-white/90">
                    <div className="mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-4 px-5 sm:px-8 lg:px-10">
                        <Link href="/" className="flex items-center gap-3 font-bold tracking-tight focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e53e67]">
                            <span className="flex size-9 items-center justify-center rounded-xl bg-[#e53e67] text-sm font-black text-white">G</span>
                            <span>Google Auth Demo</span>
                        </Link>
                        <div className="flex items-center gap-3">
                            <Link href="/dashboard" className="hidden min-h-11 items-center justify-center rounded-xl bg-slate-100 px-4 text-sm font-semibold transition hover:bg-slate-200 sm:inline-flex">Dashboard</Link>
                            <span className="hidden text-sm font-medium text-slate-600 md:inline">{user.name}</span>
                            <button type="button" onClick={logout} className="inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-300 bg-white px-4 text-sm font-semibold transition hover:border-slate-400 hover:bg-slate-50">Logout</button>
                        </div>
                    </div>
                </header>

                <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14 lg:px-10">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#e53e67]">Account settings</p>
                        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Profile Settings</h1>
                        <p className="mt-3 text-slate-600">Manage your account information and security.</p>
                    </div>

                    {flash?.success && (
                        <div role="status" className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
                            {flash.success}
                        </div>
                    )}

                    <div className="mt-8 grid gap-6 lg:grid-cols-[0.38fr_0.62fr]">
                        <aside className="self-start rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                            {user.avatar ? (
                                <img src={user.avatar} alt={`${user.name}'s avatar`} referrerPolicy="no-referrer" className="size-24 rounded-2xl object-cover ring-4 ring-slate-100" />
                            ) : (
                                <div className="flex size-24 items-center justify-center rounded-2xl bg-[#14213d] text-2xl font-bold text-white ring-4 ring-slate-100">{initials || 'U'}</div>
                            )}
                            <h2 className="mt-6 text-xl font-bold">{user.name}</h2>
                            <p className="mt-1 break-words text-sm text-slate-500">{user.email}</p>
                            <span className="mt-5 inline-flex rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700">Authenticated</span>

                            <div className="mt-7 space-y-3 border-t border-slate-200 pt-6 text-sm">
                                <div className="flex items-center justify-between gap-4">
                                    <span className="text-slate-500">Google account</span>
                                    <span className="font-semibold">{user.google_connected ? 'Connected' : 'Not connected'}</span>
                                </div>
                                <div className="flex items-center justify-between gap-4">
                                    <span className="text-slate-500">Password login</span>
                                    <span className="font-semibold">{user.has_password ? 'Enabled' : 'Not set'}</span>
                                </div>
                            </div>
                        </aside>

                        <div className="space-y-6">
                            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                                <h2 className="text-xl font-bold">Profile Information</h2>
                                <p className="mt-2 text-sm text-slate-500">Update your display name. Your email is read-only.</p>

                                <form onSubmit={updateProfile} className="mt-7 space-y-5">
                                    <div>
                                        <label htmlFor="name" className="text-sm font-semibold text-slate-700">Name</label>
                                        <input id="name" value={profileForm.data.name} onChange={(event) => profileForm.setData('name', event.target.value)} required className={inputClass} />
                                        <FieldError message={profileForm.errors.name} />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="text-sm font-semibold text-slate-700">Email</label>
                                        <input id="email" type="email" value={user.email} readOnly className={`${inputClass} cursor-not-allowed text-slate-500`} />
                                    </div>
                                    <button type="submit" disabled={profileForm.processing} className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#e53e67] px-6 text-sm font-bold text-white shadow-sm transition hover:bg-rose-600 disabled:cursor-not-allowed disabled:opacity-60">
                                        {profileForm.processing ? 'Saving...' : 'Save Changes'}
                                    </button>
                                </form>
                            </section>

                            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                                <h2 className="text-xl font-bold">Password & Security</h2>
                                <p className="mt-2 text-sm leading-6 text-slate-500">
                                    {user.has_password
                                        ? 'Enter your current password before choosing a new password.'
                                        : 'You currently sign in with Google. Set a password if you also want to sign in using email and password.'}
                                </p>

                                <form onSubmit={updatePassword} className="mt-7 space-y-5">
                                    {user.has_password && (
                                        <div>
                                            <label htmlFor="current_password" className="text-sm font-semibold text-slate-700">Current password</label>
                                            <input id="current_password" type="password" value={passwordForm.data.current_password} onChange={(event) => passwordForm.setData('current_password', event.target.value)} autoComplete="current-password" className={inputClass} />
                                            <FieldError message={passwordForm.errors.current_password} />
                                        </div>
                                    )}
                                    <div>
                                        <label htmlFor="password" className="text-sm font-semibold text-slate-700">New password</label>
                                        <input id="password" type="password" value={passwordForm.data.password} onChange={(event) => passwordForm.setData('password', event.target.value)} autoComplete="new-password" className={inputClass} />
                                        <FieldError message={passwordForm.errors.password} />
                                    </div>
                                    <div>
                                        <label htmlFor="password_confirmation" className="text-sm font-semibold text-slate-700">Confirm new password</label>
                                        <input id="password_confirmation" type="password" value={passwordForm.data.password_confirmation} onChange={(event) => passwordForm.setData('password_confirmation', event.target.value)} autoComplete="new-password" className={inputClass} />
                                    </div>
                                    <button type="submit" disabled={passwordForm.processing} className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#14213d] px-6 text-sm font-bold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60">
                                        {passwordForm.processing ? 'Saving...' : user.has_password ? 'Update Password' : 'Set Password'}
                                    </button>
                                </form>
                            </section>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
