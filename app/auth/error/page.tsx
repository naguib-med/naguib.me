'use client'

import { useSearchParams } from 'next/navigation'

export default function AuthError() {
    const searchParams = useSearchParams()
    const error = searchParams.get('error')

    return (
        <div className="flex h-screen items-center justify-center">
            <div className="rounded-lg bg-red-50 p-8 text-center">
                <h1 className="mb-4 text-2xl font-bold text-red-600">Authentication Error</h1>
                <p className="text-red-500">
                    {error || 'An error occurred during authentication'}
                </p>
            </div>
        </div>
    )
}