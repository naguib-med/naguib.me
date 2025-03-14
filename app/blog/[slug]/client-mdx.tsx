// blog/[slug]/client-mdx.tsx
'use client';

import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { useMDXComponents } from '@/lib/mdx/mdx-components';

// Import dynamique avec SSR désactivé pour packages ESM
const MDXRemoteComponent = dynamic(
    async () => {
        const { MDXRemote } = await import('next-mdx-remote');
        return { default: MDXRemote };
    },
    {
        ssr: false,
        loading: () => <div className="animate-pulse p-4 my-4 bg-gray-100 dark:bg-gray-800 rounded">Chargement du contenu...</div>
    }
);

interface ClientMDXProps {
    source: MDXRemoteSerializeResult;
}

export default function ClientMDX({ source }: ClientMDXProps) {
    const components = useMDXComponents({});

    if (!source || !source.compiledSource) {
        return (
            <div className="p-4 bg-red-100 dark:bg-red-900 rounded text-red-800 dark:text-red-200">
                <p>Erreur: Contenu MDX non disponible pour cet article</p>
            </div>
        );
    }

    try {
        return (
            <div className="prose prose-lg dark:prose-invert max-w-none">
                <Suspense fallback={<div className="animate-pulse p-4 my-4 bg-gray-100 dark:bg-gray-800 rounded">Chargement du contenu...</div>}>
                    <MDXRemoteComponent {...source} components={components} />
                </Suspense>
            </div>
        );
    } catch (error) {
        console.error("Erreur lors du rendu MDX:", error);
        return (
            <div className="p-4 bg-red-100 dark:bg-red-900 rounded">
                <p>Erreur lors du rendu de l&apos;article</p>
                <pre className="text-sm">{error instanceof Error ? error.message : String(error)}</pre>
            </div>
        );
    }
}