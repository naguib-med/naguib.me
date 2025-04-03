"use client";
import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import React, { MouseEvent as ReactMouseEvent } from "react";
import {
  ArrowRight,
  Newspaper,
  ArrowDown,
  Shield,
  Code,
  Database,
  Github,
  Linkedin,
  Twitter,
  Zap,
  Lock,
  Network,
  Server,
  Braces,
  Cpu,
  ChevronRight,
  Globe,
  Layers,
  Layout,
  Cloud,
  BookOpen,
  Award
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type CategoryId = "frontend" | "backend" | "devops" | "security";

export function Hero() {
  const router = useRouter();
  const heroRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  const [activeCategory, setActiveCategory] = useState<CategoryId>("frontend");

  useEffect(() => {
    setIsLoaded(true);

    const handleMouseMove = (e: ReactMouseEvent | MouseEvent): void => {
      setCursorPosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    window.addEventListener('mousemove', handleMouseMove as EventListener);
    return () => window.removeEventListener('mousemove', handleMouseMove as EventListener);
  }, []);

  // Compétences organisées par catégories
  const skills: {
    [key: string]: Array<{
      id: number;
      icon: React.ReactNode;
      name: string;
      level: number;
      description: string;
    }>;
  } = {
    frontend: [
      { id: 1, icon: <Code size={20} />, name: "React", level: 4, description: "Hooks, Context, Redux Toolkit" },
      { id: 2, icon: <Braces size={20} />, name: "JavaScript", level: 4, description: "ES6+, DOM, Async/Await" },
      { id: 3, icon: <Braces size={20} />, name: "TypeScript", level: 3, description: "Types, Interfaces, Generics" },
      { id: 4, icon: <Zap size={20} />, name: "TailwindCSS", level: 3, description: "Responsive design, Composants" },
      { id: 5, icon: <Layout size={20} />, name: "Vue.js", level: 3, description: "Components, Vuex, Vue Router" },
      { id: 6, icon: <Globe size={20} />, name: "Next.js", level: 2, description: "En apprentissage, App Router" },
    ],
    backend: [
      { id: 7, icon: <Server size={20} />, name: "Node.js", level: 4, description: "Express.js, API REST" },
      { id: 8, icon: <Database size={20} />, name: "Bases de données", level: 3, description: "PostgreSQL, MongoDB, MySQL, SQL" },
      { id: 9, icon: <Layers size={20} />, name: "Java", level: 3, description: "Spring Boot, Swing, Hibernate" },
      { id: 10, icon: <Braces size={20} />, name: "GraphQL", level: 2, description: "En apprentissage, Schemas" },
      { id: 11, icon: <Braces size={20} />, name: "Prisma", level: 3, description: "ORM, Migrations, TypeScript" },
      { id: 12, icon: <Code size={20} />, name: "Python", level: 3, description: "Scripting, Automatisation" },
    ],
    devops: [
      { id: 13, icon: <Server size={20} />, name: "Docker", level: 3, description: "Conteneurisation, Compose" },
      { id: 14, icon: <Cloud size={20} />, name: "AWS", level: 2, description: "Cloud Services, Notions" },
      { id: 15, icon: <Cpu size={20} />, name: "Kubernetes", level: 2, description: "Notions, TP Université" },
      { id: 16, icon: <Layers size={20} />, name: "Terraform", level: 2, description: "Notions, TP Université" },
      { id: 17, icon: <Server size={20} />, name: "Ansible", level: 2, description: "Configuration, Automatisation" },
      { id: 18, icon: <Zap size={20} />, name: "CI/CD", level: 2, description: "GitLab CI, GitHub Actions" },
    ],
    security: [
      { id: 19, icon: <Shield size={20} />, name: "OWASP", level: 2, description: "Top 10, Vulnérabilités Web" },
      { id: 20, icon: <Lock size={20} />, name: "Auth Systems", level: 3, description: "OpenID-Connect, CAS, JWT" },
      { id: 21, icon: <Network size={20} />, name: "DevSecOps", level: 2, description: "Pratiques, Intégration" },
      { id: 22, icon: <Layers size={20} />, name: "Risk Analysis", level: 2, description: "EBIOS, Évaluation" },
      { id: 23, icon: <Server size={20} />, name: "Vault", level: 2, description: "Gestion des secrets" },
      { id: 24, icon: <Server size={20} />, name: "Prometheus", level: 2, description: "Monitoring, TP Université" },
    ]
  };

  // Navigation handlers
  const handlePortfolioClick = () => {
    router.push('/portfolio');
  };

  const handleBlogClick = () => {
    router.push('/blog');
  };

  const socialLinks = [
    { icon: <Github className="h-5 w-5" />, url: "https://github.com/naguib-med", label: "Github" },
    { icon: <Linkedin className="h-5 w-5" />, url: "https://www.linkedin.com/in/naguib-mohamed-mahamoud/", label: "LinkedIn" },
    { icon: <Twitter className="h-5 w-5" />, url: "https://x.com/NaguibMoma", label: "Twitter" },
  ];

  // Catégories pour les tabs
  const categories = [
    { id: "frontend", label: "Frontend", icon: <Layout size={16} /> },
    { id: "backend", label: "Backend", icon: <Server size={16} /> },
    { id: "devops", label: "DevOps", icon: <Cloud size={16} /> },
    { id: "security", label: "Sécurité", icon: <Shield size={16} /> },
  ];

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen w-full overflow-hidden bg-background py-20"
    >
      <div
        className="fixed inset-0 z-10 pointer-events-none"
        style={{
          background: `radial-gradient(800px circle at ${cursorPosition.x}px ${cursorPosition.y}px, rgba(124, 58, 237, 0.07), transparent 40%)`
        }}
      />

      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] -z-10" />
      <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.015] -z-10" />

      <div className="absolute top-0 left-1/3 h-[500px] w-[800px] rounded-full bg-primary/5 blur-[120px] -z-10" />
      <div className="absolute bottom-1/3 right-0 h-[400px] w-[600px] rounded-full bg-blue-500/5 blur-[100px] -z-10" />
      <div className="absolute bottom-0 left-0 h-[300px] w-[500px] rounded-full bg-violet-500/5 blur-[80px] -z-10" />

      {/* Main content container */}
      <div className="container relative z-20 mx-auto px-6 lg:px-8 py-12 lg:py-0">
        <div className="min-h-screen flex flex-col justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left column - Main content */}
            <div className="lg:col-span-5 lg:pr-6">
              <AnimatePresence>
                {isLoaded && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="space-y-2 mb-6"
                  >
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/5 backdrop-blur-md border border-primary/20 rounded-full">
                      <BookOpen size={16} className="text-primary" />
                      <span className="text-sm font-medium bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
                        Titulaire M2 Technologies de l&apos;Information et Web - Lyon 1
                      </span>
                    </div>
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/5 backdrop-blur-md border border-primary/20 rounded-full">
                      <Shield size={16} className="text-primary" />
                      <span className="text-sm font-medium bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
                        <a href="https://github.com/devsecblueprint/devsecblueprint" target="_blank" rel="noopener noreferrer" className="hover:underline">
                          Contributeur DevSecBlueprint (DSB) – Pipelines DevSecOps GitLab/Azure
                        </a>
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {isLoaded && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                    className="space-y-6 mb-8"
                  >
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
                      <span className="block">Ingénieur</span>
                      <div className="relative mt-2">
                        <span className="relative z-10 inline-block bg-gradient-to-r from-primary via-violet-500 to-blue-500 bg-clip-text text-transparent">
                          Fullstack | Futur Expert DevSecOps
                        </span>
                        <span className="absolute -inset-1 block rounded-lg bg-gradient-to-r from-primary/20 via-violet-500/20 to-blue-500/20 opacity-30 blur-xl -z-10"></span>
                      </div>
                    </h1>

                    <p className="text-lg text-muted-foreground">
                      Développeur web fullstack passionné, évoluant vers le DevSecOps.
                      Je conçois des applications web robustes et sécurisées,
                      en combinant expertise technique et principes de sécurité
                      pour des expériences utilisateur optimales.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Stats */}
              <AnimatePresence>
                {isLoaded && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="flex flex-wrap gap-8 mb-10"
                  >
                    {[
                      { value: "3+", label: "Années d'expérience" },
                      { value: "30+", label: "Projets réalisés" },
                      { value: "5+", label: "Articles publiés" },
                    ].map((stat, index) => (
                      <div key={index} className="space-y-1">
                        <div className="text-3xl font-bold">{stat.value}</div>
                        <div className="text-sm text-muted-foreground">{stat.label}</div>
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
                    transition={{ duration: 0.7, delay: 0.3 }}
                    className="flex flex-col sm:flex-row gap-4 mb-8"
                  >
                    <Button
                      onClick={handlePortfolioClick}
                      className="relative h-12 md:h-14 px-6 md:px-8 rounded-full overflow-hidden group"
                    >
                      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary to-blue-600 group-hover:bg-gradient-to-l transition-all duration-500"></span>
                      <span className="relative flex items-center justify-center gap-2 text-primary-foreground">
                        <span>Voir mon Portfolio</span>
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </Button>

                    <Button
                      variant="outline"
                      onClick={handleBlogClick}
                      className="h-12 md:h-14 px-6 md:px-8 rounded-full border-primary/20 hover:border-primary hover:bg-primary/5"
                    >
                      <span className="flex items-center justify-center gap-2">
                        <span>Lire mon Blog</span>
                        <Newspaper className="h-4 w-4" />
                      </span>
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Education Badge */}
              <AnimatePresence>
                {isLoaded && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.4 }}
                    className="flex items-center gap-4 p-4 mb-6 rounded-xl bg-card/30 border border-border/50 backdrop-blur-sm"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-blue-500/20 text-blue-500">
                      <Award size={24} />
                    </div>
                    <div>
                      <h4 className="text-base font-medium">Master 2 Technologies de l&apos;Information et Web</h4>
                      <p className="text-sm text-muted-foreground">Université Claude Bernard Lyon 1</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Social links */}
              <AnimatePresence>
                {isLoaded && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.5 }}
                    className="flex items-center gap-4"
                  >
                    <span className="text-sm text-muted-foreground mr-2">Suivez-moi</span>
                    {socialLinks.map((link, i) => (
                      <motion.a
                        key={i}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-center w-10 h-10 rounded-full border border-muted bg-background hover:border-primary hover:bg-primary/5 transition-colors"
                        whileHover={{ scale: 1.1 }}
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

            {/* Right column - Skills */}
            <motion.div
              className="lg:col-span-7 space-y-6"
            >
              {/* Tab selector */}
              <div className="flex justify-start mb-4 overflow-x-auto pb-2">
                <div className="inline-flex p-1 gap-1 rounded-full bg-muted">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id as CategoryId)}
                      className={cn(
                        "px-4 py-2.5 rounded-full text-sm font-medium transition-all flex items-center gap-2",
                        activeCategory === category.id
                          ? "bg-background text-foreground shadow-sm"
                          : "bg-transparent text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {category.icon}
                      {category.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Skills grid with animation */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.5 }}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-5"
                >
                  {skills[activeCategory].map((skill, index) => (
                    <motion.div
                      key={skill.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="group relative overflow-hidden rounded-xl border border-border bg-card/80 backdrop-blur-sm p-6 hover:shadow-md transition-all duration-300"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          {skill.icon}
                        </div>
                        <div className="space-y-2">
                          <h3 className="text-lg font-semibold">{skill.name}</h3>
                          <p className="text-sm text-muted-foreground">{skill.description}</p>
                          <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((_, i) => (
                              <div
                                key={i}
                                className={`h-1.5 w-6 rounded-full ${i < skill.level ? 'bg-primary' : 'bg-muted'}`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Hover effect */}
                      <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-primary/60 via-violet-500/60 to-blue-500/60 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-in-out"></div>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>

              {/* Highlights - Show specializations */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.6 }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-card/30 border border-border/50 backdrop-blur-sm"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/20 text-primary">
                    <Shield size={24} />
                  </div>
                  <div>
                    <h4 className="text-base font-medium">En formation DevSecOps</h4>
                    <p className="text-sm text-muted-foreground">OWASP • Sécurité Web • Évaluation des risques</p>
                  </div>
                  <ChevronRight className="ml-auto h-5 w-5 text-muted-foreground" />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.7 }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-card/30 border border-border/50 backdrop-blur-sm"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-violet-500/20 text-violet-500">
                    <Zap size={24} />
                  </div>
                  <div>
                    <h4 className="text-base font-medium">Outils DevOps</h4>
                    <p className="text-sm text-muted-foreground">RabbitMQ • Prometheus • Vault • Terraform</p>
                  </div>
                  <ChevronRight className="ml-auto h-5 w-5 text-muted-foreground" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-sm text-muted-foreground">Découvrir</span>
          <div className="w-10 h-10 rounded-full flex items-center justify-center border border-primary/20 bg-background/50 backdrop-blur-sm">
            <ArrowDown size={18} className="text-primary" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}