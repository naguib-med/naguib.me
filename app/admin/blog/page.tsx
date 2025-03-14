"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Plus, FileText, Save, Trash2, AlertCircle, Loader2, Search, Edit2,
    Eye, EyeOff, Calendar, Tag, ChevronDown, ChevronUp, Clock
} from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface BlogPost {
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    category: string;
    date: string;
    readTime: string;
    image: string;
    status: "draft" | "published";
}

const CATEGORIES = [
    "Développement Web",
    "Intelligence Artificielle",
    "Design UI/UX",
    "Mobile",
    "Sécurité",
    "Performance",
    "DevOps",
    "Autres"
];

export default function AdminBlogPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [currentPost, setCurrentPost] = useState<Partial<BlogPost>>({
        title: "",
        excerpt: "",
        content: "",
        category: CATEGORIES[0],
        image: "",
        status: "draft"
    });
    const [isLoading, setIsLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [sortBy, setSortBy] = useState<"date" | "title">("date");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
    const [showPreview, setShowPreview] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [mounted, setMounted] = useState(false);

    // Gestion du montage du composant
    useEffect(() => {
        setMounted(true);
    }, []);

    // Charger les articles au chargement de la page
    useEffect(() => {
        if (status === "authenticated") {
            fetchPosts();
        }
    }, [status]);

    // Rediriger si non authentifié
    useEffect(() => {
        if (status === "unauthenticated") {
            toast.error("Vous devez être connecté pour accéder à cette page");
            router.push("/auth/signin");
        }
    }, [status, router]);

    const filteredPosts = posts
        .filter((post) => {
            const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.category.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategory === "all" || !selectedCategory || post.category === selectedCategory;
            return matchesSearch && matchesCategory;
        })
        .sort((a, b) => {
            if (sortBy === "date") {
                return sortOrder === "asc"
                    ? new Date(a.date).getTime() - new Date(b.date).getTime()
                    : new Date(b.date).getTime() - new Date(a.date).getTime();
            }
            return sortOrder === "asc"
                ? a.title.localeCompare(b.title)
                : b.title.localeCompare(a.title);
        });

    const handleStatusChange = async (post: BlogPost) => {
        try {
            const response = await fetch(`/api/admin/blog/${post.slug}/status`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    status: post.status === "draft" ? "published" : "draft",
                }),
            });

            if (!response.ok) {
                throw new Error("Erreur lors du changement de statut");
            }

            toast.success(
                post.status === "draft"
                    ? "Article publié avec succès"
                    : "Article mis en brouillon"
            );
            fetchPosts();
        } catch (error) {
            toast.error("Une erreur est survenue");
            console.error(error);
        }
    };

    const handleEdit = (post: BlogPost) => {
        setCurrentPost(post);
        setIsEditing(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch("/api/admin/blog", {
                method: isEditing ? "PUT" : "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...currentPost,
                    status: currentPost.status || "draft",
                }),
            });

            if (!response.ok) {
                throw new Error("Erreur lors de la création/modification de l&apos;article");
            }

            toast.success(isEditing ? "Article modifié avec succès" : "Article créé avec succès");
            setCurrentPost({});
            setIsEditing(false);
            fetchPosts();
        } catch (error) {
            toast.error("Une erreur est survenue");
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchPosts = async () => {
        try {
            const response = await fetch("/api/admin/blog");
            if (!response.ok) {
                throw new Error("Erreur lors du chargement des articles");
            }
            const data = await response.json();
            setPosts(data);
        } catch (error) {
            toast.error("Erreur lors du chargement des articles");
            console.error(error);
        }
    };

    const handleDelete = async (slug: string) => {
        if (!confirm("Êtes-vous sûr de vouloir supprimer cet article ?")) {
            return;
        }

        try {
            const response = await fetch(`/api/admin/blog/${slug}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error("Erreur lors de la suppression de l'article");
            }

            toast.success("Article supprimé avec succès");
            fetchPosts();
        } catch (error) {
            toast.error("Erreur lors de la suppression de l'article");
            console.error(error);
        }
    };

    // Formatage de la date côté client uniquement
    const formatDate = (dateString: string) => {
        if (!mounted) return dateString;
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('fr-FR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        } catch {
            return dateString;
        }
    };

    // Afficher un message de chargement pendant la vérification de la session
    if (status === "loading") {
        return (
            <div className="container py-8 flex justify-center items-center min-h-[50vh]">
                <p>Chargement...</p>
            </div>
        );
    }

    // Vérifier si l'utilisateur est autorisé (optionnel, puisque le middleware fait déjà la vérification)
    const isAdmin = session?.user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL;
    if (status === "authenticated" && !isAdmin) {
        return (
            <div className="container py-8">
                <Card className="max-w-md mx-auto">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-red-500">
                            <AlertCircle className="h-5 w-5" />
                            Accès non autorisé
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>Vous n&apos;avez pas les permissions nécessaires pour accéder à cette page.</p>
                        <Button className="mt-4" onClick={() => router.push("/")}>
                            Retourner à l&apos;accueil
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="container py-24"
        >
            <div className="mb-8">
                <h1 className="text-3xl font-bold">Gestion des Articles</h1>
                <p className="text-muted-foreground">
                    Créez et gérez vos articles de blog
                </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
                {/* Formulaire de création/modification */}
                <Card className="relative overflow-hidden">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Plus className="h-5 w-5" />
                            {isEditing ? "Modifier l'Article" : "Nouvel Article"}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="title">Titre</Label>
                                <Input
                                    id="title"
                                    value={currentPost.title}
                                    onChange={(e) =>
                                        setCurrentPost({ ...currentPost, title: e.target.value })
                                    }
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="excerpt">Extrait</Label>
                                <Textarea
                                    id="excerpt"
                                    value={currentPost.excerpt}
                                    onChange={(e) =>
                                        setCurrentPost({ ...currentPost, excerpt: e.target.value })
                                    }
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="content">Contenu (Markdown)</Label>
                                <Textarea
                                    id="content"
                                    value={currentPost.content}
                                    onChange={(e) =>
                                        setCurrentPost({ ...currentPost, content: e.target.value })
                                    }
                                    required
                                    className="min-h-[200px]"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="category">Catégorie</Label>
                                <Select
                                    value={currentPost.category}
                                    onValueChange={(value) =>
                                        setCurrentPost({ ...currentPost, category: value })
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Sélectionner une catégorie" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {CATEGORIES.map((category) => (
                                            <SelectItem key={category} value={category}>
                                                {category}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="image">URL de l&apos;image</Label>
                                <Input
                                    id="image"
                                    value={currentPost.image}
                                    onChange={(e) =>
                                        setCurrentPost({ ...currentPost, image: e.target.value })
                                    }
                                    required
                                />
                            </div>

                            <div className="flex items-center gap-4">
                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                    className="flex-1 relative overflow-hidden group"
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            {isEditing ? "Modification en cours..." : "Création en cours..."}
                                        </>
                                    ) : (
                                        <>
                                            <Save className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
                                            {isEditing ? "Modifier l'article" : "Créer l'article"}
                                        </>
                                    )}
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setShowPreview(!showPreview)}
                                    className="flex-1"
                                >
                                    {showPreview ? (
                                        <>
                                            <EyeOff className="mr-2 h-4 w-4" />
                                            Masquer la prévisualisation
                                        </>
                                    ) : (
                                        <>
                                            <Eye className="mr-2 h-4 w-4" />
                                            Prévisualiser
                                        </>
                                    )}
                                </Button>
                            </div>
                        </form>

                        {showPreview && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mt-6 p-4 border rounded-lg bg-muted/50"
                            >
                                <h3 className="font-medium mb-2">Prévisualisation</h3>
                                <div className="prose prose-sm max-w-none">
                                    <h2>{currentPost.title || "Sans titre"}</h2>
                                    <p className="text-muted-foreground">{currentPost.excerpt}</p>
                                    <div className="mt-4">{currentPost.content}</div>
                                </div>
                            </motion.div>
                        )}
                    </CardContent>
                </Card>

                {/* Liste des articles */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <FileText className="h-5 w-5" />
                            Articles Existants
                        </CardTitle>
                        <div className="space-y-4">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Rechercher un article..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                            <div className="flex items-center gap-4">
                                <Select
                                    value={selectedCategory}
                                    onValueChange={setSelectedCategory}
                                >
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Filtrer par catégorie" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">Toutes les catégories</SelectItem>
                                        {CATEGORIES.map((category) => (
                                            <SelectItem key={category} value={category}>
                                                {category}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <div className="flex items-center gap-2">
                                    <Select
                                        value={sortBy}
                                        onValueChange={(value: "date" | "title") => setSortBy(value)}
                                    >
                                        <SelectTrigger className="w-[120px]">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="date">Date</SelectItem>
                                            <SelectItem value="title">Titre</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                                    >
                                        {sortOrder === "asc" ? (
                                            <ChevronUp className="h-4 w-4" />
                                        ) : (
                                            <ChevronDown className="h-4 w-4" />
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <AnimatePresence>
                                {filteredPosts.length === 0 ? (
                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="text-muted-foreground text-center py-8"
                                    >
                                        Aucun article trouvé
                                    </motion.p>
                                ) : (
                                    filteredPosts.map((post) => (
                                        <motion.div
                                            key={post.slug}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            className="group flex items-center justify-between rounded-lg border p-4 hover:border-primary/50 transition-colors"
                                        >
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2">
                                                    <h3 className="font-medium group-hover:text-primary transition-colors">
                                                        {post.title}
                                                    </h3>
                                                    <span className={cn(
                                                        "text-xs px-2 py-1 rounded-full",
                                                        post.status === "published"
                                                            ? "bg-green-100 text-green-800"
                                                            : "bg-yellow-100 text-yellow-800"
                                                    )}>
                                                        {post.status === "published" ? "Publié" : "Brouillon"}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                    <Tag className="h-3 w-3" />
                                                    {post.category}
                                                    <span>•</span>
                                                    <Calendar className="h-3 w-3" />
                                                    <span suppressHydrationWarning>{formatDate(post.date)}</span>
                                                    <span>•</span>
                                                    <Clock className="h-3 w-3" />
                                                    {post.readTime}
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <TooltipProvider>
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                onClick={() => handleStatusChange(post)}
                                                                className={cn(
                                                                    post.status === "published"
                                                                        ? "text-yellow-500 hover:text-yellow-600"
                                                                        : "text-green-500 hover:text-green-600"
                                                                )}
                                                            >
                                                                {post.status === "published" ? (
                                                                    <EyeOff className="h-4 w-4" />
                                                                ) : (
                                                                    <Eye className="h-4 w-4" />
                                                                )}
                                                            </Button>
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            {post.status === "published"
                                                                ? "Mettre en brouillon"
                                                                : "Publier l&apos;article"}
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                                <TooltipProvider>
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                onClick={() => handleEdit(post)}
                                                                className="text-primary hover:text-primary/80"
                                                            >
                                                                <Edit2 className="h-4 w-4" />
                                                            </Button>
                                                        </TooltipTrigger>
                                                        <TooltipContent>Modifier l&apos;article</TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                                <TooltipProvider>
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                onClick={() => handleDelete(post.slug)}
                                                                className="text-red-500 hover:text-red-600"
                                                            >
                                                                <Trash2 className="h-4 w-4" />
                                                            </Button>
                                                        </TooltipTrigger>
                                                        <TooltipContent>Supprimer l&apos;article</TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                            </div>
                                        </motion.div>
                                    ))
                                )}
                            </AnimatePresence>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </motion.div>
    );
}