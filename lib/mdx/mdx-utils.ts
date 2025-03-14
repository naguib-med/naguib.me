// lib/mdx/mdx-utils.ts
"use server";

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import rehypePrism from "rehype-prism-plus";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

// Définir le répertoire où sont stockés les articles MDX
const POSTS_DIRECTORY = path.join(process.cwd(), "content/blog");

// Récupérer tous les slugs de posts pour la génération statique
export async function getAllPostSlugs() {
  try {
    const fileNames = fs.readdirSync(POSTS_DIRECTORY);

    return fileNames
      .filter((fileName) => {
        // Ne prendre que les fichiers .mdx
        return fileName.endsWith(".mdx") || fileName.endsWith(".md");
      })
      .map((fileName) => {
        return {
          slug: fileName.replace(/\.mdx?$/, ""),
        };
      });
  } catch (error) {
    console.error("Erreur lors de la récupération des slugs:", error);
    return [];
  }
}

// Récupérer tous les posts avec leurs métadonnées (utile pour la page principale du blog)
export async function getAllPosts() {
  try {
    const fileNames = fs.readdirSync(POSTS_DIRECTORY);
    const allPostsData = await Promise.all(
      fileNames
        .filter(
          (fileName) => fileName.endsWith(".mdx") || fileName.endsWith(".md")
        )
        .map(async (fileName) => {
          const slug = fileName.replace(/\.mdx?$/, "");
          const fullPath = path.join(POSTS_DIRECTORY, fileName);
          const fileContents = fs.readFileSync(fullPath, "utf8");

          // Utiliser gray-matter pour parser le frontmatter
          const { data } = matter(fileContents);

          return {
            slug,
            meta: {
              ...data,
              title: data.title || slug,
              date: data.date || new Date().toISOString().split("T")[0],
              category: data.category || "Non classé",
              readTime: data.readTime || "5 min",
              // S'assurer que tous les champs nécessaires sont présents
              excerpt: data.excerpt || "",
              image: data.image || "",
            },
          };
        })
    );

    // Trier les posts par date (du plus récent au plus ancien)
    return allPostsData.sort((a, b) => {
      if (a.meta.date < b.meta.date) {
        return 1;
      } else {
        return -1;
      }
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des posts:", error);
    return [];
  }
}

// Récupérer un post spécifique par son slug
export async function getPostBySlug(slug: string) {
  try {
    // Chercher le fichier correspondant au slug (essayer .mdx puis .md)
    let fileName = `${slug}.mdx`;
    let fullPath = path.join(POSTS_DIRECTORY, fileName);

    if (!fs.existsSync(fullPath)) {
      fileName = `${slug}.md`;
      fullPath = path.join(POSTS_DIRECTORY, fileName);

      if (!fs.existsSync(fullPath)) {
        console.error(`Aucun fichier trouvé pour le slug: ${slug}`);
        return null;
      }
    }

    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Utiliser gray-matter pour parser le frontmatter
    const { data, content } = matter(fileContents);

    // Sérialiser le contenu MDX
    const mdxSource = await serialize(content, {
      mdxOptions: {
        rehypePlugins: [
          rehypePrism,
          rehypeSlug,
          [rehypeAutolinkHeadings, { behavior: "wrap" }],
        ],
      },
    });

    return {
      source: mdxSource,
      meta: {
        ...data,
        title: data.title || slug,
        // S'assurer que la date est une chaîne formatée, pas un objet Date
        date: data.date
          ? formatDateForDisplay(data.date)
          : formatDateForDisplay(new Date()),
        category: data.category || "Non classé",
        readTime: data.readTime || "5 min",
        excerpt: data.excerpt || "",
        image: data.image || "",
      },
    };
  } catch (error) {
    console.error(`Erreur lors de la récupération du post ${slug}:`, error);
    throw error; // Propager l'erreur pour pouvoir l'afficher
  }
}

// Récupérer des posts connexes basés sur la catégorie
export async function getRelatedPosts(currentSlug: string, category: string) {
  try {
    const allPosts = await getAllPosts();

    // Filtrer les posts de la même catégorie, en excluant le post actuel
    return allPosts
      .filter(
        (post) => post.slug !== currentSlug && post.meta.category === category
      )
      .slice(0, 3); // Limiter à 3 posts connexes
  } catch (error) {
    console.error("Erreur lors de la récupération des posts connexes:", error);
    return [];
  }
}
function formatDateForDisplay(dateValue: Date | string): string {
  if (typeof dateValue === "string") {
    // Si c'est déjà une chaîne formatée, la retourner
    return dateValue;
  }

  let date;
  try {
    // Convertir en objet Date si ce n'est pas déjà le cas
    date = dateValue instanceof Date ? dateValue : new Date(dateValue);

    // Formater la date pour l'affichage
    return date.toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch (error) {
    console.error("Erreur lors du formatage de la date:", error);
    return String(dateValue); // Conversion de dernier recours
  }
}
