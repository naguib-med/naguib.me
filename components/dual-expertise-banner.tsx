"use client";

import { motion } from "framer-motion";
import { Shield, Code, Lock, Zap, Terminal, FileCode } from "lucide-react";

export function DualExpertiseBanner() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/4 h-[500px] w-[700px] rounded-full bg-primary/3 blur-[140px]" />
        <div className="absolute top-1/2 right-1/4 h-[500px] w-[700px] rounded-full bg-accent/3 blur-[140px]" />
      </div>

      <div className="container relative mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mx-auto max-w-6xl"
        >
          {/* Title */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Double Expertise
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Une approche holistique alliant développement et sécurité
            </p>
          </div>

          {/* Two columns */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Dev Column */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="h-full rounded-2xl border-2 border-border bg-gradient-to-br from-primary/5 to-secondary/5 p-8 hover:border-primary/40 transition-all duration-500 hover:shadow-xl hover:shadow-primary/10">
                {/* Icon */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 text-primary group-hover:scale-110 transition-transform duration-300">
                    <Code className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">
                    Développement
                  </h3>
                </div>

                {/* Description */}
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Création d&apos;applications web modernes et performantes avec une maîtrise complète 
                  du stack Fullstack.
                </p>

                {/* Key points */}
                <ul className="space-y-3">
                  {[
                    { icon: Terminal, text: "Frontend React/Next.js & TypeScript" },
                    { icon: FileCode, text: "Backend Node.js & Java Spring" },
                    { icon: Zap, text: "Architecture scalable & APIs RESTful" },
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <item.icon className="h-4 w-4" />
                      </div>
                      <span className="text-foreground/90 pt-1.5">{item.text}</span>
                    </li>
                  ))}
                </ul>

                {/* Gradient bar */}
                <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-primary to-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left rounded-b-2xl" />
              </div>
            </motion.div>

            {/* Security Column */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="h-full rounded-2xl border-2 border-border bg-gradient-to-br from-accent/5 to-orange-500/5 p-8 hover:border-accent/40 transition-all duration-500 hover:shadow-xl hover:shadow-accent/10">
                {/* Icon */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-accent/20 to-orange-500/20 text-accent group-hover:scale-110 transition-transform duration-300">
                    <Shield className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">
                    Cybersécurité
                  </h3>
                </div>

                {/* Description */}
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Sécurisation des applications et intégration des meilleures pratiques 
                  DevSecOps dans le cycle de développement.
                </p>

                {/* Key points */}
                <ul className="space-y-3">
                  {[
                    { icon: Shield, text: "Audit de sécurité & OWASP Top 10" },
                    { icon: Lock, text: "DevSecOps & Infrastructure sécurisée" },
                    { icon: Terminal, text: "Conformité & évaluation des risques" },
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                        <item.icon className="h-4 w-4" />
                      </div>
                      <span className="text-foreground/90 pt-1.5">{item.text}</span>
                    </li>
                  ))}
                </ul>

                {/* Gradient bar */}
                <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-accent to-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left rounded-b-2xl" />
              </div>
            </motion.div>
          </div>

          {/* Connection indicator */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border-2 border-border bg-background/50 backdrop-blur-sm">
              <Code className="h-5 w-5 text-primary" />
              <div className="h-1 w-12 bg-gradient-to-r from-primary via-secondary to-accent rounded-full" />
              <Shield className="h-5 w-5 text-accent" />
            </div>
            <p className="text-sm text-muted-foreground mt-4 font-medium">
              Une synergie parfaite pour des applications robustes et sécurisées
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

