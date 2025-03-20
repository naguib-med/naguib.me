"use client"

import { ProjectCard } from "@/components/project-card";
import { PageHeader } from "@/components/page-header";
import { ProjectFilter } from "@/components/portfolio/project-filter";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { LayoutGrid, List, Clock } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuCheckboxItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Tag, Project } from "@/lib/types";
import { projects } from "@/lib/constants";

const getAllTechnologies = (projects: Project[]): string[] => {
    const techSet = new Set<string>();
    projects.forEach(project => {
        project.tags.forEach(tag => {
            if (typeof tag === 'string') {
                techSet.add(tag);
            } else if (tag.name) {
                techSet.add(tag.name);
            }
        });
    });
    return Array.from(techSet).sort();
};

export default function PortfolioPage() {
    const [selectedTech, setSelectedTech] = useState<string[]>([]);
    const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
    const [view, setView] = useState<'grid' | 'list'>('grid');

    // Ajouter des types aux paramètres
    const normalizeTags = (tags: Tag[]): string[] => {
        return tags.map(tag => typeof tag === 'string' ? tag : tag.name);
    };

    const filteredProjects = projects.filter(project => {
        const projectTags = normalizeTags(project.tags);

        // Filtrage par technologie
        const techMatch = selectedTech.length === 0 ||
            selectedTech.some(tech => projectTags.includes(tech));

        // Filtrage par statut
        const statusMatch = selectedStatus.length === 0 ||
            (project.status && selectedStatus.includes(project.status));

        return techMatch && statusMatch;
    });

    const allTechnologies = getAllTechnologies(projects);

    // Extraire tous les statuts uniques - ajouter un type de retour
    const getAllStatuses = (): string[] => {
        const statusSet = new Set<string>();
        projects.forEach(project => {
            if (project.status) {
                statusSet.add(project.status);
            }
        });
        return Array.from(statusSet).sort();
    };

    const allStatuses = getAllStatuses();

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
                        <div className="flex items-center gap-2">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.2 }}
                            >
                                <ProjectFilter
                                    selectedTech={selectedTech}
                                    onFilterChange={setSelectedTech}
                                    allTechnologies={allTechnologies}
                                />
                            </motion.div>

                            {/* Filtrage par statut */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.3 }}
                            >
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" size="sm" className="h-8 border-dashed">
                                            <Clock className="mr-2 h-4 w-4" />
                                            Statut
                                            {selectedStatus.length > 0 && (
                                                <span className="ml-1 rounded-full bg-primary text-primary-foreground px-1 text-xs">
                                                    {selectedStatus.length}
                                                </span>
                                            )}
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-[200px]">
                                        <DropdownMenuLabel>Filtrer par statut</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        {allStatuses.map(status => (
                                            <DropdownMenuCheckboxItem
                                                key={status}
                                                checked={selectedStatus.includes(status)}
                                                onCheckedChange={() => {
                                                    setSelectedStatus(prev =>
                                                        prev.includes(status)
                                                            ? prev.filter(s => s !== status)
                                                            : [...prev, status]
                                                    );
                                                }}
                                            >
                                                {status}
                                            </DropdownMenuCheckboxItem>
                                        ))}
                                        {selectedStatus.length > 0 && (
                                            <>
                                                <DropdownMenuSeparator />
                                                <div className="p-1">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="w-full justify-center text-xs"
                                                        onClick={() => setSelectedStatus([])}
                                                    >
                                                        Réinitialiser les filtres
                                                    </Button>
                                                </div>
                                            </>
                                        )}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </motion.div>
                        </div>
                    </div>
                    {(selectedTech.length > 0 || selectedStatus.length > 0) && (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-sm text-muted-foreground"
                        >
                            {selectedTech.length > 0 && (
                                <span>Technologies : {selectedTech.join(', ')}</span>
                            )}
                            {selectedTech.length > 0 && selectedStatus.length > 0 && <span> | </span>}
                            {selectedStatus.length > 0 && (
                                <span>Statut : {selectedStatus.join(', ')}</span>
                            )}
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
                            onClick={() => {
                                setSelectedTech([]);
                                setSelectedStatus([]);
                            }}
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