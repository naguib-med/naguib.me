"use client"

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface BlogPost {
    title: string;
    excerpt: string;
    image: string;
    category: string;
    date: string;
    slug: string;
    readTime: string;
}

interface BlogCardProps {
    post: BlogPost;
    index: number;
}

export function BlogCard({ post, index }: BlogCardProps) {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{
                duration: 0.3,
                delay: index * 0.1,
            }}
        >
            <Link href={`/blog/${post.slug}`} className="group block">
                <div className="overflow-hidden rounded-xl bg-card border border-border/50 hover:border-border transition-colors">
                    <div className="relative aspect-[16/9] overflow-hidden">
                        <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    </div>
                    <div className="p-4">
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                                {post.category}
                            </span>
                            <div className="flex items-center gap-2">
                                <span>{post.date}</span>
                                <span>•</span>
                                <span>{post.readTime}</span>
                            </div>
                        </div>
                        <h3 className="mt-2 text-xl font-semibold group-hover:text-primary transition-colors">
                            {post.title}
                        </h3>
                        <p className="mt-2 text-muted-foreground line-clamp-2">
                            {post.excerpt}
                        </p>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}