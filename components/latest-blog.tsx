"use client";

import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef } from "react";
import { 
  ArrowRight, 
  Newspaper, 
  Code, 
  Brain, 
  Layers,
  Calendar,
  Clock
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/magnetic-button";

function useParallax(value: MotionValue<number>, distance: number) {
  return useTransform(value, [0, 1], [-distance, distance]);
}

const blogPosts = [
  {
    title: "L'Art de l'Architecture Frontale Évolutive",
    excerpt: "Concevoir des applications web modulaires et performantes qui grandissent avec vos ambitions.",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Architecture",
    date: "15 mars 2024",
    readTime: "7 min de lecture",
    link: "/blog/frontend-architecture",
    mainIcon: Code
  },
  {
    title: "Flux de Travail de Développement Piloté par l'IA",
    excerpt: "Révolutionner l'ingénierie logicielle avec des outils et des pratiques de développement intelligents.",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "IA & Productivité",
    date: "12 mars 2024",
    readTime: "6 min de lecture",
    link: "/blog/ai-dev-workflows",
    mainIcon: Brain
  },
  {
    title: "Next.js 14 : Exploration en Profondeur des Composants Serveur",
    excerpt: "Explorer le pouvoir transformateur du rendu côté serveur et de l'architecture des composants.",
    image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Développement Web",
    date: "10 mars 2024",
    readTime: "8 min de lecture",
    link: "/blog/nextjs-server-components",
    mainIcon: Layers
  }
];

export default function LatestBlog() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useParallax(scrollYProgress, 50);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0, 1, 0]
  );

  return (
    <motion.section 
      ref={ref}
      style={{ opacity }}
      className="relative overflow-hidden py-24 sm:py-32"
    >
      <div className="absolute inset-0 bg-grid-pattern bg-grid" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/60 to-background/30" />

      <motion.div 
        style={{ y }}
        className="container relative space-y-12"
      >
        <div className="mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-primary"
          >
            <Newspaper className="h-4 w-4" />
            Articles Récents
          </motion.div>

          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl"
          >
            Mes Réflexions Techniques
          </motion.h2>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-muted-foreground"
          >
            Explorations et perspectives sur les dernières tendances en développement web et technologies émergentes.
          </motion.p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.title}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                type: "spring",
                stiffness: 100 
              }}
              className="group perspective-1000"
            >
              <motion.div
                whileHover={{ 
                  scale: 1.05,
                  rotateX: 5,
                  rotateY: -5,
                  transition: { duration: 0.3 }
                }}
                className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-background/10 to-background/5 border border-transparent transition-all duration-300 hover:border-primary/30 shadow-xl hover:shadow-2xl"
              >
                <Link href={post.link} className="block">
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
                  </div>

                  <div className="p-6 space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="p-2 bg-primary/10 rounded-full">
                          <post.mainIcon className="h-4 w-4 text-primary" />
                        </div>
                        <span className="text-xs font-medium rounded-full bg-primary/10 text-primary px-3 py-1 transition-colors group-hover:bg-primary/20">
                          {post.category}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="h-3 w-3 mr-1" />
                        <span className="text-sm">
                          {post.readTime}
                        </span>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold mb-2 transition-colors group-hover:text-primary">
                        {post.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-3 group-hover:text-foreground/80 transition-colors">
                        {post.excerpt}
                      </p>
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t border-border/20">
                      <span className="text-sm text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-3 w-3 mr-1" />
                        {post.date}
                      </span>
                      <div className="flex items-center text-primary hover:text-primary/80 transition-colors">
                        <span className="text-sm font-medium mr-2 group-hover:translate-x-1 transition-transform">Lire la suite</span>
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <MagneticButton>
            <Button
              variant="outline"
              size="lg"
              className="group relative h-12 overflow-hidden rounded-full border-primary/20 px-8"
            >
              <span className="relative z-10 flex items-center gap-2">
                Voir Tous les Articles
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
              <motion.div
                className="absolute inset-0 z-0 bg-primary/10"
                initial={false}
                whileHover={{ scale: 1.5 }}
                transition={{ duration: 0.3 }}
              />
            </Button>
          </MagneticButton>
        </div>
      </motion.div>
    </motion.section>
  );
}