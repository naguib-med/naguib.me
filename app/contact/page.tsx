import { PageHeader } from '@/components/page-header';
import { ContactForm } from '@/components/contact/contact-form';

export const metadata = {
    title: 'Contact | Naguib.me',
    description: 'Contactez-moi pour toute question ou collaboration.',
};

export default function ContactPage() {
    return (
        <div className="flex min-h-screen flex-col">
            <PageHeader
                title="Contact"
                description="N'hésitez pas à me contacter pour toute question ou collaboration."
                gradient="from-primary/80 via-primary to-primary/60"
            />

            <div className="container py-12 md:py-20 mx-auto">
                <div className="max-w-2xl mx-auto">
                    <div className="prose dark:prose-invert max-w-none mb-8">
                        <p>
                            Je suis toujours ouvert aux nouvelles opportunités et collaborations.
                            Que vous ayez une question, une proposition de projet ou simplement
                            envie d&apos;échanger, n&apos;hésitez pas à me contacter.
                        </p>
                        <p>
                            Je m&apos;efforce de répondre à tous les messages dans les plus brefs délais.
                            Vous pouvez également me suivre sur{' '}
                            <a
                                href="https://twitter.com/naguibme"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:text-blue-600"
                            >
                                Twitter
                            </a>{' '}
                            ou{' '}
                            <a
                                href="https://linkedin.com/in/naguibme"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:text-blue-600"
                            >
                                LinkedIn
                            </a>{' '}
                            pour plus d&apos;interactions.
                        </p>
                    </div>

                    <ContactForm />
                </div>
            </div>
        </div>
    );
} 