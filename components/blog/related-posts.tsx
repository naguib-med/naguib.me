// components/blog/related-posts.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { formatDate } from "@/lib/utils/date-utils";

export interface BlogPost {
    slug: string;
    meta: {
        title: string;
        excerpt: string;
        image: string;
        category: string;
        date: string;
        readTime: string;
    }
}

interface RelatedPostsProps {
    posts: BlogPost[];
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
    if (!posts || posts.length === 0) {
        return null;
    }

    return (
        <div className="mt-12 pt-8 border-t">
            <h3 className="text-xl font-semibold mb-6">À lire également</h3>
            <div className="grid gap-6 md:grid-cols-3">
                {posts.map((post) => (
                    <Link
                        href={`/blog/${post.slug}`}
                        key={post.slug}
                        className="group block"
                    >
                        <div className="overflow-hidden rounded-lg">
                            <div className="relative aspect-[16/9] overflow-hidden">
                                <Image
                                    src={post.meta.image}
                                    alt={post.meta.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            </div>
                            <div className="pt-3">
                                <p className="text-sm text-muted-foreground">
                                    {post.meta.category} • {formatDate(post.meta.date)} • {post.meta.readTime}
                                </p>
                                <h4 className="mt-1 font-medium group-hover:text-primary transition-colors line-clamp-2">
                                    {post.meta.title}
                                </h4>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}