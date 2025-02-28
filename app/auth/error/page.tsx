import { Suspense } from 'react';
import ErrorClient from './error-client';

export default function AuthErrorPage() {
    return (
        <Suspense fallback={<div>Chargement...</div>}>
            <ErrorClient />
        </Suspense>
    );
}