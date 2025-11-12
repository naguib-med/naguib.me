"use client";

import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import React from "react";
import {
  Shield,
  Code,
  Lock,
  Terminal,
  ArrowRight,
  Download,
  Github,
  Linkedin,
  Mail,
  MapPin,
  GraduationCap,
  Briefcase,
  Award,
  ShieldCheck,
  KeyRound,
  FileSearch,
  Network,
  Server,
} from "lucide-react";

import { Button } from "@/components/ui/button";

export function CyberHero() {
  const router = useRouter();
  const heroRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState<"dev" | "security">("security");

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const certifications = [
    { name: "EBIOS RM", icon: ShieldCheck, color: "text-accent" },
    { name: "TryHackMe Jr Pentester", icon: KeyRound, color: "text-primary" },
    { name: "Web App Pentesting", icon: FileSearch, color: "text-secondary", badge: "En cours" },
    { name: "DevSecOps", icon: Network, color: "text-success", badge: "À venir" },
  ];

  const stats = [
    { value: "M2 OPSIE", label: "Étudiant", sublabel: "Label ANSSI" },
    { value: "~2 ans", label: "Expérience", sublabel: "Développement" },
    { value: "Aidant Cyber", label: "Bénévolat", sublabel: "ANSSI" },
  ];

  const expertise = {
    dev: [
      { icon: Code, name: "React / Next.js", level: 4 },
      { icon: Server, name: "Node.js / NestJS", level: 4 },
      { icon: Terminal, name: "TypeScript", level: 4 },
    ],
    security: [
      { icon: Shield, name: "Sécurité SI & Réseaux", level: 3 },
      { icon: Lock, name: "OWASP Top 10", level: 3 },
      { icon: ShieldCheck, name: "Gestion des Risques", level: 3 },
    ],
  };

  const socialLinks = [
    { icon: <Github className="h-5 w-5" />, url: "https://github.com/naguib-med", label: "Github" },
    { icon: <Linkedin className="h-5 w-5" />, url: "https://www.linkedin.com/in/naguib-mohamed-mahamoud/", label: "LinkedIn" },
    { icon: <Mail className="h-5 w-5" />, url: "mailto:moma.naguib@gmail.com", label: "Email" },
  ];

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen w-full overflow-hidden bg-background pt-20 pb-12"
    >
      {/* Cyber Grid Background */}
      <div className="absolute inset-0 cyber-grid opacity-50" />
      
      {/* Animated Gradients */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-1/4 h-[600px] w-[600px] rounded-full bg-primary/5 blur-[150px] animate-pulse" />
        <div className="absolute bottom-1/4 left-1/4 h-[500px] w-[500px] rounded-full bg-accent/5 blur-[140px] animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 right-0 h-[400px] w-[400px] rounded-full bg-secondary/5 blur-[120px] animate-pulse" style={{ animationDelay: "2s" }} />
      </div>

      <div className="container relative z-20 mx-auto px-6 lg:px-8">
        <div className="min-h-[calc(100vh-8rem)] flex flex-col justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-7 space-y-8">
              {/* Status Badge */}
              <AnimatePresence>
                {isLoaded && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-accent/10 to-primary/10 backdrop-blur-md border-2 border-accent/30 rounded-2xl"
                  >
                    <div className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-accent"></span>
                    </div>
                    <span className="text-sm font-bold text-foreground">
                      Recherche Stage • DevSecOps / Cybersécurité • 4-6 mois • À partir d&apos;avril 2026
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Main Title */}
              <AnimatePresence>
                {isLoaded && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                    className="space-y-6"
                  >
                    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
                      <span className="block text-foreground mb-2">Naguib Mohamed</span>
                      <div className="relative mt-4">
                        <span className="relative z-10 inline-block bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                          Développeur Full Stack
                        </span>
                        <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 via-accent/20 to-secondary/20 blur-2xl -z-10 rounded-lg"></div>
                      </div>
                      <div className="text-3xl sm:text-4xl text-muted-foreground font-medium mt-3">
                        Étudiant en Cybersécurité
                      </div>
                    </h1>

                    <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
                      <span className="font-semibold text-foreground">Master 2 OPSIE (Label SecNumÉdu – ANSSI)</span> en cybersécurité. 
                      Développeur Full Stack passionné par la sécurité applicative et en apprentissage du DevSecOps.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Key Info */}
              <AnimatePresence>
                {isLoaded && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="flex flex-wrap gap-6"
                  >
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-5 w-5 text-primary" />
                      <span className="font-medium">Lyon, France</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <GraduationCap className="h-5 w-5 text-accent" />
                      <span className="font-medium">Université Lyon 2</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Briefcase className="h-5 w-5 text-secondary" />
                      <span className="font-medium">Aidant Cyber ANSSI</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Stats */}
              <AnimatePresence>
                {isLoaded && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                    className="grid grid-cols-3 gap-6"
                  >
                    {stats.map((stat, index) => (
                      <div key={index} className="space-y-1">
                        <div className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                          {stat.value}
                        </div>
                        <div className="text-sm font-semibold text-foreground">{stat.label}</div>
                        <div className="text-xs text-muted-foreground">{stat.sublabel}</div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* CTA Buttons */}
              <AnimatePresence>
                {isLoaded && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.4 }}
                    className="flex flex-col sm:flex-row gap-4"
                  >
                    <Button
                      onClick={() => router.push("/contact")}
                      size="lg"
                      className="relative h-14 px-8 rounded-2xl overflow-hidden group shadow-lg shadow-primary/20"
                    >
                      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] group-hover:bg-[position:100%_0] transition-all duration-700"></span>
                      <span className="relative flex items-center justify-center gap-2 text-primary-foreground font-bold">
                        <Mail className="h-5 w-5" />
                        <span>Me Contacter</span>
                        <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                      </span>
                    </Button>

                    <Button
                      variant="outline"
                      size="lg"
                      className="h-14 px-8 rounded-2xl border-2 border-border hover:border-primary hover:bg-primary/5 transition-all duration-300 font-bold"
                    >
                      <Download className="h-5 w-5 mr-2" />
                      <span>Télécharger CV</span>
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Social Links */}
              <AnimatePresence>
                {isLoaded && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.5 }}
                    className="flex items-center gap-4"
                  >
                    {socialLinks.map((link, i) => (
                      <motion.a
                        key={i}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-center w-12 h-12 rounded-xl border-2 border-border bg-background/50 backdrop-blur-sm hover:border-primary hover:bg-primary/5 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 + (i * 0.1) }}
                        aria-label={link.label}
                      >
                        <span className="text-muted-foreground group-hover:text-primary transition-colors">
                          {link.icon}
                        </span>
                      </motion.a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right Column - Expertise Cards */}
            <div className="lg:col-span-5 space-y-6">
              {/* Tab Selector */}
              <div className="flex p-1.5 gap-2 rounded-2xl bg-muted/50 border-2 border-border backdrop-blur-sm">
                <button
                  onClick={() => setActiveTab("security")}
                  className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${
                    activeTab === "security"
                      ? "bg-gradient-to-r from-accent to-accent/80 text-white shadow-lg shadow-accent/30"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Shield className="h-4 w-4" />
                  Cybersécurité
                </button>
                <button
                  onClick={() => setActiveTab("dev")}
                  className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${
                    activeTab === "dev"
                      ? "bg-gradient-to-r from-primary to-primary/80 text-white shadow-lg shadow-primary/30"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Code className="h-4 w-4" />
                  Développement
                </button>
              </div>

              {/* Expertise Cards */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-4"
                >
                  {expertise[activeTab].map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="cyber-border rounded-2xl border-2 border-border bg-card/80 backdrop-blur-sm p-6 hover:shadow-xl hover:shadow-primary/10 transition-all duration-500"
                    >
                      <div className="flex items-start gap-4">
                        <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${
                          activeTab === "security" ? "from-accent/20 to-accent/10" : "from-primary/20 to-primary/10"
                        } ${activeTab === "security" ? "text-accent" : "text-primary"}`}>
                          <skill.icon className="h-7 w-7" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-foreground mb-3">{skill.name}</h3>
                          <div className="flex gap-1.5">
                            {[...Array(5)].map((_, i) => (
                              <div
                                key={i}
                                className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                                  i < skill.level
                                    ? activeTab === "security"
                                      ? "bg-gradient-to-r from-accent to-orange-500"
                                      : "bg-gradient-to-r from-primary to-secondary"
                                    : "bg-muted"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>

              {/* Certifications Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.6 }}
                className="rounded-2xl border-2 border-border bg-gradient-to-br from-accent/5 to-primary/5 p-6 backdrop-blur-sm"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Award className="h-6 w-6 text-accent" />
                  <h3 className="text-lg font-bold text-foreground">Certifications</h3>
                </div>
                <div className="space-y-3">
                  {certifications.map((cert, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <cert.icon className={`h-5 w-5 ${cert.color}`} />
                        <span className="text-sm font-medium text-foreground">{cert.name}</span>
                      </div>
                      {cert.badge && (
                        <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground font-medium">
                          {cert.badge}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
