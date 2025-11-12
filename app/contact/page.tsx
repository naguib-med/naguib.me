import { PageHeader } from '@/components/page-header';
import { ContactForm } from '@/components/contact/contact-form';

export const metadata = {
    title: 'Contact | Naguib Mohamed - Développeur & Étudiant Cybersécurité',
    description: 'Contactez-moi pour opportunités de stage, projets web ou collaborations. Réponse sous 24-48h.',
};

export default function ContactPage() {
    return (
        <div className="flex min-h-screen flex-col">
            <PageHeader
                title="Contact"
                description="Disponible pour stage DevSecOps/Cybersécurité (avril 2026) et projets web."
                gradient="from-accent/80 via-primary to-primary/60"
            />

            <div className="container py-12 md:py-20 mx-auto">
                <div className="max-w-2xl mx-auto">
                    <div className="prose dark:prose-invert max-w-none mb-8">
                        <p>
                            <strong>Étudiant Master 2 OPSIE (Label ANSSI)</strong> recherchant un stage de 4-6 mois 
                            en DevSecOps, Cybersécurité ou Sécurité applicative à partir d&apos;avril 2026.
                        </p>
                        <p>
                            Développeur Full Stack avec ~2 ans d&apos;expérience, je suis également ouvert aux 
                            projets web, collaborations et opportunités d&apos;apprentissage.
                        </p>
                        <p>
                            <strong>Réponse sous 24-48h.</strong> Vous pouvez aussi me retrouver sur{' '}
                            <a
                                href="https://www.linkedin.com/in/naguib-mohamed-mahamoud/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary hover:text-accent transition-colors font-semibold"
                            >
                                LinkedIn
                            </a>{' '}
                            ou{' '}
                            <a
                                href="https://github.com/naguib-med"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary hover:text-accent transition-colors font-semibold"
                            >
                                GitHub
                            </a>.
                        </p>
                    </div>

                    <ContactForm />
                </div>
            </div>
        </div>
    );
}