import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json();

    // Validation basique
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Tous les champs sont requis" },
        { status: 400 }
      );
    }

    // Envoyer l'email
    await resend.emails.send({
      from: "Naguib.me <contact@naguib.me>",
      to: ["moma.naguib@gmail.com"],
      subject: `[Contact] ${subject}`,
      text: `
Nom: ${name}
Email: ${email}
Sujet: ${subject}

Message:
${message}
      `,
      replyTo: email,
    });

    return NextResponse.json(
      { message: "Message envoyé avec succès" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur lors de l'envoi du message:", error);
    return NextResponse.json(
      { error: "Erreur lors de l'envoi du message" },
      { status: 500 }
    );
  }
}
