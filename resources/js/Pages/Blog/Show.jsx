import React from 'react';
import { Eye } from 'lucide-react';
import Layout from '../../Components/Layout';
import Container from '../../Components/ui/Container';
import CommentForm from '../../Components/blog/CommentForm';
import CommentList from '../../Components/blog/CommentList';

export default function BlogShow({ profile, whatsapp, socialLinks, post, comments = [], commenterEmail }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.meta_description,
    image: post.featured_image_url ? [post.featured_image_url] : undefined,
    datePublished: post.published_at,
    dateModified: post.updated_at || post.published_at,
    author: {
      '@type': 'Person',
      name: profile.name,
    },
    keywords: post.tech_tags?.join(', '),
  };

  return (
    <Layout
      title={`${post.title} - ${profile.name}`}
      description={post.meta_description}
      profile={profile}
      whatsapp={whatsapp}
      socialLinks={socialLinks}
      type="article"
      image={post.featured_image_url}
      publishedTime={post.published_at}
      modifiedTime={post.updated_at}
      keywords={post.tech_tags}
      jsonLd={jsonLd}
    >
      <article className="py-24 md:py-32 pt-40">
        <Container className="max-w-3xl">
          {post.tech_tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tech_tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="rounded-full bg-accent-soft px-2.5 py-0.5 font-mono-ui text-[10px] uppercase tracking-widest text-accent-deep"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <h1 className="font-display text-4xl md:text-5xl font-extrabold leading-tight text-text text-balance">
            {post.title}
          </h1>

          <div className="mt-4 flex items-center gap-4 font-mono-ui text-xs uppercase tracking-widest text-text-muted">
            <span>
              {post.published_at &&
                new Date(post.published_at).toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
            </span>
            <span className="inline-flex items-center gap-1">
              <Eye size={13} /> {post.view_count} views
            </span>
          </div>

          {post.featured_image_path && (
            <img
              src={`/storage/${post.featured_image_path}`}
              alt={post.title}
              className="mt-10 w-full rounded-xl border border-border object-cover"
            />
          )}

          <div className="post-content mt-10" dangerouslySetInnerHTML={{ __html: post.content }} />

          <div className="mt-16 border-t border-border pt-12">
            <CommentList comments={comments} postSlug={post.slug ?? ''} commenterEmail={commenterEmail} />
          </div>

          <div className="mt-12 border-t border-border pt-12">
            <CommentForm postSlug={post.slug ?? ''} commenterEmail={commenterEmail} />
          </div>
        </Container>
      </article>
    </Layout>
  );
}
