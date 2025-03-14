// blog/page.tsx
import { PageHeader } from "@/components/page-header";
import { getAllPosts } from "@/lib/mdx/mdx-utils";
import BlogList from "./blog-list";
import { formatDate } from "@/lib/utils/date-utils";
import { BLOG_CATEGORIES } from "@/lib/constants/blog-constants";

export default async function BlogPage() {
    const posts = await getAllPosts();

    const formattedPosts = posts.map(post => ({
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
                gradient="from-blue-600 via-blue-400 to-blue-500"
            />

            <div className="container py-12 md:py-20 mx-auto">
                <BlogList initialPosts={formattedPosts} categories={BLOG_CATEGORIES} />
            </div>
        </div>
    );
}