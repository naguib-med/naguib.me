import type { Metadata } from "next";
import { Syne, Space_Grotesk } from 'next/font/google';
import "./globals.css";
import { ClientLayout } from "@/components/layout/client-layout";

const syne = Syne({ subsets: ["latin"], weight: ["400", "600", "700"], variable: "--font-syne" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["400", "500", "700"], variable: "--font-space-grotesk" });

export const metadata: Metadata = {
  title: "Naguib - Portfolio & Blog",
  description:
    "Personal portfolio and blog showcasing my work and thoughts on technology",
  keywords: ["portfolio", "blog", "web development", "software engineer"],
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