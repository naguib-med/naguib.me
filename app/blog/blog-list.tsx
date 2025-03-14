"use client"

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { formatDate } from "@/lib/utils/date-utils";

// Type pour un article de blog
interface BlogPost {
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

interface BlogListProps {
    initialPosts: BlogPost[];
    categories: string[];
}

export default function BlogList({ initialPosts, categories }: BlogListProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("Tous");

    const filteredPosts = initialPosts.filter(post => {
        const matchesSearch = post.meta.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.meta.excerpt.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesCategory = selectedCategory === "Tous" || post.meta.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-12 space-y-8"
            >
                {/* Search and filters */}
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Rechercher des articles..."
                        className="w-full rounded-lg border border-input bg-background py-2 pl-10 pr-4 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                {/* Categories */}
                <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                        <Button
                            key={category}
                            variant={selectedCategory === category ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSelectedCategory(category)}
                            className="rounded-full"
                        >
                            {category}
                        </Button>
                    ))}
                </div>
            </motion.div>

            {/* Blog posts */}
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                <AnimatePresence mode="popLayout">
                    {filteredPosts.map((post, index) => (
                        <motion.div
                            key={post.slug}
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
                                <div className="overflow-hidden rounded-xl">
                                    <div className="relative aspect-[16/9] overflow-hidden">
                                        <Image
                                            src={post.meta.image}
                                            alt={post.meta.title}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                                    </div>
                                    <div className="p-4">
                                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                                            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                                                {post.meta.category}
                                            </span>
                                            <div className="flex items-center gap-2">
                                                <span>{formatDate(post.meta.date)}</span>
                                                <span>•</span>
                                                <span>{post.meta.readTime}</span>
                                            </div>
                                        </div>
                                        <h3 className="mt-2 text-xl font-semibold group-hover:text-primary transition-colors">
                                            {post.meta.title}
                                        </h3>
                                        <p className="mt-2 text-muted-foreground line-clamp-2">
                                            {post.meta.excerpt}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {filteredPosts.length === 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-12 text-center"
                >
                    <p className="text-muted-foreground">
                        Aucun article ne correspond à votre recherche.
                    </p>
                    <motion.button
                        onClick={() => {
                            setSearchQuery("");
                            setSelectedCategory("Tous");
                        }}
                        className="mt-4 text-primary hover:underline"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Réinitialiser les filtres
                    </motion.button>
                </motion.div>
            )}
        </>
    );
}