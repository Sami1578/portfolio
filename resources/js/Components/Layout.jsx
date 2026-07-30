import React from 'react';
import { Head, usePage } from '@inertiajs/react';
import Navbar from './layout/Navbar';
import Footer from './layout/Footer';
import ContactFab from './layout/ContactFab';

export default function Layout({ children, title = 'Portfolio', description = 'Full-Stack Software Engineer Portfolio', profile, whatsapp }) {
    const pageTitle = title || 'SA. | Full-Stack Software Engineer';
    const metaDescription = description || 'Full-Stack Software Engineer Portfolio';
    const { url } = usePage().props;
    const canonicalUrl = url?.canonical;
    
    return (
        <>
            <Head>
                <title>{pageTitle}</title>
                <meta name="description" content={metaDescription} />

                {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

                {/* Open Graph / Social Sharing */}
                <meta property="og:title" content={pageTitle} />
                <meta property="og:description" content={metaDescription} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={typeof window !== 'undefined' ? window.location.href : ''} />

                {/* Twitter Card */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={pageTitle} />
                <meta name="twitter:description" content={metaDescription} />

                {/* JSON-LD Structured Data */}
                {profile && (
                    <script type="application/ld+json">
                        {JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "Person",
                            "name": profile.name,
                            "jobTitle": profile.title,
                            "url": typeof window !== 'undefined' ? window.location.origin : '',
                            "knowsAbout": [
                                "Laravel",
                                "React.js",
                                "Next.js",
                                "Vue.js",
                                "Python Django",
                                "Multi-Tenant Architecture",
                                "RPA Automation",
                                "REST APIs"
                            ]
                        })}
                    </script>
                )}
            </Head>
            <div className="min-h-screen bg-bg">
                <Navbar profile={profile} />
                <main className="relative">{children}</main>
                <Footer profile={profile} />
                <ContactFab whatsapp={whatsapp} />
            </div>
        </>
    );
}
