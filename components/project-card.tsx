"use client"

import Image from "next/image"
import { StaticImageData } from "next/image"
import { motion } from "framer-motion"
import { ExternalLink, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tag, Project } from "@/lib/types";

interface ProjectCardProps {
    project: Project
    index: number
    variant: 'grid' | 'list'
}

export function ProjectCard({ project, index, variant = 'grid' }: ProjectCardProps) {
    const getNormalizedTag = (tag: Tag) => {
        if (typeof tag === 'string') {
            return { name: tag }
        }
        return { name: tag.name }
    }

    const getImageSrc = (image: string | StaticImageData | null | undefined) => {
        if (!image) {
            return '/api/placeholder/400/320';
        }

        if (typeof image === 'string' && image.startsWith('http')) {
            return image;
        }

        return image;
    }

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'en cours':
                return 'bg-warning/90 text-white border-2 border-warning';
            case 'terminé':
                return 'bg-success/90 text-white border-2 border-success';
            case 'en maintenance':
                return 'bg-accent/90 text-white border-2 border-accent';
            case 'planifié':
                return 'bg-primary/90 text-white border-2 border-primary';
            case 'abandonné':
                return 'bg-muted text-muted-foreground border-2 border-border';
            default:
                return 'bg-secondary/90 text-white border-2 border-secondary';
        }
    }

    const delay = index * 0.1

    return variant === 'grid' ? (
        <motion.div
            className="group relative flex h-full flex-col overflow-hidden rounded-2xl border-2 border-border bg-card shadow-sm transition-all hover:shadow-xl hover:shadow-primary/10 hover:border-primary/30 cyber-border"
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay }}
        >
            <div className="relative aspect-video overflow-hidden">
                <Image
                    src={getImageSrc(project.image)}
                    alt={project.title}
                    width={400}
                    height={225}
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {project.status && (
                    <div className={`absolute top-3 right-3 px-3 py-1.5 rounded-xl text-xs font-bold shadow-lg ${getStatusColor(project.status)}`}>
                        {project.status}
                    </div>
                )}
                {project.isRecent && (
                    <div className="absolute top-3 left-3 px-3 py-1.5 rounded-xl text-xs font-bold bg-accent text-white border-2 border-accent shadow-lg">
                        ⭐ Récent
                    </div>
                )}
            </div>
            <div className="flex flex-1 flex-col justify-between p-6">
                <div>
                    <h3 className="text-xl font-bold tracking-tight group-hover:text-primary transition-colors duration-300">{project.title}</h3>
                    <p className="mt-3 text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                        {project.description}
                    </p>
                </div>
                <div className="mt-6 space-y-4">
                    <div className="flex flex-wrap gap-2">
                        {project.tags.slice(0, 4).map((tag) => {
                            const normalizedTag = getNormalizedTag(tag)
                            return (
                                <span
                                    key={normalizedTag.name}
                                    className="inline-flex items-center rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary border border-primary/20 hover:bg-primary/20 transition-colors"
                                >
                                    {normalizedTag.name}
                                </span>
                            )
                        })}
                        {project.tags.length > 4 && (
                            <span className="inline-flex items-center rounded-lg bg-muted px-3 py-1.5 text-xs font-semibold text-muted-foreground">
                                +{project.tags.length - 4}
                            </span>
                        )}
                    </div>
                    <div className="flex gap-3">
                        {project.githubUrl && (
                            <Button asChild size="sm" variant="outline" className="flex-1 rounded-xl border-2 hover:border-primary hover:bg-primary/5 transition-all">
                                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                                    <Github className="mr-2 h-4 w-4" />
                                    Code
                                </a>
                            </Button>
                        )}
                        {project.demoUrl && (
                            <Button asChild size="sm" className="flex-1 rounded-xl bg-gradient-to-r from-primary to-accent border-0 hover:scale-105 transition-all">
                                <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                                    <ExternalLink className="mr-2 h-4 w-4" />
                                    Demo
                                </a>
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    ) : (
        <motion.div
            className="relative flex flex-col md:flex-row gap-6 rounded-lg border bg-card p-6 shadow-sm hover:shadow-md transition-all"
            whileHover={{ y: -2, transition: { duration: 0.2 } }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay }}
        >
            <div className="relative w-full md:w-1/3 aspect-video rounded-md overflow-hidden">
                <Image
                    src={getImageSrc(project.image)}
                    alt={project.title}
                    fill
                    className="object-cover"
                />
                {project.status && (
                    <div className={`absolute top-2 right-2 px-2 py-1 rounded-md text-xs font-medium ${getStatusColor(project.status)}`}>
                        {project.status}
                    </div>
                )}
            </div>
            <div className="flex-1 flex flex-col">
                <h3 className="text-xl font-semibold tracking-tight">{project.title}</h3>
                <p className="mt-2 text-muted-foreground">
                    {project.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                    {project.tags.map((tag) => {
                        const normalizedTag = getNormalizedTag(tag)
                        return (
                            <span
                                key={normalizedTag.name}
                                className="inline-flex items-center rounded-md bg-primary/10 text-primary px-2 py-0.5 text-xs font-medium"
                            >
                                {normalizedTag.name}
                            </span>
                        )
                    })}
                </div>
                <div className="mt-auto pt-6 flex gap-2">
                    {project.githubUrl && (
                        <Button asChild size="sm" variant="outline">
                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                <Github className="mr-2 h-4 w-4" />
                                Code
                            </a>
                        </Button>
                    )}
                    {project.demoUrl && (
                        <Button asChild size="sm" variant="outline">
                            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="mr-2 h-4 w-4" />
                                Demo
                            </a>
                        </Button>
                    )}
                </div>
            </div>
        </motion.div>
    )
}