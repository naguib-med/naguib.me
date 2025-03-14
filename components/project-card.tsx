"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

interface ProjectCardProps {
    project: {
        title: string;
        description: string;
        image: string;
        tags: string[];
        demoUrl: string;
        githubUrl: string;
    };
    index?: number;
    variant?: 'grid' | 'list';
}

export function ProjectCard({ project, index = 0, variant = 'grid' }: ProjectCardProps) {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{
                duration: 0.3,
                delay: index * 0.1,
            }}
            className="group relative"
        >
            <div className="overflow-hidden rounded-2xl bg-card border border-border/50 hover:border-border transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
                <div className={`relative overflow-hidden ${variant === 'grid' ? 'aspect-[16/9]' : 'aspect-[4/3] w-48 shrink-0'}`}>
                    <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </div>

                <div className={`p-6 ${variant === 'list' ? 'flex-1' : ''}`}>
                    {/* Title */}
                    <h3 className="text-xl font-semibold leading-tight group-hover:text-primary transition-colors duration-300">
                        {project.title}
                    </h3>

                    {/* Description */}
                    <p className={`mt-3 text-muted-foreground ${variant === 'grid' ? 'line-clamp-2' : ''} text-sm leading-relaxed`}>
                        {project.description}
                    </p>

                    {/* Tags */}
                    <div className="mt-4 flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                            <span
                                key={tag}
                                className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/20"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* Links */}
                    <div className="mt-6 flex gap-4 border-t border-border/20 pt-4">
                        <Link
                            href={project.demoUrl}
                            className="group/link flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                        >
                            <ExternalLink className="h-4 w-4 transition-transform group-hover/link:scale-110" />
                            Demo
                        </Link>
                        <Link
                            href={project.githubUrl}
                            className="group/link flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                        >
                            <Github className="h-4 w-4 transition-transform group-hover/link:scale-110" />
                            Code
                        </Link>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}