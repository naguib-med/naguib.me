"use client"

import * as React from "react"
import { Filter, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

interface ProjectFilterProps {
    selectedTech: string[]
    onFilterChange: (techs: string[]) => void
    allTechnologies?: string[]
}

export function ProjectFilter({
    selectedTech,
    onFilterChange,
    allTechnologies = [
        "React",
        "Next.js",
        "TypeScript",
        "Node.js",
        "Python",
        "MongoDB",
        "PostgreSQL",
        "Tailwind",
        "OpenAI",
        "Three.js",
        "GSAP",
        "Framer Motion",
    ]
}: ProjectFilterProps) {
    return (
        <div className="flex flex-wrap items-center gap-2">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                        <Filter className="mr-2 h-4 w-4" />
                        Filter Technologies
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48">
                    <DropdownMenuLabel>Technologies</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {allTechnologies.map((tech) => (
                        <DropdownMenuCheckboxItem
                            key={tech}
                            checked={selectedTech.includes(tech)}
                            onCheckedChange={(checked) => {
                                onFilterChange(
                                    checked
                                        ? [...selectedTech, tech]
                                        : selectedTech.filter((t) => t !== tech)
                                )
                            }}
                        >
                            {tech}
                        </DropdownMenuCheckboxItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>

            {selectedTech.length > 0 && (
                <>
                    {selectedTech.map((tech) => (
                        <Badge
                            key={tech}
                            variant="secondary"
                            className="gap-1 px-3 py-1"
                        >
                            {tech}
                            <button
                                onClick={() => onFilterChange(selectedTech.filter(t => t !== tech))}
                                className="ml-1 rounded-full hover:bg-secondary"
                            >
                                <X className="h-3 w-3" />
                            </button>
                        </Badge>
                    ))}
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onFilterChange([])}
                        className="h-7 px-3 text-sm"
                    >
                        Clear all
                    </Button>
                </>
            )}
        </div>
    )
}