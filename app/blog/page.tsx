// blog/page.tsx
import { PageHeader } from "@/components/page-header";
import { getAllPosts } from "@/lib/mdx/mdx-utils";
import BlogList from "./blog-list";
import { formatDate } from "@/lib/utils/date-utils";

// Liste des catégories (à placer dans un fichier de configuration si elle évolue souvent)
export const categories = ["Tous", "Développement Web", "Tendances Tech", "Performance", "UI/UX", "Carrière"];

export default async function BlogPage() {
    // Récupérer tous les posts depuis les fichiers MDX
    const posts = await getAllPosts();

    // S'assurer que toutes les dates sont des chaînes formatées
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
                {/* Le composant client pour la recherche et l'affichage */}
                <BlogList initialPosts={formattedPosts} categories={categories} />
            </div>
        </div>
    );
}