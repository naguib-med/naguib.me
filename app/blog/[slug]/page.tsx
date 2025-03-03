// blog/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { PageHeader } from '@/components/page-header';
import { BlogHeader } from '@/components/blog/blog-header';
import { TableOfContents } from '@/components/blog/table-of-contents';
import { getPostBySlug, getAllPostSlugs, getRelatedPosts } from '@/lib/mdx/mdx-utils';
import ClientBlogContent from './client-blog-content';
import ClientMDX from './client-mdx';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { formatDate } from '@/lib/utils/date-utils';
import type { Metadata } from 'next';

// Définir le type pour les paramètres de page
type PageParams = {
    params: { slug: string };
};

// Cette fonction est utilisée pour la génération statique des pages à la construction (build)
export async function generateStaticParams() {
    try {
        return await getAllPostSlugs();
    } catch (error) {
        console.error("Erreur lors de la génération des paramètres statiques:", error);
        return [];
    }
}

// Cette fonction génère des métadonnées pour chaque page
export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
    const { slug } = params;

    try {
        const post = await getPostBySlug(slug);

        if (!post) {
            return {
                title: 'Article non trouvé',
                description: 'Désolé, cet article n\'existe pas.'
            };
        }

        return {
            title: post.meta.title,
            description: post.meta.excerpt || post.meta.title,
            openGraph: {
                title: post.meta.title,
                description: post.meta.excerpt || post.meta.title,
                type: 'article',
                url: `/blog/${slug}`,
                images: post.meta.image ? [{ url: post.meta.image }] : []
            }
        };
    } catch (error) {
        console.error("Erreur lors de la génération des métadonnées:", error);
        return {
            title: 'Blog',
            description: 'Articles sur le développement web'
        };
    }
}

// Page principale
export default async function BlogPostPage({ params }: PageParams) {
    const { slug } = params;

    try {
        console.log("Tentative de chargement du post avec slug:", slug);
        const postData = await getPostBySlug(slug);

        if (!postData) {
            console.error("Aucun post trouvé pour le slug:", slug);
            notFound();
        }

        // Formater la date une seule fois
        const formattedDate = formatDate(postData.meta.date);

        // Utiliser une restructuration plus propre
        const formattedPostData = {
            ...postData,
            meta: {
                ...postData.meta,
                date: formattedDate
            }
        };

        // Obtenir les articles connexes
        const relatedPosts = await getRelatedPosts(slug, postData.meta.category);
        const formattedRelatedPosts = relatedPosts.map(post => ({
            ...post,
            meta: {
                ...post.meta,
                date: formatDate(post.meta.date)
            }
        }));

        return (
            <div className="flex min-h-screen flex-col">
                <PageHeader
                    title={formattedPostData.meta.title}
                    description={`${formattedPostData.meta.category} • ${formattedPostData.meta.date} • ${formattedPostData.meta.readTime}`}
                    gradient="from-blue-600 via-blue-400 to-blue-500"
                />

                <div className="container py-12 md:py-20 mx-auto">
                    <Link
                        href="/blog"
                        className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Retour aux articles
                    </Link>

                    <div className="max-w-3xl mx-auto">
                        <BlogHeader meta={formattedPostData.meta} />

                        <TableOfContents />

                        <ClientMDX source={formattedPostData.source} />

                        <ClientBlogContent
                            title={formattedPostData.meta.title}
                            relatedPosts={formattedRelatedPosts}
                        />
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error("Erreur lors du chargement de l'article:", error);

        // Amélioration de la page d'erreur
        return (
            <div className="flex min-h-screen flex-col items-center justify-center p-4">
                <h1 className="text-2xl font-bold text-red-500">Erreur lors du chargement</h1>
                <p className="mt-2 text-muted-foreground">
                    Une erreur s&apos;est produite lors du chargement de l&apos;article.
                </p>
                <pre className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded overflow-auto max-w-lg text-sm">
                    {error instanceof Error ? error.message : String(error)}
                </pre>
                <Link
                    href="/blog"
                    className="mt-6 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Retour au blog
                </Link>
            </div>
        );
    }
}