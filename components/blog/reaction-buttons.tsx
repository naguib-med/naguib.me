import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';

type ReactionType = {
    emoji: string;
    label: string;
    count: number;
    active: boolean;
};

const REACTION_LABELS: Record<string, string> = {
    "👍": "J'aime",
    "🎉": "Génial",
    "🧠": "Instructif",
    "💡": "Inspirant"
};

export function ReactionButtons() {
    const pathname = usePathname();
    const articleId = pathname.split('/').pop() || '';

    const [reactions, setReactions] = useState<Record<string, { count: number }>>({});
    const [userVotes, setUserVotes] = useState<Record<string, boolean>>({});
    const [isLoading, setIsLoading] = useState(true);
    const [userId, setUserId] = useState<string>('');
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    useEffect(() => {
        const initializeUser = () => {
            let storedUserId = localStorage.getItem('reaction-user-id');
            if (!storedUserId) {
                storedUserId = uuidv4();
                localStorage.setItem('reaction-user-id', storedUserId);
            }
            return storedUserId;
        };

        const fetchInitialData = async (uid: string) => {
            try {
                setIsLoading(true);
                setErrorMsg(null);

                const response = await fetch(`/api/reactions?articleId=${articleId}&userId=${uid}`);

                if (!response.ok) {
                    throw new Error(`Erreur serveur: ${response.status}`);
                }

                const data = await response.json();
                setReactions(data.reactions || {});
                setUserVotes(data.userVotes || {});
            } catch (error) {
                console.error('Erreur lors du chargement des réactions:', error);
                setErrorMsg('Impossible de charger les réactions. Veuillez rafraîchir la page.');
            } finally {
                setIsLoading(false);
            }
        };

        // Exécution séquentielle pour s'assurer que userId est disponible
        const uid = initializeUser();
        setUserId(uid);
        fetchInitialData(uid);

        // Fonction de nettoyage
        return () => {
            // Nettoyage si nécessaire
        };
    }, [articleId]);

    // Fonction pour gérer les clics sur les réactions
    const handleReaction = async (emoji: string) => {
        if (!userId || isLoading) return;

        const hasVoted = userVotes[emoji] || false;
        const action = hasVoted ? 'remove' : 'add';

        try {
            // Mise à jour optimiste de l'interface
            setUserVotes(prev => ({
                ...prev,
                [emoji]: !hasVoted
            }));

            setReactions(prev => {
                const newReactions = { ...prev };
                if (!newReactions[emoji]) {
                    newReactions[emoji] = { count: 0 };
                }

                if (hasVoted) {
                    newReactions[emoji].count = Math.max(0, newReactions[emoji].count - 1);
                } else {
                    newReactions[emoji].count = (newReactions[emoji].count || 0) + 1;
                }

                return newReactions;
            });

            // Envoyer la mise à jour au serveur
            const response = await fetch(`/api/reactions?articleId=${articleId}&userId=${userId}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ emoji, action }),
            });

            if (!response.ok) {
                throw new Error(`Erreur serveur: ${response.status}`);
            }

            // Mettre à jour avec les données réelles du serveur
            const data = await response.json();
            setReactions(data.reactions);
            setUserVotes(data.userVotes);

        } catch (error) {
            console.error('Erreur lors de la mise à jour de la réaction:', error);
            setErrorMsg('Impossible de mettre à jour la réaction. Veuillez réessayer.');

            // Annuler les mises à jour optimistes
            fetchReactions();
        }
    };

    // Fonction pour récupérer les réactions depuis l'API
    const fetchReactions = async () => {
        if (!userId) return;

        try {
            setIsLoading(true);
            setErrorMsg(null);

            const response = await fetch(`/api/reactions?articleId=${articleId}&userId=${userId}`);

            if (!response.ok) {
                throw new Error(`Erreur serveur: ${response.status}`);
            }

            const data = await response.json();
            setReactions(data.reactions);
            setUserVotes(data.userVotes);

        } catch (error) {
            console.error('Erreur lors du chargement des réactions:', error);
            setErrorMsg('Impossible de charger les réactions. Veuillez rafraîchir la page.');
        } finally {
            setIsLoading(false);
        }
    };

    // Conversion des données pour l'affichage
    const formattedReactions: ReactionType[] = Object.entries(REACTION_LABELS).map(([emoji, label]) => ({
        emoji,
        label,
        count: reactions[emoji]?.count || 0,
        active: !!userVotes[emoji]
    }));

    // Gestion des états de chargement et d'erreur
    if (isLoading && Object.keys(reactions).length === 0) {
        return (
            <div className="mt-10 pt-6 border-t">
                <p className="text-muted-foreground text-sm mb-4">Chargement des réactions...</p>
                <div className="flex gap-3">
                    {Object.entries(REACTION_LABELS).map(([emoji, label]) => (
                        <Button
                            key={emoji}
                            variant="outline"
                            size="sm"
                            disabled
                            className="flex items-center gap-2 opacity-50"
                        >
                            <span className="text-lg">{emoji}</span>
                            <span>{label}</span>
                            <span className="bg-primary/10 px-2 py-0.5 rounded-full text-xs">
                                0
                            </span>
                        </Button>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="mt-10 pt-6 border-t">
            <div className="flex justify-between items-center mb-4">
                <p className="text-muted-foreground text-sm">Que pensez-vous de cet article ?</p>
                {errorMsg && (
                    <p className="text-red-500 text-xs">{errorMsg}</p>
                )}
            </div>

            <div className="flex flex-wrap gap-3">
                {formattedReactions.map((reaction) => (
                    <motion.div
                        key={reaction.emoji}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Button
                            variant={reaction.active ? "default" : "outline"}
                            size="sm"
                            onClick={() => handleReaction(reaction.emoji)}
                            className="flex items-center gap-2 transition-all"
                            disabled={isLoading}
                        >
                            <span className="text-lg">{reaction.emoji}</span>
                            <span>{reaction.label}</span>
                            <AnimatePresence mode="wait">
                                <motion.span
                                    key={`${reaction.emoji}-${reaction.count}`}
                                    initial={{ opacity: 0, y: -5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 5 }}
                                    className="bg-primary/10 px-2 py-0.5 rounded-full text-xs"
                                >
                                    {reaction.count}
                                </motion.span>
                            </AnimatePresence>
                        </Button>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}