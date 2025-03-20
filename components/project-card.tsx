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
                return 'bg-blue-500 text-white';
            case 'terminé':
                return 'bg-green-500 text-white';
            case 'en maintenance':
                return 'bg-amber-500 text-white';
            case 'planifié':
                return 'bg-purple-500 text-white';
            case 'abandonné':
                return 'bg-gray-500 text-white';
            default:
                return 'bg-gray-700 text-white';
        }
    }

    const delay = index * 0.1

    return variant === 'grid' ? (
        <motion.div
            className="group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-card shadow-sm transition-all hover:shadow-md"
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
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
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {project.status && (
                    <div className={`absolute top-2 right-2 px-2 py-1 rounded-md text-xs font-medium ${getStatusColor(project.status)}`}>
                        {project.status}
                    </div>
                )}
            </div>
            <div className="flex flex-1 flex-col justify-between p-6">
                <div>
                    <h3 className="text-xl font-semibold tracking-tight">{project.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
                        {project.description}
                    </p>
                </div>
                <div className="mt-6">
                    <div className="mb-4 flex flex-wrap gap-2">
                        {project.tags.map((tag) => {
                            const normalizedTag = getNormalizedTag(tag)
                            return (
                                <span
                                    key={normalizedTag.name}
                                    className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/20"                                >
                                    {normalizedTag.name}
                                </span>
                            )
                        })}
                    </div>
                    <div className="flex gap-2">
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