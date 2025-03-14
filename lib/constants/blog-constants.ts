import { getAllPosts } from "@/lib/mdx/mdx-utils";

// Catégorie par défaut
export const DEFAULT_CATEGORY = "Tous";

// Fonction pour obtenir toutes les catégories uniques des articles
export async function getBlogCategories(): Promise<string[]> {
  const posts = await getAllPosts();
  const categories = new Set<string>();

  // Ajouter la catégorie par défaut
  categories.add(DEFAULT_CATEGORY);

  // Ajouter toutes les catégories uniques des articles
  posts.forEach((post) => {
    if (post.meta.category) {
      categories.add(post.meta.category);
    }
  });

  // Convertir le Set en tableau et trier
  return Array.from(categories).sort((a, b) => {
    // Garder "Tous" en première position
    if (a === DEFAULT_CATEGORY) return -1;
    if (b === DEFAULT_CATEGORY) return 1;
    return a.localeCompare(b);
  });
}

// Catégories par défaut en cas d'erreur
export const DEFAULT_BLOG_CATEGORIES = [
  DEFAULT_CATEGORY,
  "Développement Web",
  "Tendances Tech",
  "Performance",
  "UI/UX",
  "Carrière",
];
