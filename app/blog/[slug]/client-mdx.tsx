// blog/[slug]/client-mdx.tsx
'use client';

import React from 'react';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { useMDXComponents } from '@/lib/mdx/mdx-components';

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
                <MDXRemote {...source} components={components} />
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