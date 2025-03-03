import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

type Reaction = {
    emoji: string;
    label: string;
    count: number;
    active: boolean;
};

export function ReactionButtons() {
    const [reactions, setReactions] = useState<Reaction[]>([
        { emoji: "👍", label: "J'aime", count: 12, active: false },
        { emoji: "🎉", label: "Génial", count: 8, active: false },
        { emoji: "🧠", label: "Instructif", count: 5, active: false },
        { emoji: "💡", label: "Inspirant", count: 3, active: false },
    ]);

    const handleReaction = (index: number) => {
        setReactions(prev => {
            const newReactions = [...prev];
            if (newReactions[index].active) {
                newReactions[index].count -= 1;
                newReactions[index].active = false;
            } else {
                newReactions[index].count += 1;
                newReactions[index].active = true;
            }
            return newReactions;
        });
    };

    return (
        <div className="mt-10 pt-6 border-t">
            <p className="text-muted-foreground text-sm mb-4">Que pensez-vous de cet article ?</p>
            <div className="flex flex-wrap gap-3">
                {reactions.map((reaction, index) => (
                    <Button
                        key={reaction.emoji}
                        variant={reaction.active ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleReaction(index)}
                        className="flex items-center gap-2 transition-all"
                    >
                        <span className="text-lg">{reaction.emoji}</span>
                        <span>{reaction.label}</span>
                        <span className="bg-primary/10 px-2 py-0.5 rounded-full text-xs">
                            {reaction.count}
                        </span>
                    </Button>
                ))}
            </div>
        </div>
    );
}