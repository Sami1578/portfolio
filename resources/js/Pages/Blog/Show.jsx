import React from 'react';
import { Eye } from 'lucide-react';
import Layout from '../../Components/Layout';
import CommentForm from '../../Components/blog/CommentForm';
import CommentList from '../../Components/blog/CommentList';
import ShareButton from '../../Components/blog/ShareButton';

// Height of the fixed navbar rendered inside <Layout>. Adjust this if the
// navbar's height changes — both columns below are offset by this value so
// content never sits underneath it.
const NAVBAR_HEIGHT = '5rem'; // 80px — matches typical Layout navbar height

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
      <article
        className="flex flex-col md:flex-row w-full"
        style={{ height: `calc(100vh - ${NAVBAR_HEIGHT})`, marginTop: NAVBAR_HEIGHT }}
      >
        {/* LEFT: full-height featured image, fixed in place while content scrolls */}
        <div className="relative w-full md:w-1/2 h-64 md:h-full shrink-0 bg-black/5 dark:bg-white/5 overflow-hidden">
          {post.featured_image_path ? (
            <img
              src={post.featured_image_path}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-text-muted font-mono-ui text-xs uppercase tracking-widest">
              No image
            </div>
          )}

          {/* Title overlay on the image for large screens — keeps the right
              column focused purely on reading content. */}
          <div className="hidden md:flex absolute inset-0 flex-col justify-end bg-gradient-to-t from-black/80 via-black/20 to-transparent p-10">
            {post.tech_tags?.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tech_tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="rounded-full bg-white/15 backdrop-blur px-2.5 py-0.5 font-mono-ui text-[10px] uppercase tracking-widest text-white"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <h1 className="font-display text-3xl lg:text-4xl font-extrabold leading-tight text-white text-balance">
              {post.title}
            </h1>
            <div className="mt-4 flex items-center gap-4 font-mono-ui text-xs uppercase tracking-widest text-white/70">
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
          </div>
        </div>

        {/* RIGHT: scrollable content column */}
        <div className="w-full md:w-1/2 h-full overflow-y-auto">
          <div className="max-w-2xl mx-auto px-6 md:px-12 py-12 md:py-16">
            {/* Title block shown only on mobile, since the image overlay
                handles it on desktop. */}
            <div className="md:hidden mb-8">
              {post.tech_tags?.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
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
              <h1 className="font-display text-3xl font-extrabold leading-tight text-text text-balance">
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
            </div>

            <div className="post-content" dangerouslySetInnerHTML={{ __html: post.content }} />

            <ShareButton title={post.title} text={post.meta_description} />

            <div className="mt-16 border-t border-border pt-12">
              <CommentList comments={comments} postSlug={post.slug ?? ''} commenterEmail={commenterEmail} />
            </div>

            <div className="mt-12 border-t border-border pt-12">
              <CommentForm postSlug={post.slug ?? ''} commenterEmail={commenterEmail} />
            </div>
          </div>
        </div>
      </article>
    </Layout>
  );
}