import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import fs from "fs/promises";
import path from "path";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const session = await auth();

    if (!session?.user) {
      return new NextResponse("Non autorisé", { status: 401 });
    }

    const { slug } = params;
    const filePath = path.join(BLOG_DIR, `${slug}.mdx`);

    try {
      await fs.unlink(filePath);
      return new NextResponse(null, { status: 204 });
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === "ENOENT") {
        return new NextResponse("Article non trouvé", { status: 404 });
      }
      throw error;
    }
  } catch (error) {
    console.error("Erreur lors de la suppression de l'article:", error);
    return new NextResponse("Erreur serveur", { status: 500 });
  }
}
