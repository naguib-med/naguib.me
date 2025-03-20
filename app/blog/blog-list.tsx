"use client"

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Search, Filter, X, Calendar, Clock, ChevronDown, ChevronUp } from "lucide-react";
import { BlogCard } from "@/components/blog/blog-card";
import { formatDate } from "@/lib/utils/date-utils";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

// Type pour un article de blog
interface BlogPost {
    slug: string;
    meta: {
        title: string;
        excerpt: string;
        image: string;
        category: string;
        date: string;
        readTime: string;
    }
}

interface BlogListProps {
    initialPosts: BlogPost[];
    categories: string[];
}

interface Filter {
    type: "category" | "search" | "date" | "readTime";
    value: string;
}

interface DateRange {
    from: Date | null;
    to: Date | null;
}

export default function BlogList({ initialPosts, categories }: BlogListProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("Tous");
    const [sortBy, setSortBy] = useState<"date" | "readTime">("date");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [dateRange, setDateRange] = useState<DateRange>({ from: null, to: null });
    const [maxReadTime, setMaxReadTime] = useState(30);

    const filteredPosts = initialPosts
        .filter(post => {
            const matchesSearch = post.meta.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.meta.excerpt.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesCategory = selectedCategory === "Tous" || post.meta.category === selectedCategory;

            const postDate = new Date(post.meta.date);
            const matchesDateRange = (!dateRange.from || postDate >= dateRange.from) &&
                (!dateRange.to || postDate <= dateRange.to);

            const readTime = parseInt(post.meta.readTime);
            const matchesReadTime = readTime <= maxReadTime;

            return matchesSearch && matchesCategory && matchesDateRange && matchesReadTime;
        })
        .sort((a, b) => {
            const multiplier = sortOrder === "asc" ? 1 : -1;
            if (sortBy === "date") {
                return (new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime()) * multiplier;
            } else {
                const timeA = parseInt(a.meta.readTime);
                const timeB = parseInt(b.meta.readTime);
                return (timeA - timeB) * multiplier;
            }
        });

    const activeFilters = [
        selectedCategory !== "Tous" && { type: "category" as const, value: selectedCategory },
        searchQuery && { type: "search" as const, value: searchQuery },
        dateRange.from && { type: "date" as const, value: `À partir de ${formatDate(dateRange.from.toISOString())}` },
        dateRange.to && { type: "date" as const, value: `Jusqu'à ${formatDate(dateRange.to.toISOString())}` },
        maxReadTime < 30 && { type: "readTime" as const, value: `Max ${maxReadTime} min` }
    ].filter((filter): filter is Filter => Boolean(filter));

    const resetFilters = () => {
        setSearchQuery("");
        setSelectedCategory("Tous");
        setDateRange({ from: null, to: null });
        setMaxReadTime(30);
        setSortBy("date");
        setSortOrder("desc");
    };

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-12 space-y-8"
            >
                {/* Search and filters */}
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Rechercher des articles..."
                            className="w-full rounded-lg border border-input bg-background py-2 pl-10 pr-4 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center gap-2">
                        <Select value={sortBy} onValueChange={(value: "date" | "readTime") => setSortBy(value)}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Trier par" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="date">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4" />
                                        <span>Date</span>
                                    </div>
                                </SelectItem>
                                <SelectItem value="readTime">
                                    <div className="flex items-center gap-2">
                                        <Clock className="h-4 w-4" />
                                        <span>Temps de lecture</span>
                                    </div>
                                </SelectItem>
                            </SelectContent>
                        </Select>

                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setSortOrder(prev => prev === "asc" ? "desc" : "asc")}
                        >
                            {sortOrder === "asc" ? (
                                <ChevronUp className="h-4 w-4" />
                            ) : (
                                <ChevronDown className="h-4 w-4" />
                            )}
                        </Button>

                        <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                            <PopoverTrigger asChild>
                                <Button variant="outline" size="icon">
                                    <Filter className="h-4 w-4" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[300px] p-4">
                                <div className="space-y-6">
                                    <div>
                                        <h4 className="font-medium mb-2">Catégories</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {categories.map((category) => (
                                                <Button
                                                    key={category}
                                                    variant={selectedCategory === category ? "default" : "outline"}
                                                    size="sm"
                                                    onClick={() => {
                                                        setSelectedCategory(category);
                                                        setIsFilterOpen(false);
                                                    }}
                                                    className="rounded-full"
                                                >
                                                    {category}
                                                </Button>
                                            ))}
                                        </div>
                                    </div>

                                    <Separator />

                                    <div>
                                        <h4 className="font-medium mb-2">Temps de lecture maximum</h4>
                                        <div className="space-y-2">
                                            <Slider
                                                value={[maxReadTime]}
                                                onValueChange={([value]: number[]) => setMaxReadTime(value)}
                                                max={30}
                                                step={1}
                                            />
                                            <div className="flex justify-between text-sm text-muted-foreground">
                                                <span>0 min</span>
                                                <span>{maxReadTime} min</span>
                                            </div>
                                        </div>
                                    </div>

                                    <Separator />

                                    <div>
                                        <h4 className="font-medium mb-2">Période</h4>
                                        <div className="space-y-2">
                                            <div>
                                                <Label htmlFor="date-from">À partir de</Label>
                                                <input
                                                    type="date"
                                                    id="date-from"
                                                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                                    value={dateRange.from ? dateRange.from.toISOString().split("T")[0] : ""}
                                                    onChange={(e) => setDateRange(prev => ({
                                                        ...prev,
                                                        from: e.target.value ? new Date(e.target.value) : null
                                                    }))}
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="date-to">Jusqu&apos;à</Label>
                                                <input
                                                    type="date"
                                                    id="date-to"
                                                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                                    value={dateRange.to ? dateRange.to.toISOString().split('T')[0] : ''}
                                                    onChange={(e) => setDateRange(prev => ({
                                                        ...prev,
                                                        to: e.target.value ? new Date(e.target.value) : null
                                                    }))}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>

                {/* Active filters */}
                {activeFilters.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-wrap gap-2"
                    >
                        {activeFilters.map((filter, index) => (
                            <Badge
                                key={index}
                                variant="secondary"
                                className="flex items-center gap-1"
                            >
                                {filter.type === "category" ? "Catégorie:" :
                                    filter.type === "search" ? "Recherche:" :
                                        filter.type === "date" ? "Date:" : "Temps:"} {filter.value}
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-4 w-4 p-0 hover:bg-transparent"
                                    onClick={() => {
                                        if (filter.type === "category") {
                                            setSelectedCategory("Tous");
                                        } else if (filter.type === "search") {
                                            setSearchQuery("");
                                        } else if (filter.type === "date") {
                                            setDateRange({ from: null, to: null });
                                        } else {
                                            setMaxReadTime(30);
                                        }
                                    }}
                                >
                                    <X className="h-3 w-3" />
                                </Button>
                            </Badge>
                        ))}
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={resetFilters}
                        >
                            Réinitialiser tous les filtres
                        </Button>
                    </motion.div>
                )}
            </motion.div>

            {/* Blog posts */}
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                <AnimatePresence mode="popLayout">
                    {filteredPosts.map((post, index) => (
                        <BlogCard
                            key={post.slug}
                            post={{
                                title: post.meta.title,
                                excerpt: post.meta.excerpt,
                                image: post.meta.image,
                                category: post.meta.category,
                                date: formatDate(post.meta.date),
                                slug: post.slug,
                                readTime: post.meta.readTime,
                            }}
                            index={index}
                        />
                    ))}
                </AnimatePresence>
            </div>

            {filteredPosts.length === 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-12 text-center"
                >
                    <p className="text-muted-foreground">
                        Aucun article ne correspond à votre recherche.
                    </p>
                    <motion.button
                        onClick={resetFilters}
                        className="mt-4 text-primary hover:underline"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Réinitialiser les filtres
                    </motion.button>
                </motion.div>
            )}
        </>
    );
}