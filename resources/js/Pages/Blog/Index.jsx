import React from 'react';
import Layout from '../../Components/Layout';
import Container from '../../Components/ui/Container';
import SectionHeader from '../../Components/ui/SectionHeader';
import PostCard from '../../Components/blog/PostCard';

export default function BlogIndex({ profile, whatsapp, socialLinks, posts = [] }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: `${profile.name} - Blog`,
    description: 'Articles on Laravel, React, and full-stack development.',
    blogPost: posts.map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.excerpt,
      url: `/posts/${post.slug}`,
      datePublished: post.published_at,
    })),
  };

  return (
    <Layout
      title={`Blog - ${profile.name}`}
      description="Articles on Laravel, React, and full-stack development."
      profile={profile}
      whatsapp={whatsapp}
      socialLinks={socialLinks}
      jsonLd={jsonLd}
    >
      <section className="py-24 md:py-32 pt-40">
        <Container>
          <SectionHeader
            eyebrow="Blog"
            heading="Writing"
            description="Notes on the stacks and problems I work with."
          />

          {posts.length === 0 ? (
            <p className="text-text-muted">No posts published yet — check back soon.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </Container>
      </section>
    </Layout>
  );
}
