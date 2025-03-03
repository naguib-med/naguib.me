import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Twitter, Facebook, Linkedin, Copy, Check, Share2 } from 'lucide-react';
import { toast } from 'sonner';

type ShareButtonsProps = {
    title: string;
    className?: string;
};

export function ShareButtons({ title, className = "" }: ShareButtonsProps) {
    const [copied, setCopied] = useState(false);
    const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

    const handleCopyLink = () => {
        navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        toast.success("Lien copié dans le presse-papier");
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className={`flex items-center ${className}`}>
            <Button variant="ghost" size="sm" className="mr-2">
                <Share2 className="h-4 w-4 mr-1" />
                Partager
            </Button>
            <div className="flex gap-2">
                <Button variant="outline" size="icon" asChild>
                    <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}`} target="_blank" rel="noopener noreferrer">
                        <Twitter className="h-4 w-4" />
                    </a>
                </Button>
                <Button variant="outline" size="icon" asChild>
                    <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer">
                        <Facebook className="h-4 w-4" />
                    </a>
                </Button>
                <Button variant="outline" size="icon" asChild>
                    <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer">
                        <Linkedin className="h-4 w-4" />
                    </a>
                </Button>
                <Button
                    variant={copied ? "default" : "outline"}
                    size="icon"
                    onClick={handleCopyLink}
                >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
            </div>
        </div>
    );
}
