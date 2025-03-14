// components/blog/blog-header.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface BlogHeaderProps {
    meta: {
        title: string;
        excerpt?: string;
        image?: string;
        category: string;
        date: string;
        readTime: string;
    };
}

export function BlogHeader({ meta }: BlogHeaderProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
        >
            {meta.image && (
                <div className="relative aspect-[2/1] mb-6 overflow-hidden rounded-xl">
                    <Image
                        src={meta.image}
                        alt={meta.title}
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                </div>
            )}

            <div className="mb-2 flex items-center text-sm text-muted-foreground">
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    {meta.category}
                </span>
                <span className="mx-2">•</span>
                <time dateTime={meta.date}>{meta.date}</time>
                <span className="mx-2">•</span>
                <span>{meta.readTime}</span>
            </div>

            <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
                {meta.title}
            </h1>

            {meta.excerpt && (
                <p className="text-xl text-muted-foreground">
                    {meta.excerpt}
                </p>
            )}
        </motion.div>
    );
}