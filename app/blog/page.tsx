// blog/page.tsx
import { PageHeader } from "@/components/page-header";
import { getAllPosts } from "@/lib/mdx/mdx-utils";
import BlogList from "./blog-list";
import { formatDate } from "@/lib/utils/date-utils";
import { DEFAULT_BLOG_CATEGORIES, getBlogCategories } from "@/lib/constants/blog-constants";

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

export default async function BlogPage() {
    const [posts, categories] = await Promise.all([
        getAllPosts(),
        getBlogCategories().catch(() => DEFAULT_BLOG_CATEGORIES)
    ]);

    const formattedPosts = posts.map((post: BlogPost) => ({
        ...post,
        meta: {
            ...post.meta,
            date: formatDate(post.meta.date)
        }
    }));

    return (
        <div className="flex min-h-screen flex-col">
            <PageHeader
                title="Blog"
                description="Réflexions, tutoriels et insights sur le développement web et la technologie."
                gradient="from-primary/80 via-primary to-primary/60"
            />

            <div className="container py-12 md:py-20 mx-auto">
                <BlogList initialPosts={formattedPosts} categories={categories} />
            </div>
        </div>
    );
}