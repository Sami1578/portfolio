import React from 'react';
import { Head, usePage } from '@inertiajs/react';
import Navbar from './layout/Navbar';
import Footer from './layout/Footer';
import FloatingSocialDock from './layout/FloatingSocialDock';

const SITE_ORIGIN = 'https://samiahmed.dev';
const OG_IMAGE = `${SITE_ORIGIN}/og-image.png`;

export default function Layout({
    children,
    title,
    description,
    profile,
    whatsapp,
    socialLinks,
    type = 'website',
    image,
    publishedTime,
    modifiedTime,
    keywords,
    jsonLd,
}) {
    const metaTitle = title || 'Sami Ahmed | Full-Stack Software Engineer';
    const metaDescription = description || 'Full-Stack Software Engineer Portfolio';
    const metaImage = image || OG_IMAGE;
    const { url } = usePage().props;
    // SSR-safe: server-provided URL, no window dependency
    const canonicalUrl = url?.canonical ?? SITE_ORIGIN;

    return (
        <>
            <Head>
                <title>{metaTitle}</title>
                <meta head-key="description"        name="description"        content={metaDescription} />
                {keywords?.length > 0 && (
                    <meta head-key="keywords" name="keywords" content={keywords.join(', ')} />
                )}

                <link head-key="canonical"           rel="canonical"           href={canonicalUrl} />

                {/* Open Graph */}
                <meta head-key="og:title"            property="og:title"       content={metaTitle} />
                <meta head-key="og:description"      property="og:description" content={metaDescription} />
                <meta head-key="og:type"             property="og:type"        content={type} />
                <meta head-key="og:url"              property="og:url"         content={canonicalUrl} />
                <meta head-key="og:image"            property="og:image"       content={metaImage} />
                <meta head-key="og:site_name"        property="og:site_name"   content="Sami Ahmed" />

                {type === 'article' && publishedTime && (
                    <meta head-key="article:published_time" property="article:published_time" content={publishedTime} />
                )}
                {type === 'article' && (modifiedTime || publishedTime) && (
                    <meta head-key="article:modified_time" property="article:modified_time" content={modifiedTime || publishedTime} />
                )}
                {type === 'article' && keywords?.map((tag) => (
                    <meta key={tag} property="article:tag" content={tag} />
                ))}

                {/* Twitter Card */}
                <meta head-key="twitter:card"        name="twitter:card"        content="summary_large_image" />
                <meta head-key="twitter:title"       name="twitter:title"       content={metaTitle} />
                <meta head-key="twitter:description" name="twitter:description" content={metaDescription} />
                <meta head-key="twitter:image"       name="twitter:image"       content={metaImage} />

                {/* JSON-LD Structured Data */}
                {jsonLd ? (
                    <script head-key="json-ld" type="application/ld+json">
                        {JSON.stringify(jsonLd)}
                    </script>
                ) : profile && (
                    <script head-key="json-ld" type="application/ld+json">
                        {JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "Person",
                            "name": profile.name,
                            "jobTitle": profile.title,
                            "url": SITE_ORIGIN,
                            "description": metaDescription,
                            "sameAs": [
                                "https://www.linkedin.com/in/sami-ahmed-3021b4287/",
                                "https://github.com/Sami1578"
                            ],
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
                <FloatingSocialDock socialLinks={socialLinks} whatsapp={whatsapp} />
            </div>
        </>
    );
}
