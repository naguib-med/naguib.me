import type { Metadata } from "next";
import { Syne, Space_Grotesk } from 'next/font/google';
import "./globals.css";
import { ClientLayout } from "@/components/layout/client-layout";

const syne = Syne({ subsets: ["latin"], weight: ["400", "600", "700"], variable: "--font-syne" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["400", "500", "700"], variable: "--font-space-grotesk" });

export const metadata: Metadata = {
  title: "Naguib Mohamed - Développeur Fullstack | Étudiant Cybersécurité",
  description:
    "Étudiant Master 2 OPSIE (Label ANSSI) spécialisé en cybersécurité. Développeur Full Stack avec ~2 ans d'expérience. Passionné par la sécurité applicative et les bonnes pratiques DevSecOps.",
  keywords: [
    "développeur fullstack",
    "étudiant cybersécurité",
    "master OPSIE",
    "label ANSSI",
    "React",
    "Node.js",
    "sécurité web",
    "OWASP",
    "portfolio",
    "stage cybersécurité",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${syne.variable} ${spaceGrotesk.variable} antialiased`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}