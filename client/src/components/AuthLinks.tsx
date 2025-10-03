import React from 'react';
import { auth0 } from '@/lib/auth0';

export default async function AuthLinks() {
    const session = await auth0.getSession();

    return (
        <div>
            {!session?.user && (
                <a href="/auth/login" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Login
                </a>
            )}

            {session?.user && (
                <div className="flex items-center gap-4">
                    <span className="text-white">Welcome, {session.user.name}!</span>
                    {/* IMPORTANT: Use <a> tags, not Next.js <Link>  */}
                    <a href="/auth/logout" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                        Logout
                    </a>
                </div>
            )}
        </div>
    );
}