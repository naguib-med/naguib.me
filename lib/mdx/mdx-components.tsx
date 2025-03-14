//lib/mdx/mdx-components.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image'
import { cn } from '@/lib/utils';
import type { MDXComponents } from 'mdx/types'

// Composants personnalisés pour MDX
export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        // Remplacer les liens par des composants Next/Link
        a: ({ href, children, ...props }) => {
            if (href.startsWith('/') || href.startsWith('#')) {
                return (
                    <Link href={href} {...props}>
                        {children}
                    </Link>
                );
            }

            // Liens externes avec sécurité
            return (
                <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    {...props}
                >
                    {children}
                </a>
            );
        },

        // Images optimisées
        img: ({ src, alt, width, height, ...props }) => {
            return (
                <div className="my-6 overflow-hidden rounded-lg">
                    <Image
                        src={src}
                        alt={alt || ''}
                        width={parseInt(width as string) || 800}
                        height={parseInt(height as string) || 450}
                        className="w-full object-cover"
                        {...props}
                        unoptimized={!src.startsWith('http') && !src.startsWith('/')}
                    />
                </div>
            );
        },

        // Styles personnalisés pour les titres
        h1: ({ children, ...props }) => (
            <h1
                className={cn("mt-8 mb-4 text-3xl font-bold tracking-tight")}
                {...props}
            >
                {children}
            </h1>
        ),

        h2: ({ children, ...props }) => (
            <h2
                className={cn("mt-8 mb-4 text-2xl font-semibold tracking-tight")}
                {...props}
            >
                {children}
            </h2>
        ),

        h3: ({ children, ...props }) => (
            <h3
                className={cn("mt-6 mb-3 text-xl font-semibold tracking-tight")}
                {...props}
            >
                {children}
            </h3>
        ),

        // Paragraphes avec marge
        p: ({ children, ...props }) => (
            <p
                className={cn("my-4 leading-7")}
                {...props}
            >
                {children}
            </p>
        ),

        // Code inline
        code: ({ children, ...props }) => (
            <code
                className={cn("relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm")}
                {...props}
            >
                {children}
            </code>
        ),

        // Blocs de code (pre reste non modifié, rehype-prism s'en occupe)
        pre: ({ children, ...props }) => (
            <pre
                className={cn("mb-4 mt-4 overflow-auto rounded-lg bg-slate-900 p-4")}
                {...props}
            >
                {children}
            </pre>
        ),

        // Listes à puces
        ul: ({ children, ...props }) => (
            <ul
                className={cn("my-4 ml-6 list-disc")}
                {...props}
            >
                {children}
            </ul>
        ),

        // Listes numérotées
        ol: ({ children, ...props }) => (
            <ol
                className={cn("my-4 ml-6 list-decimal")}
                {...props}
            >
                {children}
            </ol>
        ),

        // Éléments de liste
        li: ({ children, ...props }) => (
            <li
                className={cn("mt-2")}
                {...props}
            >
                {children}
            </li>
        ),

        // Citations
        blockquote: ({ children, ...props }) => (
            <blockquote
                className={cn("mt-6 border-l-2 border-primary pl-6 italic")}
                {...props}
            >
                {children}
            </blockquote>
        ),

        ...components
    };
}

