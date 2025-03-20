import { NextResponse } from "next/server";
import { auth } from "@/auth";
import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { slugify } from "@/lib/utils";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export async function GET() {
  try {
    // Updated to use auth() instead of getServerSession
    const session = await auth();
    if (!session?.user) {
      return new NextResponse("Non autorisé", { status: 401 });
    }

    const files = await fs.readdir(BLOG_DIR);
    const posts = await Promise.all(
      files.map(async (file) => {
        const filePath = path.join(BLOG_DIR, file);
        const content = await fs.readFile(filePath, "utf-8");
        const { data } = matter(content);
        const slug = file.replace(/\.mdx$/, "");

        return {
          slug,
          ...data,
        };
      })
    );

    return NextResponse.json(posts);
  } catch (error) {
    console.error("Erreur lors de la récupération des articles:", error);
    return new NextResponse("Erreur serveur", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    // Updated to use auth() instead of getServerSession
    const session = await auth();
    if (!session?.user) {
      return new NextResponse("Non autorisé", { status: 401 });
    }

    const body = await req.json();
    const { title, excerpt, content, category, image } = body;

    if (!title || !excerpt || !content || !category || !image) {
      return new NextResponse("Données manquantes", { status: 400 });
    }

    const slug = slugify(title);
    const date = new Date().toISOString();
    const readTime = `${Math.ceil(content.split(" ").length / 200)} min`;

    const frontmatter = {
      title,
      excerpt,
      date,
      category,
      readTime,
      image,
    };

    const fileContent = `---
${Object.entries(frontmatter)
  .map(([key, value]) => `${key}: "${value}"`)
  .join("\n")}
---

${content}
`;

    const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
    await fs.writeFile(filePath, fileContent);

    return NextResponse.json({ slug });
  } catch (error) {
    console.error("Erreur lors de la création de l'article:", error);
    return new NextResponse("Erreur serveur", { status: 500 });
  }
}
