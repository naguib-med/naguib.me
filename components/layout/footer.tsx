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
  Shield,
  Terminal,
  Lock,
  Code,
} from "lucide-react";

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/naguib-med/",
    icon: Github,
  },
  {
    name: "LinkedIn",
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

const footerLinks = {
  sections: [
    {
      title: "Navigation",
      links: [
        { name: "Accueil", href: "/" },
        { name: "Portfolio", href: "/portfolio" },
        { name: "Blog", href: "/blog" },
        { name: "Certifications", href: "/certification" },
        { name: "Contact", href: "/contact" }
      ]
    },
    {
      title: "Expertise",
      links: [
        { name: "Développement", href: "/#expertise" },
        { name: "Cybersécurité", href: "/#expertise" },
        { name: "DevSecOps", href: "/#expertise" },
      ]
    },
    {
      title: "Ressources",
      links: [
        { name: "CV", href: "/resume.pdf" },
        { name: "Projets", href: "/portfolio" },
      ]
    }
  ]
};

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t-2 border-border">
      {/* Cyber Grid Background */}
      <div className="absolute inset-0 cyber-grid opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />

      {/* Gradient Orbs */}
      <div className="absolute top-0 left-1/4 h-[400px] w-[600px] rounded-full bg-primary/3 blur-[150px]" />
      <div className="absolute bottom-0 right-1/4 h-[400px] w-[600px] rounded-full bg-accent/3 blur-[150px]" />

      <div className="container relative space-y-12 py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Section */}
          <div className="space-y-6">
            <Link href="/" className="group inline-flex items-center gap-3">
              <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 border-2 border-primary/30">
                <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-primary to-accent opacity-20" />
                <Shield className="h-6 w-6 text-primary transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12 z-10" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                  Naguib Mohamed
                </span>
                <span className="text-xs font-semibold text-muted-foreground">
                  Étudiant M2 Cybersécurité
                </span>
              </div>
            </Link>
            
            <p className="text-sm text-muted-foreground leading-relaxed">
              Étudiant en cybersécurité et développeur Full Stack passionné par la sécurité applicative et l&apos;apprentissage des pratiques DevSecOps.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl border-2 border-border bg-background/50 backdrop-blur-sm hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 hover:scale-110"
                  >
                    <Icon className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary z-10" />
                  </Link>
                );
              })}
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-3 pt-4">
              <div className="rounded-xl border-2 border-border bg-card/50 backdrop-blur-sm p-3 text-center">
                <div className="text-lg font-bold text-primary">~2</div>
                <div className="text-xs text-muted-foreground">Ans</div>
              </div>
              <div className="rounded-xl border-2 border-border bg-card/50 backdrop-blur-sm p-3 text-center">
                <div className="text-lg font-bold text-accent">15+</div>
                <div className="text-xs text-muted-foreground">Projets</div>
              </div>
              <div className="rounded-xl border-2 border-border bg-card/50 backdrop-blur-sm p-3 text-center">
                <div className="text-lg font-bold text-secondary">M2</div>
                <div className="text-xs text-muted-foreground">OPSIE</div>
              </div>
            </div>
          </div>

          {/* Links Sections */}
          {footerLinks.sections.map((section) => (
            <div key={section.title} className="space-y-4">
              <h3 className="text-base font-bold text-foreground flex items-center gap-2">
                <div className="h-1 w-1 rounded-full bg-primary" />
                {section.title}
              </h3>
              <ul role="list" className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="group flex items-center gap-2 text-sm text-muted-foreground transition-all duration-300 hover:text-primary hover:translate-x-1"
                    >
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-foreground flex items-center gap-2">
              <div className="h-1 w-1 rounded-full bg-accent" />
              Newsletter
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Recevez mes derniers articles sur le DevSecOps et la cybersécurité.
            </p>
            <form className="space-y-3">
              <Input
                type="email"
                placeholder="votre@email.com"
                className="h-11 rounded-xl border-2 border-border bg-background/50 backdrop-blur-sm px-4 transition-all duration-300 focus:border-primary/50 focus:bg-background"
              />
              <Button
                type="submit"
                className="w-full h-11 rounded-xl bg-gradient-to-r from-primary to-accent transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/30 font-bold border-0"
              >
                <Terminal className="h-4 w-4 mr-2" />
                S&apos;abonner
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </form>

            {/* Security Badge */}
            <div className="mt-6 p-4 rounded-xl border-2 border-accent/20 bg-gradient-to-br from-accent/5 to-transparent backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-2">
                <Lock className="h-5 w-5 text-accent" />
                <span className="text-sm font-bold text-foreground">Label ANSSI</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Formation SecNumÉdu certifiée
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col items-center gap-4 border-t-2 border-border pt-8 text-center">
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors font-medium">
              Me Contacter
            </Link>
            <span className="text-border">•</span>
            <Link href="/portfolio" className="text-muted-foreground hover:text-primary transition-colors font-medium">
              Portfolio
            </Link>
            <span className="text-border">•</span>
            <Link href="/blog" className="text-muted-foreground hover:text-primary transition-colors font-medium">
              Blog
            </Link>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Code className="h-4 w-4 text-primary" />
            <span>© {new Date().getFullYear()} Naguib Mohamed</span>
            <span className="text-border">•</span>
            <span className="font-semibold text-foreground">Étudiant M2 Cybersécurité</span>
          </div>

          <p className="text-xs text-muted-foreground max-w-md">
            Développement web • Code review • Apprentissage sécurité • Bonnes pratiques
          </p>
        </div>
      </div>
    </footer>
  );
}

