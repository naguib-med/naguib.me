"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Shield, ArrowRight, Terminal, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function CallToAction() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section ref={ref} className="relative overflow-hidden py-32">
      {/* Cyber Grid Background */}
      <div className="absolute inset-0 cyber-grid opacity-20" />

      {/* Gradient Orbs */}
      <div className="absolute top-1/2 left-1/4 h-[500px] w-[700px] rounded-full bg-primary/5 blur-[150px] animate-pulse" />
      <div className="absolute top-1/2 right-1/4 h-[500px] w-[700px] rounded-full bg-accent/5 blur-[150px] animate-pulse" style={{ animationDelay: "1s" }} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
        className="container relative"
      >
        <div className="mx-auto max-w-4xl">
          {/* Main Card */}
          <div className="relative overflow-hidden rounded-3xl border-2 border-border bg-gradient-to-br from-card via-card to-card/50 backdrop-blur-xl p-12 shadow-2xl">
            {/* Animated gradient border effect */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary via-accent to-secondary opacity-20 blur-xl" />

            <div className="relative z-10">
              {/* Badge */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={inView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 rounded-full border-2 border-accent/30 bg-gradient-to-r from-accent/10 to-primary/10 px-6 py-3 text-sm font-bold text-foreground mb-8 backdrop-blur-sm"
              >
                <Shield className="h-5 w-5 text-accent animate-pulse" />
                Disponible pour Collaboration
              </motion.div>

              {/* Title */}
              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                animate={inView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-6"
              >
                Prêt à Sécuriser Votre{" "}
                <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                  Projet Digital ?
                </span>
              </motion.h2>

              {/* Description */}
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={inView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Transformons ensemble votre vision en solution web moderne et sécurisée.
                Développement fullstack et intégration des bonnes pratiques de sécurité.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={inView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 mb-10"
              >
                <Button
                  asChild
                  size="lg"
                  className="group relative h-14 overflow-hidden rounded-2xl bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] px-8 transition-all duration-700 hover:bg-[position:100%_0] hover:scale-105 hover:shadow-xl hover:shadow-primary/30 font-bold border-0"
                >
                  <Link
                    href="/contact"
                    className="relative z-10 flex items-center gap-2"
                  >
                    <Mail className="h-5 w-5" />
                    Démarrer un Projet
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="h-14 rounded-2xl border-2 border-border hover:border-primary hover:bg-primary/5 transition-all duration-300 font-bold px-8"
                >
                  <Link
                    href="/portfolio"
                    className="flex items-center gap-2"
                  >
                    <Terminal className="h-5 w-5" />
                    Voir mes Réalisations
                  </Link>
                </Button>
              </motion.div>

              {/* Contact Info */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={inView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t-2 border-border"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 border-2 border-primary/30">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-muted-foreground">Email</div>
                    <a href="mailto:moma.naguib@gmail.com" className="text-sm font-bold text-foreground hover:text-primary transition-colors">
                      moma.naguib@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-accent/20 to-accent/10 border-2 border-accent/30">
                    <Phone className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-muted-foreground">Téléphone</div>
                    <a href="tel:+33749431872" className="text-sm font-bold text-foreground hover:text-accent transition-colors">
                      +33 7 49 43 18 72
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-secondary/20 to-secondary/10 border-2 border-secondary/30">
                    <MapPin className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-muted-foreground">Localisation</div>
                    <div className="text-sm font-bold text-foreground">
                      Lyon, France
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Additional Info Cards */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8"
          >
            {[
              {
                title: "Réponse Rapide",
                description: "Réponse sous 24-48h",
                icon: Mail,
                color: "primary",
              },
              {
                title: "Formation Certifiée",
                description: "Label ANSSI SecNumÉdu",
                icon: Shield,
                color: "accent",
              },
              {
                title: "Bonnes Pratiques",
                description: "Sécurité intégrée",
                icon: Terminal,
                color: "secondary",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="rounded-2xl border-2 border-border bg-card/80 backdrop-blur-sm p-6 text-center hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 hover:scale-105"
              >
                <div className={`inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-${item.color}/20 to-${item.color}/10 border-2 border-${item.color}/30 mb-4`}>
                  <item.icon className={`h-7 w-7 text-${item.color}`} />
                </div>
                <h3 className="text-base font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}