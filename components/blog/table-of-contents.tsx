// components/blog/table-of-contents.tsx
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { List } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TOCItem {
    id: string;
    text: string;
    level: number;
}

export function TableOfContents() {
    const [headings, setHeadings] = useState<TOCItem[]>([]);
    const [activeId, setActiveId] = useState<string>("");
    const [isOpen, setIsOpen] = useState<boolean>(false);

    useEffect(() => {
        // Récupérer tous les titres h2 et h3
        const elements = Array.from(document.querySelectorAll("h2, h3"))
            .filter((element) => element.id) // Seulement ceux avec un ID
            .map((element) => ({
                id: element.id,
                text: element.textContent || "",
                level: element.tagName === "H2" ? 2 : 3,
            }));

        setHeadings(elements);

        // Observer l'intersection pour mettre en évidence le titre actif
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && entry.target.id) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: "-80px 0px -80% 0px" }
        );

        elements.forEach((heading) => {
            const element = document.getElementById(heading.id);
            if (element) {
                observer.observe(element);
            }
        });

        return () => {
            elements.forEach((heading) => {
                const element = document.getElementById(heading.id);
                if (element) {
                    observer.unobserve(element);
                }
            });
        };
    }, []);

    // Ne pas afficher si pas assez de titres
    if (headings.length < 2) {
        return null;
    }

    return (
        <div className="relative mb-8">
            <div className="md:hidden flex justify-center mb-4">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center gap-2"
                >
                    <List className="h-4 w-4" />
                    {isOpen ? "Masquer le sommaire" : "Afficher le sommaire"}
                </Button>
            </div>

            <motion.div
                className="bg-muted/50 rounded-lg p-4 mb-8 md:block"
                initial={{ height: 0, opacity: 0 }}
                animate={{
                    height: isOpen || window.innerWidth >= 768 ? "auto" : 0,
                    opacity: isOpen || window.innerWidth >= 768 ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
            >
                <h4 className="text-sm font-medium mb-2">Sommaire</h4>
                <nav>
                    <ul className="space-y-1 text-sm">
                        {headings.map((heading) => (
                            <li
                                key={heading.id}
                                style={{
                                    paddingLeft: heading.level === 3 ? "1rem" : 0,
                                }}
                            >
                                <a
                                    href={`#${heading.id}`}
                                    className={`block py-1 transition-colors hover:text-primary ${activeId === heading.id
                                        ? "text-primary font-medium"
                                        : "text-muted-foreground"
                                        }`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        document.getElementById(heading.id)?.scrollIntoView({
                                            behavior: "smooth",
                                        });
                                        setIsOpen(false);
                                    }}
                                >
                                    {heading.text}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </motion.div>
        </div>
    );
}