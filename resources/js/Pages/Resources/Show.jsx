import React, { useState } from 'react';
import Layout from '../../Components/Layout';
import Container from '../../Components/ui/Container';
import BracketFrame from '../../Components/ui/BracketFrame';
import Button from '../../Components/ui/Button';
import { Download, FileArchive, Film } from 'lucide-react';

export default function ResourceShow({ profile, whatsapp, socialLinks, resource }) {
  const media = resource.media ?? [];
  const [activeIndex, setActiveIndex] = useState(0);
  const [mediaFailed, setMediaFailed] = useState({});
  const active = media[activeIndex];

  const markFailed = (id) => setMediaFailed((prev) => ({ ...prev, [id]: true }));

  return (
    <Layout
      title={`${resource.title} - ${profile.name}`}
      description={resource.short_description}
      profile={profile}
      whatsapp={whatsapp}
      socialLinks={socialLinks}
    >
      <section className="py-24 md:py-32 pt-40">
        <Container className="max-w-3xl">
          <div className="mb-6 flex flex-wrap gap-1.5">
            {resource.tech_tags?.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border px-2 py-0.5 font-mono-ui text-[10px] uppercase tracking-widest text-text-muted"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="font-heading text-3xl md:text-4xl text-text mb-3">{resource.title}</h1>
          <p className="text-text-muted mb-8">{resource.short_description}</p>

          {/* Gallery — main viewer + thumbnail strip. Falls back to a
             placeholder if the resource has no media yet, or if a
             media file fails to load (404 / moved / missing on disk). */}
          <div className="mb-10">
            <BracketFrame className="overflow-hidden border border-border bg-ink-2">
              {active && !mediaFailed[active.id] ? (
                active.type === 'video' ? (
                  <video
                    key={active.id}
                    src={`/storage/${active.path}`}
                    controls
                    onError={() => markFailed(active.id)}
                    className="aspect-video w-full bg-black"
                  />
                ) : (
                  <img
                    key={active.id}
                    src={`/storage/${active.path}`}
                    alt={resource.title}
                    onError={() => markFailed(active.id)}
                    className="aspect-video w-full object-cover"
                  />
                )
              ) : (
                <div className="flex aspect-video items-center justify-center text-text-muted">
                  <FileArchive size={32} />
                </div>
              )}
            </BracketFrame>

            {media.length > 1 && (
              <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                {media.map((item, index) =>
                  mediaFailed[item.id] ? null : (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      className={[
                        'relative h-16 w-24 shrink-0 overflow-hidden rounded-md border transition-colors',
                        index === activeIndex ? 'border-accent' : 'border-border hover:border-accent-soft',
                      ].join(' ')}
                    >
                      {item.type === 'video' ? (
                        <>
                          <video
                            src={`/storage/${item.path}`}
                            className="h-full w-full object-cover"
                            muted
                            onError={() => markFailed(item.id)}
                          />
                          <span className="absolute bottom-1 right-1 rounded bg-black/70 p-0.5 text-white">
                            <Film size={10} />
                          </span>
                        </>
                      ) : (
                        <img
                          src={`/storage/${item.path}`}
                          alt=""
                          onError={() => markFailed(item.id)}
                          className="h-full w-full object-cover"
                        />
                      )}
                    </button>
                  )
                )}
              </div>
            )}
          </div>

          <div className="mb-10 flex items-center justify-between rounded-md border border-border p-5">
            <div>
              <p className="font-heading text-text">Code package</p>
              <p className="font-mono-ui text-[11px] uppercase tracking-widest text-text-muted">
                {resource.download_count} download{resource.download_count === 1 ? '' : 's'}
              </p>
            </div>

            {resource.has_code_bundle ? (
              <Button as="a" href={route('resources.download', resource.slug)} size="md">
                <Download size={15} /> Download
              </Button>
            ) : (
              <span className="text-sm text-text-muted">No file attached</span>
            )}
          </div>

          {resource.instructions && (
            <div>
              <h2 className="font-heading text-xl text-text mb-4">Setup instructions</h2>
              <div
                className="prose prose-invert max-w-none prose-headings:font-heading prose-a:text-accent"
                dangerouslySetInnerHTML={{ __html: resource.instructions }}
              />
            </div>
          )}
        </Container>
      </section>
    </Layout>
  );
}