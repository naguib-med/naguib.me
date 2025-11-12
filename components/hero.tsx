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
      {/* Subtle gradient overlays */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 h-[600px] w-[800px] rounded-full bg-primary/3 blur-[150px]" />
        <div className="absolute bottom-1/4 right-0 h-[500px] w-[700px] rounded-full bg-secondary/3 blur-[130px]" />
        <div className="absolute top-1/2 left-0 h-[400px] w-[600px] rounded-full bg-accent/2 blur-[120px]" />
      </div>

      {/* Grid pattern - more subtle */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.015]" />

      {/* Interactive cursor effect - more subtle */}
      <div
        className="fixed inset-0 z-10 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at ${cursorPosition.x}px ${cursorPosition.y}px, rgba(59, 130, 246, 0.04), transparent 50%)`
        }}
      />

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
                    <div className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-primary/10 to-secondary/10 backdrop-blur-md border border-primary/20 rounded-full">
                      <Shield size={16} className="text-primary" />
                      <span className="text-sm font-medium text-foreground">
                        Dev & Cybersécurité
                      </span>
                      <div className="h-4 w-px bg-border mx-1" />
                      <Code size={16} className="text-secondary" />
                      <span className="text-sm font-medium text-muted-foreground">
                        DevSecOps
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
                      <span className="block text-foreground">Développeur Fullstack</span>
                      <div className="relative mt-3 flex flex-col sm:flex-row gap-2 sm:gap-3 items-start">
                        <span className="relative z-10 inline-block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                          & Cybersécurité
                        </span>
                        <div className="hidden sm:block text-muted-foreground">•</div>
                        <span className="relative z-10 inline-block bg-gradient-to-r from-accent to-orange-500 bg-clip-text text-transparent">
                          DevSecOps
                        </span>
                      </div>
                    </h1>

                    <p className="text-lg text-muted-foreground leading-relaxed">
                      Ingénieur spécialisé dans le développement d&apos;applications web sécurisées
                      et performantes. J&apos;intègre les principes de sécurité dès la conception
                      pour créer des solutions robustes et fiables.
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
                      { value: "3+", label: "Années", sublabel: "d'expérience" },
                      { value: "30+", label: "Projets", sublabel: "réalisés" },
                      { value: "Dev+Sec", label: "Double", sublabel: "expertise" },
                    ].map((stat, index) => (
                      <div key={index} className="space-y-1">
                        <div className="text-2xl lg:text-3xl font-bold bg-gradient-to-br from-foreground to-foreground/60 bg-clip-text text-transparent">{stat.value}</div>
                        <div className="text-sm font-medium text-foreground/80">{stat.label}</div>
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
                    transition={{ duration: 0.7, delay: 0.3 }}
                    className="flex flex-col sm:flex-row gap-4 mb-8"
                  >
                    <Button
                      onClick={handlePortfolioClick}
                      className="relative h-12 md:h-14 px-6 md:px-8 rounded-xl overflow-hidden group shadow-lg shadow-primary/20"
                    >
                      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_100%] group-hover:bg-[position:100%_0] transition-all duration-700"></span>
                      <span className="relative flex items-center justify-center gap-2 text-primary-foreground">
                        <span>Voir mon Portfolio</span>
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </Button>

                    <Button
                      variant="outline"
                      onClick={handleBlogClick}
                      className="h-12 md:h-14 px-6 md:px-8 rounded-xl border-2 border-border hover:border-primary hover:bg-primary/5 transition-all duration-300"
                    >
                      <span className="flex items-center justify-center gap-2">
                        <span>Lire mon Blog</span>
                        <Newspaper className="h-4 w-4" />
                      </span>
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Education Badge - Updated Design */}
              <AnimatePresence>
                {isLoaded && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.4 }}
                    className="flex items-center gap-4 p-4 mb-6 rounded-xl bg-gradient-to-br from-primary/5 via-secondary/5 to-transparent border border-border/50 backdrop-blur-sm hover:border-primary/30 transition-all duration-300"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 text-primary">
                      <Award size={24} />
                    </div>
                    <div>
                      <h4 className="text-base font-semibold text-foreground">Master 2 TIW</h4>
                      <p className="text-sm text-muted-foreground">Technologies de l&apos;Information et Web - Lyon 1</p>
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
                        className="group flex items-center justify-center w-11 h-11 rounded-xl border-2 border-border bg-background/50 backdrop-blur-sm hover:border-primary hover:bg-primary/5 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300"
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

            {/* Right column - Skills */}
            <motion.div
              className="lg:col-span-7 space-y-6"
            >
              {/* Tab selector - Modernized */}
              <div className="flex justify-start mb-6 overflow-x-auto pb-2">
                <div className="inline-flex p-1.5 gap-2 rounded-xl bg-muted/50 border border-border/50 backdrop-blur-sm">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id as CategoryId)}
                      className={cn(
                        "px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 flex items-center gap-2",
                        activeCategory === category.id
                          ? "bg-background text-foreground shadow-md shadow-primary/10 border border-border"
                          : "bg-transparent text-muted-foreground hover:text-foreground hover:bg-background/50"
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
                      className="group relative overflow-hidden rounded-2xl border-2 border-border bg-card/50 backdrop-blur-sm p-6 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 text-primary border border-primary/20">
                          {skill.icon}
                        </div>
                        <div className="space-y-2.5 flex-1">
                          <h3 className="text-lg font-bold text-foreground">{skill.name}</h3>
                          <p className="text-sm text-muted-foreground leading-relaxed">{skill.description}</p>
                          <div className="flex gap-1.5 pt-1">
                            {[1, 2, 3, 4, 5].map((_, i) => (
                              <div
                                key={i}
                                className={`h-2 w-8 rounded-full transition-all duration-300 ${i < skill.level
                                    ? 'bg-gradient-to-r from-primary to-secondary shadow-sm'
                                    : 'bg-muted'
                                  }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Hover effect */}
                      <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_100%] transform scale-x-0 group-hover:scale-x-100 group-hover:bg-[position:100%_0] transition-all duration-700 origin-left"></div>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>

              {/* Highlights - Modernized cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.6 }}
                  className="flex items-center gap-4 p-5 rounded-2xl bg-gradient-to-br from-accent/5 via-orange-500/5 to-transparent border-2 border-border hover:border-accent/30 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-accent/10 group cursor-pointer"
                >
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-accent/20 to-orange-500/20 text-accent group-hover:scale-110 transition-transform duration-300">
                    <Shield size={26} />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-base font-bold text-foreground mb-1">Expertise DevSecOps</h4>
                    <p className="text-sm text-muted-foreground">OWASP • Sécurité Web • Évaluation des risques</p>
                  </div>
                  <ChevronRight className="ml-auto h-5 w-5 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all duration-300" />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.7 }}
                  className="flex items-center gap-4 p-5 rounded-2xl bg-gradient-to-br from-primary/5 via-secondary/5 to-transparent border-2 border-border hover:border-primary/30 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 group cursor-pointer"
                >
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 text-primary group-hover:scale-110 transition-transform duration-300">
                    <Zap size={26} />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-base font-bold text-foreground mb-1">Stack DevOps</h4>
                    <p className="text-sm text-muted-foreground">Docker • K8s • Terraform • CI/CD</p>
                  </div>
                  <ChevronRight className="ml-auto h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" />
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