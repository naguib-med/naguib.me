"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, Calendar, ExternalLink, Filter, Grid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/page-header";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuCheckboxItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import certification_html_css from "@/public/certification/certification_html_css.jpg";
import certifcation_javascript from "@/public/certification/certification_javascript.jpg";
import certification_react from "@/public/certification/certification_react.jpg";
import certification_typescript from "@/public/certification/certification_typescript.jpg";
import essentiel_angular from "@/public/certification/essentiel_angular.jpeg";
import formation_complete_pour_devenir_fullstack from "@/public/certification/formation_complete_pour_devenir_fullstack.jpg";
import intelligence_artificielle_az from "@/public/certification/intelligence_artificielle_az.jpg";
import developpeur_web from "@/public/certification/developpeur_web.jpg";

import { StaticImageData } from "next/image";
import Image from "next/image";

type CertificationType = {
    title: string;
    issuer: string;
    date: string;
    expirationDate?: string;
    credentialId?: string;
    credentialUrl?: string;
    description?: string;
    skills?: string[];
    image?: StaticImageData | string;
    category: string;
};

const certifications: CertificationType[] = [
    {
        title: "L'essentiel d'Angular",
        issuer: "LinkedIn",
        date: "Juillet 2024",
        credentialId: "LINKEDIN-ANGULAR-2024",
        credentialUrl: "https://www.linkedin.com/learning/certificates/29f2beb5e2e61737e28c5250c97db7670b24e88330c87d02b55391ccd995c977",
        description: "Formation sur les fondamentaux d'Angular, incluant la création de composants, la gestion d'état et le routage.",
        skills: ["AngularJS", "TypeScript", "Développement Frontend", "SPA"],
        image: essentiel_angular,
        category: "Développement Frontend"
    },
    {
        title: "UI/UX Design Certificate",
        issuer: "Creative Tim",
        date: "Septembre 2023",
        credentialId: "62f21f0fe4453659190ea081",
        credentialUrl: "https://www.creative-tim.com/certificate/verify",
        description: "Certification en conception d'interfaces et d'expériences utilisateur, centrée sur les meilleures pratiques et méthodologies modernes.",
        skills: ["Feuilles de style en cascade (CSS)", "Design d'expérience utilisateur (UX)", "Design d'interface utilisateur", "Tailwind CSS"],
        image: "/images/certifications/ui-ux-creative-tim.png",
        category: "Design"
    },
    {
        title: "Typescript V4.7",
        issuer: "Dyma",
        date: "Septembre 2022",
        credentialId: "DYMA-TS-2022",
        credentialUrl: "https://dyma.fr/certification/5f0a04d33a54f71cb79cda24/5ec44a260e320871af33ecaa",
        description: "Formation approfondie sur TypeScript 4.7, couvrant le typage avancé, les génériques, et l'intégration avec JavaScript.",
        skills: ["TypeScript", "JavaScript", "Typage statique", "Types avancés"],
        image: certification_typescript,
        category: "Langages de programmation"
    },
    {
        title: "HTML5 & CSS3",
        issuer: "Dyma",
        date: "Août 2022",
        credentialId: "DYMA-HTML-CSS-2022",
        credentialUrl: "https://dyma.fr/certification/5f0a04d33a54f71cb79cda24/5dab7f032482b13eb493df12",
        description: "Formation complète sur HTML5 et CSS3, couvrant la création de sites web modernes, responsives et accessibles.",
        skills: ["HTML5", "CSS3", "Responsive Design", "Web sémantique"],
        image: certification_html_css,
        category: "Développement Frontend"
    },
    {
        title: "JavaScript V9",
        issuer: "Dyma",
        date: "Août 2022",
        credentialId: "DYMA-JS-2022",
        credentialUrl: "https://dyma.fr/certification/5f0a04d33a54f71cb79cda24/5de1a78332cf6b3128beee34",
        description: "Formation avancée sur JavaScript V9, incluant les fonctionnalités ES6+, les promesses, async/await, et les concepts fondamentaux.",
        skills: ["JavaScript", "ES6+", "Asynchrone", "DOM", "APIs Web"],
        image: certifcation_javascript,
        category: "Langages de programmation"
    },
    {
        title: "React18",
        issuer: "Dyma",
        date: "Juillet 2022",
        credentialId: "DYMA-REACT-2022",
        credentialUrl: "https://dyma.fr/certification/5f0a04d33a54f71cb79cda24/628e08287436c6ee0c1480b9",
        description: "Formation complète sur React 18, couvrant les hooks, le context API, la gestion d'état, et la création d'applications performantes.",
        skills: ["React.js", "Hooks", "JSX", "État et Cycle de vie", "Composants"],
        image: certification_react,
        category: "Développement Frontend"
    },
    {
        title: "FORMATION COMPLETE POUR DEVENIR FULL-STACK",
        issuer: "Udemy",
        date: "Janvier 2021",
        credentialId: "UDEMY-FULLSTACK-2021",
        credentialUrl: "https://www.udemy.com/certificate/UC-bcd6f456-5fd1-4d69-8f1b-a9b4e8513b8e/",
        description: "Formation complète couvrant le développement web full-stack, de la conception front-end à l'implémentation back-end et à la gestion de bases de données.",
        skills: ["JavaScript", "HTML/CSS", "Node.js", "SQL", "MongoDB", "Express"],
        image: formation_complete_pour_devenir_fullstack,
        category: "Développement Full-Stack"
    },
    {
        title: "Intelligence Artificielle de A à Z",
        issuer: "Udemy",
        date: "Janvier 2021",
        credentialId: "UDEMY-AI-2021",
        credentialUrl: "https://www.udemy.com/certificate/UC-e660ce8c-ec08-458f-94f7-585286896bba/",
        description: "Formation sur les fondamentaux de l'intelligence artificielle, incluant le machine learning, les réseaux de neurones et les applications pratiques.",
        skills: ["Intelligence Artificielle", "Machine Learning", "Deep Learning", "Data Science"],
        image: intelligence_artificielle_az,
        category: "Intelligence Artificielle"
    },
    {
        title: "Développeur Web",
        issuer: "Udemy",
        date: "2020",
        credentialId: "UDEMY-WEBDEV-2020",
        credentialUrl: "https://www.udemy.com/certificate/UC-1a5601e4-1b5b-4b56-b09f-eb15c2a20dd2/",
        description: "Formation complète sur les technologies et méthodologies du développement web moderne.",
        skills: ["JavaScript", "HTML", "CSS", "Responsive Design", "APIs Web"],
        image: developpeur_web,
        category: "Développement Frontend"
    }
];

// Extraire toutes les catégories
const getAllCategories = (): string[] => {
    const categoriesSet = new Set<string>();
    certifications.forEach(cert => {
        if (cert.category) {
            categoriesSet.add(cert.category);
        }
    });
    return Array.from(categoriesSet).sort();
};

// Extraire tous les émetteurs
const getAllIssuers = (): string[] => {
    const issuersSet = new Set<string>();
    certifications.forEach(cert => {
        if (cert.issuer) {
            issuersSet.add(cert.issuer);
        }
    });
    return Array.from(issuersSet).sort();
};

export default function CertificationsPage() {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedIssuers, setSelectedIssuers] = useState<string[]>([]);
    const [view, setView] = useState<'grid' | 'list'>('grid');

    const filteredCertifications = certifications.filter(cert => {
        // Filtrage par catégorie
        const categoryMatch = selectedCategories.length === 0 ||
            (cert.category && selectedCategories.includes(cert.category));

        // Filtrage par émetteur
        const issuerMatch = selectedIssuers.length === 0 ||
            selectedIssuers.includes(cert.issuer);

        return categoryMatch && issuerMatch;
    });

    const allCategories = getAllCategories();
    const allIssuers = getAllIssuers();

    return (
        <div className="flex min-h-screen flex-col">
            <PageHeader
                title="Certifications"
                description="Mes qualifications professionnelles et certifications techniques."
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
                                {filteredCertifications.length} {filteredCertifications.length === 1 ? 'Certification' : 'Certifications'}
                                {(selectedCategories.length > 0 || selectedIssuers.length > 0) && (
                                    <span className="text-muted-foreground">
                                        {' '}Filtrées
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
                                    <Grid className="h-4 w-4" />
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
                            {/* Filtrage par catégorie */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.2 }}
                            >
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" size="sm" className="h-8 border-dashed">
                                            <Filter className="mr-2 h-4 w-4" />
                                            Catégorie
                                            {selectedCategories.length > 0 && (
                                                <span className="ml-1 rounded-full bg-primary text-primary-foreground px-1 text-xs">
                                                    {selectedCategories.length}
                                                </span>
                                            )}
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-[200px]">
                                        <DropdownMenuLabel>Filtrer par catégorie</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        {allCategories.map(category => (
                                            <DropdownMenuCheckboxItem
                                                key={category}
                                                checked={selectedCategories.includes(category)}
                                                onCheckedChange={() => {
                                                    setSelectedCategories(prev =>
                                                        prev.includes(category)
                                                            ? prev.filter(c => c !== category)
                                                            : [...prev, category]
                                                    );
                                                }}
                                            >
                                                {category}
                                            </DropdownMenuCheckboxItem>
                                        ))}
                                        {selectedCategories.length > 0 && (
                                            <>
                                                <DropdownMenuSeparator />
                                                <div className="p-1">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="w-full justify-center text-xs"
                                                        onClick={() => setSelectedCategories([])}
                                                    >
                                                        Réinitialiser les filtres
                                                    </Button>
                                                </div>
                                            </>
                                        )}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </motion.div>

                            {/* Filtrage par émetteur */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.3 }}
                            >
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" size="sm" className="h-8 border-dashed">
                                            <Award className="mr-2 h-4 w-4" />
                                            Émetteur
                                            {selectedIssuers.length > 0 && (
                                                <span className="ml-1 rounded-full bg-primary text-primary-foreground px-1 text-xs">
                                                    {selectedIssuers.length}
                                                </span>
                                            )}
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-[200px]">
                                        <DropdownMenuLabel>Filtrer par émetteur</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        {allIssuers.map(issuer => (
                                            <DropdownMenuCheckboxItem
                                                key={issuer}
                                                checked={selectedIssuers.includes(issuer)}
                                                onCheckedChange={() => {
                                                    setSelectedIssuers(prev =>
                                                        prev.includes(issuer)
                                                            ? prev.filter(i => i !== issuer)
                                                            : [...prev, issuer]
                                                    );
                                                }}
                                            >
                                                {issuer}
                                            </DropdownMenuCheckboxItem>
                                        ))}
                                        {selectedIssuers.length > 0 && (
                                            <>
                                                <DropdownMenuSeparator />
                                                <div className="p-1">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="w-full justify-center text-xs"
                                                        onClick={() => setSelectedIssuers([])}
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
                    {(selectedCategories.length > 0 || selectedIssuers.length > 0) && (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-sm text-muted-foreground"
                        >
                            {selectedCategories.length > 0 && (
                                <span>Catégories : {selectedCategories.join(', ')}</span>
                            )}
                            {selectedCategories.length > 0 && selectedIssuers.length > 0 && <span> | </span>}
                            {selectedIssuers.length > 0 && (
                                <span>Émetteurs : {selectedIssuers.join(', ')}</span>
                            )}
                        </motion.p>
                    )}
                </motion.div>

                <div className={`grid gap-8 ${view === 'grid'
                    ? 'md:grid-cols-2 lg:grid-cols-3'
                    : 'grid-cols-1 max-w-3xl mx-auto'
                    }`}>
                    <AnimatePresence mode="popLayout">
                        {filteredCertifications.map((cert, index) => (
                            <motion.div
                                key={cert.title}
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
                                {view === 'grid' ? (
                                    <CertificationCardGrid certification={cert} />
                                ) : (
                                    <CertificationCardList certification={cert} />
                                )}
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {filteredCertifications.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-12 text-center"
                    >
                        <p className="text-muted-foreground">
                            Aucune certification ne correspond aux filtres sélectionnés.
                        </p>
                        <motion.button
                            onClick={() => {
                                setSelectedCategories([]);
                                setSelectedIssuers([]);
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

// Composant de carte pour l'affichage en grille
function CertificationCardGrid({ certification }: { certification: CertificationType }) {
    return (
        <motion.div
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="h-full group relative flex flex-col overflow-hidden rounded-2xl border bg-card shadow-sm transition-all hover:shadow-md"
        >
            {certification.image && (
                <div className="relative aspect-video overflow-hidden border-b">
                    {typeof certification.image === 'string' ? (
                        <div
                            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                            style={{ backgroundImage: `url(${certification.image})` }}
                        />
                    ) : (
                        <Image
                            src={certification.image}
                            alt={certification.title}
                            fill
                            className="object-cover"
                        />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-background/20" />
                </div>
            )}

            <div className="flex flex-1 flex-col justify-between p-6">
                <div>
                    <div className="mb-2">
                        <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/20">
                            {certification.category}
                        </span>
                    </div>
                    <h3 className="text-xl font-semibold tracking-tight group-hover:text-primary transition-colors duration-300">
                        {certification.title}
                    </h3>
                    <div className="mt-2 flex items-center text-sm text-muted-foreground">
                        <Calendar className="mr-1 h-3.5 w-3.5" />
                        {certification.date}
                        {certification.expirationDate && ` - ${certification.expirationDate}`}
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                        {certification.issuer}
                    </p>

                    {certification.description && (
                        <p className="mt-4 text-sm text-muted-foreground line-clamp-3">
                            {certification.description}
                        </p>
                    )}

                    {certification.credentialId && (
                        <div className="mt-3 text-xs text-muted-foreground">
                            <span className="font-semibold">ID:</span> {certification.credentialId}
                        </div>
                    )}
                </div>

                <div className="mt-6">
                    {certification.skills && certification.skills.length > 0 && (
                        <div className="mb-4 flex flex-wrap gap-2">
                            {certification.skills.map((skill, index) => (
                                <span
                                    key={index}
                                    className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary ring-1 ring-inset ring-primary/20"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    )}

                    {certification.credentialUrl && (
                        <Button
                            variant="outline"
                            size="sm"
                            className="w-full group/btn"
                            asChild
                        >
                            <a
                                href={certification.credentialUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center"
                            >
                                Vérifier <ExternalLink className="ml-2 h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-0.5" />
                            </a>
                        </Button>
                    )}
                </div>
            </div>
        </motion.div>
    );
}

// Composant de carte pour l'affichage en liste
function CertificationCardList({ certification }: { certification: CertificationType }) {
    return (
        <motion.div
            whileHover={{ y: -2, transition: { duration: 0.2 } }}
            className="relative flex flex-col md:flex-row gap-6 rounded-lg border bg-card p-6 shadow-sm hover:shadow-md transition-all"
        >
            {certification.image && (
                <div className="relative w-full md:w-1/4 aspect-video rounded-md overflow-hidden">
                    <div
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                        style={{ backgroundImage: `url(${certification.image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-background/20" />
                </div>
            )}

            <div className="flex-1 flex flex-col">
                <div className="flex flex-wrap gap-2 mb-2">
                    <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/20">
                        {certification.category}
                    </span>
                </div>

                <h3 className="text-xl font-semibold tracking-tight">{certification.title}</h3>

                <div className="mt-2 flex items-center text-sm text-muted-foreground">
                    <Calendar className="mr-1 h-3.5 w-3.5" />
                    {certification.date}
                    {certification.expirationDate && ` - ${certification.expirationDate}`}
                    <span className="mx-2">•</span>
                    {certification.issuer}
                </div>

                {certification.description && (
                    <p className="mt-3 text-sm text-muted-foreground">
                        {certification.description}
                    </p>
                )}

                {certification.credentialId && (
                    <div className="mt-2 text-xs text-muted-foreground">
                        <span className="font-semibold">ID:</span> {certification.credentialId}
                    </div>
                )}

                {certification.skills && certification.skills.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                        {certification.skills.map((skill, index) => (
                            <span
                                key={index}
                                className="inline-flex items-center rounded-md bg-primary/10 text-primary px-2 py-0.5 text-xs font-medium"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                )}

                {certification.credentialUrl && (
                    <div className="mt-auto pt-4">
                        <Button
                            variant="outline"
                            size="sm"
                            className="group/btn"
                            asChild
                        >
                            <a
                                href={certification.credentialUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center"
                            >
                                Vérifier <ExternalLink className="ml-2 h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-0.5" />
                            </a>
                        </Button>
                    </div>
                )}
            </div>
        </motion.div>
    );
}