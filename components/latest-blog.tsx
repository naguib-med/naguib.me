"use client";

import { useRef } from "react";
import { ArrowRight, Newspaper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/magnetic-button";
import { BlogCard } from "@/components/blog/blog-card";
import { useEffect, useState } from "react";
import { getAllPosts } from "@/lib/mdx/mdx-utils";
import { formatDate } from "@/lib/utils/date-utils";
import Link from "next/link";

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

export default function LatestBlog() {
  const ref = useRef(null);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const allPosts = await getAllPosts();
        const formattedPosts = allPosts.map(post => ({
          ...post,
          meta: {
            ...post.meta,
            date: formatDate(post.meta.date)
          }
        }));
        setPosts(formattedPosts.slice(0, 3));
      } catch (error) {
        console.error("Erreur lors du chargement des articles:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <section ref={ref} className="relative py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-2">
            <Newspaper className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-bold">Derniers Articles</h2>
          </div>
          <MagneticButton>
            <Button variant="ghost" asChild>
              <Link href="/blog" className="flex items-center gap-2">
                Voir tous les articles
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </MagneticButton>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <BlogCard
              key={post.slug}
              post={{
                slug: post.slug,
                title: post.meta.title,
                excerpt: post.meta.excerpt,
                image: post.meta.image,
                category: post.meta.category,
                date: post.meta.date,
                readTime: post.meta.readTime
              }}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}