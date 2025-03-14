"use client"

import { ProjectCard } from "@/components/project-card";
import { PageHeader } from "@/components/page-header";
import { ProjectFilter } from "@/components/portfolio/project-filter";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { LayoutGrid, List } from "lucide-react";

const projects = [
    {
        title: "Portfolio Alimenté par IA",
        description: "Portfolio Next.js avec génération de contenu pilotée par IA",
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        tags: ["Next.js", "OpenAI", "Tailwind"],
        demoUrl: "#",
        githubUrl: "salut",
    },
    {
        title: "Plateforme de Blog Créative",
        description: "Blog moderne avec contenu dynamique et animations",
        image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        tags: ["React", "MDX", "Framer Motion"],
        demoUrl: "#",
        githubUrl: "#",
    },
    {
        title: "CV Interactif",
        description: "Expérience de CV alimentée par WebGL",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        tags: ["Three.js", "GSAP", "TypeScript"],
        demoUrl: "#",
        githubUrl: "#",
    },
];

export default function PortfolioPage() {
    const [selectedTech, setSelectedTech] = useState<string[]>([]);
    const [view, setView] = useState<'grid' | 'list'>('grid');

    const filteredProjects = projects.filter(project =>
        selectedTech.length === 0 ||
        project.tags.some(tag => selectedTech.includes(tag))
    );

    return (
        <div className="flex min-h-screen flex-col">
            <PageHeader
                title="Portfolio"
                description="Découvrez mes projets et réalisations en développement web et mobile."
                gradient="from-primary/80 via-primary to-primary/60"
            />

            <motion.div className="container py-12 md:py-20 mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-12 flex flex-col items-start space-y-6"
                >
                    <div className="flex w-full items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <motion.h2
                                className="text-2xl font-semibold tracking-tight"
                                layout
                            >
                                {filteredProjects.length} {filteredProjects.length === 1 ? 'Projet' : 'Projets'}
                                {selectedTech.length > 0 && (
                                    <span className="text-muted-foreground">
                                        {' '}Filtrés
                                    </span>
                                )}
                            </motion.h2>
                            <div className="hidden md:flex items-center gap-1 border rounded-lg">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className={view === 'grid' ? 'bg-muted' : ''}
                                    onClick={() => setView('grid')}
                                >
                                    <LayoutGrid className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className={view === 'list' ? 'bg-muted' : ''}
                                    onClick={() => setView('list')}
                                >
                                    <List className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            <ProjectFilter
                                selectedTech={selectedTech}
                                onFilterChange={setSelectedTech}
                            />
                        </motion.div>
                    </div>
                    {selectedTech.length > 0 && (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-sm text-muted-foreground"
                        >
                            Affichage des projets utilisant : {selectedTech.join(', ')}
                        </motion.p>
                    )}
                </motion.div>

                <div className={`grid gap-8 ${view === 'grid'
                    ? 'md:grid-cols-2 lg:grid-cols-3'
                    : 'grid-cols-1 max-w-3xl mx-auto'
                    }`}>
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project, index) => (
                            <motion.div
                                key={project.title}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                transition={{
                                    duration: 0.3,
                                    delay: index * 0.1,
                                    layout: { duration: 0.3 }
                                }}
                            >
                                <ProjectCard
                                    project={project}
                                    index={index}
                                    variant={view}
                                />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {filteredProjects.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-12 text-center"
                    >
                        <p className="text-muted-foreground">
                            Aucun projet ne correspond aux filtres sélectionnés.
                        </p>
                        <motion.button
                            onClick={() => setSelectedTech([])}
                            className="mt-4 text-primary hover:underline"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Réinitialiser les filtres
                        </motion.button>
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
}