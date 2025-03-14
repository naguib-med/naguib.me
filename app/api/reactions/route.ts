// app/api/reactions/route.ts
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const AVAILABLE_EMOJIS = ["👍", "🎉", "🧠", "💡"];

// Définir une interface pour les réactions utilisateur
interface UserReaction {
  userId: string;
  articleId: string;
  emoji: string;
}

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const articleId = url.searchParams.get("articleId");
  const userId = url.searchParams.get("userId");

  if (!articleId) {
    return NextResponse.json(
      { error: "Article ID is required" },
      { status: 400 }
    );
  }

  try {
    // Récupérer toutes les réactions pour cet article
    const reactions = await Promise.all(
      AVAILABLE_EMOJIS.map(async (emoji) => {
        const reaction = await prisma.reaction.findUnique({
          where: {
            emoji_articleId: {
              emoji,
              articleId,
            },
          },
        });

        return {
          emoji,
          count: reaction?.count || 0,
        };
      })
    );

    // Formater les réactions pour le client
    const formattedReactions = reactions.reduce((acc, { emoji, count }) => {
      acc[emoji] = { count };
      return acc;
    }, {} as Record<string, { count: number }>);

    // Si un userId est fourni, récupérer ses votes
    let userVotes = {};
    if (userId) {
      const userReactions = await prisma.userReaction.findMany({
        where: {
          userId,
          articleId,
        },
      });

      userVotes = userReactions.reduce(
        (acc: Record<string, boolean>, reaction: UserReaction) => {
          acc[reaction.emoji] = true;
          return acc;
        },
        {} as Record<string, boolean>
      );
    }

    return NextResponse.json({ reactions: formattedReactions, userVotes });
  } catch (error) {
    console.error("Error fetching reactions:", error);
    return NextResponse.json(
      { error: "Failed to fetch reactions" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const url = new URL(request.url);
  const articleId = url.searchParams.get("articleId");
  const userId = url.searchParams.get("userId");
  const body = await request.json();
  const { emoji, action } = body; // action: 'add' ou 'remove'

  if (!articleId || !emoji || !action || !userId) {
    return NextResponse.json(
      { error: "Missing required parameters" },
      { status: 400 }
    );
  }

  if (!AVAILABLE_EMOJIS.includes(emoji)) {
    return NextResponse.json({ error: "Invalid emoji" }, { status: 400 });
  }

  try {
    // Utiliser une transaction pour garantir la cohérence des données
    const result = await prisma.$transaction(async (tx) => {
      // Récupérer ou créer l'entrée de réaction
      let reaction = await tx.reaction.findUnique({
        where: {
          emoji_articleId: {
            emoji,
            articleId,
          },
        },
      });

      if (!reaction) {
        reaction = await tx.reaction.create({
          data: {
            emoji,
            articleId,
            count: 0,
          },
        });
      }

      // Vérifier si l'utilisateur a déjà voté pour cette réaction
      const existingUserReaction = await tx.userReaction.findUnique({
        where: {
          userId_articleId_emoji: {
            userId,
            articleId,
            emoji,
          },
        },
      });

      // Ajouter ou supprimer le vote
      if (action === "add" && !existingUserReaction) {
        // Créer une entrée UserReaction
        await tx.userReaction.create({
          data: {
            userId,
            articleId,
            emoji,
          },
        });

        // Incrémenter le compteur
        await tx.reaction.update({
          where: {
            emoji_articleId: {
              emoji,
              articleId,
            },
          },
          data: {
            count: reaction.count + 1,
          },
        });
      } else if (action === "remove" && existingUserReaction) {
        // Supprimer l'entrée UserReaction
        await tx.userReaction.delete({
          where: {
            userId_articleId_emoji: {
              userId,
              articleId,
              emoji,
            },
          },
        });

        // Décrémenter le compteur (mais pas en dessous de 0)
        await tx.reaction.update({
          where: {
            emoji_articleId: {
              emoji,
              articleId,
            },
          },
          data: {
            count: Math.max(0, reaction.count - 1),
          },
        });
      }

      // Récupérer toutes les réactions mises à jour
      const updatedReactions = await Promise.all(
        AVAILABLE_EMOJIS.map(async (e) => {
          const r = await tx.reaction.findUnique({
            where: {
              emoji_articleId: {
                emoji: e,
                articleId,
              },
            },
          });

          return {
            emoji: e,
            count: r?.count || 0,
          };
        })
      );

      // Récupérer les réactions de l'utilisateur
      const userReactions = await tx.userReaction.findMany({
        where: {
          userId,
          articleId,
        },
      });

      const userVotes = userReactions.reduce(
        (acc: Record<string, boolean>, r: UserReaction) => {
          acc[r.emoji] = true;
          return acc;
        },
        {} as Record<string, boolean>
      );

      // Formater les réactions
      const formattedReactions = updatedReactions.reduce(
        (acc, { emoji, count }) => {
          acc[emoji] = { count };
          return acc;
        },
        {} as Record<string, { count: number }>
      );

      return { reactions: formattedReactions, userVotes };
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error updating reaction:", error);
    return NextResponse.json(
      { error: "Failed to update reaction" },
      { status: 500 }
    );
  }
}
