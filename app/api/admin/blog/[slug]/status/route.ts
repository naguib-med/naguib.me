import { NextResponse } from "next/server";
import { auth } from "@/auth";
import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export async function PATCH(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const session = await auth();
    if (!session) {
      return new NextResponse("Non autorisé", { status: 401 });
    }

    const { status } = await request.json();
    const filePath = path.join(BLOG_DIR, `${params.slug}.mdx`);

    // Lire le contenu actuel du fichier
    const fileContent = await fs.readFile(filePath, "utf-8");
    const { data, content } = matter(fileContent);

    // Mettre à jour le statut
    const updatedData = {
      ...data,
      status,
      date: data.date || new Date().toISOString(),
    };

    // Créer le nouveau contenu avec le statut mis à jour
    const updatedContent = matter.stringify(content, updatedData);

    // Écrire le fichier mis à jour
    await fs.writeFile(filePath, updatedContent);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erreur lors du changement de statut:", error);
    return new NextResponse("Erreur serveur", { status: 500 });
  }
}
