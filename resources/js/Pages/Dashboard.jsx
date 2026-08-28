import { Head, router, usePage } from '@inertiajs/react';

export default function Dashboard() {
    const { user } = usePage().props.auth;

    function logout() {
        router.post('/logout');
    }

    return (
        <>
            <Head title="Dashboard" />

            <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
                <div className="w-full max-w-lg rounded-2xl bg-white p-8 text-center shadow-sm ring-1 ring-slate-200">
                    <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
                        Welcome, {user.name}
                    </h1>
                    <p className="mt-3 text-slate-600">You are logged in successfully.</p>
                    <button
                        type="button"
                        onClick={logout}
                        className="mt-8 rounded-lg bg-slate-900 px-5 py-2.5 font-medium text-white transition hover:bg-slate-700"
                    >
                        Logout
                    </button>
                </div>
            </main>
        </>
    );
}
