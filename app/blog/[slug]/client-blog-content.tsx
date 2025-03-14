//blog/[slug]/client-blog-content.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShareButtons } from '@/components/blog/share-buttons';
import { ReactionButtons } from '@/components/blog/reaction-buttons';
import { RelatedPosts } from '@/components/blog/related-posts';
import type { BlogPost } from '@/components/blog/related-posts';


type ClientBlogContentProps = {
    title: string;
    relatedPosts: BlogPost[];
};

export default function ClientBlogContent({ title, relatedPosts }: ClientBlogContentProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
        >
            {/* Share buttons at the top */}
            <div className="mb-8 flex justify-end">
                <ShareButtons title={title} />
            </div>

            {/* Reaction section */}
            <ReactionButtons />

            {/* Social sharing section at the bottom */}
            <div className="mt-8 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-muted-foreground text-sm">Partager cet article:</p>
                <ShareButtons title={title} />
            </div>

            {/* Related posts */}
            <RelatedPosts posts={relatedPosts} />
        </motion.div>
    );
}