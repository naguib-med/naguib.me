"use client";

import Link from "next/link";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  ArrowRight,
  Code,
} from "lucide-react";

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/naguib-med/",
    icon: Github,
  },
  {
    name: "Linkedin",
    href: "https://www.linkedin.com/in/naguib-mohamed-mahamoud/",
    icon: Linkedin,
  },
  {
    name: "Twitter",
    href: "https://x.com/NaguibMoma",
    icon: Twitter,
  },
  {
    name: "Mail",
    href: "mailto:moma.naguib@gmail.com",
    icon: Mail,
  },
];

const footerLinks = [
  {
    title: "Navigation",
    links: [
      { name: "Home", href: "/" },
      { name: "Portfolio", href: "/portfolio" },
      { name: "Blog", href: "/blog" },
      { name: "About", href: "/about" },
      { name: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Resume", href: "/resume" },
      { name: "Case Studies", href: "/case-studies" },
      { name: "Testimonials", href: "/testimonials" },
    ],
  },
];

export function Footer() {
  return (
    <div className="relative overflow-hidden border-t border-primary/10">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 to-background/90 backdrop-blur-sm" />

      <div className="container relative space-y-12 py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="group inline-flex items-center gap-2">
              <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-primary/20 via-primary/10 to-transparent p-[1px]">
                <div className="absolute inset-0 animate-[spin_20s_linear_infinite] bg-gradient-to-r from-primary via-violet-500 to-blue-500 opacity-20" />
                <div className="z-10 flex h-full w-full items-center justify-center rounded-xl bg-background/80 backdrop-blur-sm">
                  <Code className="h-5 w-5 text-primary transition-transform duration-300 group-hover:scale-110" />
                </div>
              </div>
              <span className="bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-xl font-bold text-transparent">
                Naguib
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Fullstack Engineer | +2 years experience in software development |
              Aspiring DevSecOps | Passionate about software security | Code
              secure-by-design
            </p>
            <div className="flex gap-2">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-primary/20 via-primary/10 to-transparent p-[1px] transition-transform hover:scale-110"
                  >
                    <div className="absolute inset-0 translate-y-full bg-gradient-to-r from-primary via-violet-500 to-blue-500 opacity-20 transition-transform group-hover:translate-y-0" />
                    <div className="z-10 flex h-full w-full items-center justify-center rounded-full bg-background/80 backdrop-blur-sm">
                      <Icon className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((section) => (
            <div key={section.title} className="space-y-4">
              <h3 className="text-lg font-semibold leading-6 text-foreground">
                {section.title}
              </h3>
              <ul role="list" className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="group flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Stay Updated</h3>
            <p className="text-sm text-muted-foreground">
              Subscribe to my newsletter for the latest updates and insights.
            </p>
            <form className="relative space-y-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="h-11 rounded-full bg-primary/5 px-4 transition-colors focus-visible:bg-primary/10"
              />
              <Button
                type="submit"
                className="w-full rounded-full bg-gradient-to-r from-primary via-violet-500 to-blue-500 transition-all hover:scale-[1.02] hover:shadow-[0_0_20px_4px_rgba(124,58,237,0.3)]"
              >
                <span className="flex items-center gap-2">
                  Subscribe
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Button>
            </form>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4 border-t border-primary/10 pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Naguib. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/privacy" className="hover:text-primary">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-primary">
              Terms of Service
            </Link>
            <Link href="/sitemap" className="hover:text-primary">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
