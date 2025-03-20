"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Code, Brain, Palette, Globe, Shield, Zap, Server, Database } from "lucide-react";

const expertiseAreas = [
  {
    icon: Code,
    title: "Développement frontend",
    description: "Création d'applications web modernes et performantes avec les dernières technologies.",
    skills: ["React", "Next.js", "TypeScript", "HTML/CSS", "Vue.js", "JavaScript"],
    color: "text-blue-500",
    accentColor: "bg-blue-500/10",
  },
  {
    icon: Server,
    title: "Développement backend",
    description: "Architecture et développement de systèmes robustes et évolutifs.",
    skills: ["Node.js", "Spring Boot", "Express", "Java", "RESTful APIs", "Prisma"],
    color: "text-green-500",
    accentColor: "bg-green-500/10",
  },
  {
    icon: Database,
    title: "Base de données",
    description: "Gestion et optimisation de données pour vos applications.",
    skills: ["MongoDB", "PostgreSQL", "MySQL", "Redis", "Firebase"],
    color: "text-amber-500",
    accentColor: "bg-amber-500/10",
  },
  {
    icon: Globe,
    title: "Développement Mobile",
    description: "Création d'applications mobiles cross-platform performantes.",
    skills: ["React Native", "iOS", "Android"],
    color: "text-emerald-500",
    accentColor: "bg-emerald-500/10",
  },
  {
    icon: Palette,
    title: "Design UI/UX",
    description: "Conception d'interfaces utilisateur intuitives et esthétiques.",
    skills: ["Figma", "UI Design", "UX Research", "Responsive Design", "Wireframing"],
    color: "text-pink-500",
    accentColor: "bg-pink-500/10",
  },
  {
    icon: Shield,
    title: "Sécurité Web",
    description: "Protection et sécurisation de vos applications web.",
    skills: ["OWASP", "SSL/TLS", "Penetration Testing", "Security Audit", "Auth0"],
    color: "text-red-500",
    accentColor: "bg-red-500/10",
  },
  {
    icon: Zap,
    title: "Performance",
    description: "Optimisation des performances et de l'expérience utilisateur.",
    skills: ["Web Vitals", "SEO", "Caching", "CDN", "Lighthouse", "Webpack"],
    color: "text-yellow-500",
    accentColor: "bg-yellow-500/10",
  },
];

export function MyExpertise() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.section
      ref={ref}
      className="relative overflow-hidden py-24"
    >
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-5" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background/50" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
        className="container relative"
      >
        <div className="mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-primary/10 bg-primary/5 px-4 py-1.5 text-sm text-primary/80"
          >
            <Brain className="h-4 w-4" />
            Expertise Technique
          </motion.div>
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl"
          >
            Ma Stack Technique
          </motion.h2>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-muted-foreground/80"
          >
            Un ensemble complet de compétences pour transformer vos idées en réalité numérique.
          </motion.p>
        </div>

        <div className="mx-auto mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {expertiseAreas.map((area, index) => {
            const Icon = area.icon;
            return (
              <motion.div
                key={area.title}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100,
                }}
                className="group"
              >
                <motion.div
                  whileHover={{
                    scale: 1.02,
                    transition: { duration: 0.3 },
                  }}
                  className="relative overflow-hidden rounded-2xl bg-card/50 border border-border/20 hover:border-border/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
                >
                  <div className="relative z-10 p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div
                        className={`
                        relative flex h-12 w-12 
                        items-center justify-center 
                        rounded-xl ${area.accentColor}
                        border border-primary/5
                        transition-all duration-300
                        group-hover:border-primary/10
                        group-hover:scale-105
                      `}
                      >
                        <Icon
                          className={`h-6 w-6 ${area.color} transition-transform group-hover:scale-110`}
                        />
                      </div>
                      <h3 className="text-xl font-semibold group-hover:text-primary transition-colors duration-300">
                        {area.title}
                      </h3>
                    </div>

                    <p className="text-sm text-muted-foreground/80 mb-4 opacity-80 group-hover:opacity-100 transition-opacity line-clamp-2">
                      {area.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {area.skills.map((skill) => (
                        <span
                          key={skill}
                          className={`
                            inline-flex items-center rounded-full 
                            ${area.accentColor}
                            px-3 py-1 
                            text-xs font-medium 
                            ${area.color}
                            ring-1 ring-inset ring-primary/5
                            transition-all duration-300
                            hover:ring-primary/10
                            hover:scale-105
                          `}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </motion.section>
  );
}