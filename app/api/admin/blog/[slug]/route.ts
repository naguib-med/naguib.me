import { NextResponse } from "next/server";
import { auth } from "@/auth";
import fs from "fs/promises";
import path from "path";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export async function DELETE(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const { slug } = params;
    const filePath = path.join(BLOG_DIR, `${slug}.mdx`);

    try {
      await fs.unlink(filePath);
      return new NextResponse(null, { status: 204 });
    } catch (error) {
      // Vérification de l'erreur ENOENT (fichier non trouvé)
      if (
        error instanceof Error &&
        "code" in error &&
        error.code === "ENOENT"
      ) {
        return NextResponse.json(
          { error: "Article non trouvé" },
          { status: 404 }
        );
      }
      throw error;
    }
  } catch (error) {
    console.error("Erreur lors de la suppression de l'article:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
