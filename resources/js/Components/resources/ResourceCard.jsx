import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import { Download, Images, ArrowUpRight, FileCode2 } from 'lucide-react';
import BracketFrame from '../ui/BracketFrame';

export default function ResourceCard({ resource }) {
  const [thumbFailed, setThumbFailed] = useState(false);

  const media = resource.media ?? [];
  const cover = media[0];
  const showThumb = cover?.url && cover.type !== 'video' && !thumbFailed;
  const mediaCount = media.length;

  return (
    <Link href={route('resources.show', resource.slug)} className="group block h-full">
      <BracketFrame
        className="relative flex h-full flex-col overflow-hidden border border-border bg-surface/40
                   transition-all duration-300 group-hover:-translate-y-1 group-hover:border-accent-soft
                   group-hover:shadow-[0_16px_40px_-16px_rgba(201,161,95,0.35)]"
      >
        {/* Cover — only rendered when real media exists. No image, no reserved
           box: text content simply takes the full card instead of showing a
           placeholder icon for something that was never uploaded. */}
        {showThumb && (
          <div className="relative aspect-video w-full overflow-hidden bg-ink-2">
            <img
              src={cover.url}
              alt={resource.title}
              onError={() => setThumbFailed(true)}
              className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent opacity-80" />

            {mediaCount > 1 && (
              <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full border border-white/10 bg-black/60 px-2 py-0.5 font-mono-ui text-[10px] uppercase tracking-widest text-white backdrop-blur-sm">
                <Images size={11} /> {mediaCount}
              </span>
            )}

            {resource.tech_tags?.length > 0 && (
              <div className="absolute inset-x-0 bottom-0 flex flex-wrap gap-1.5 p-4">
                {resource.tech_tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/15 bg-black/50 px-2 py-0.5 font-mono-ui text-[10px] uppercase tracking-widest text-white/90 backdrop-blur-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="flex flex-1 flex-col gap-4 p-6">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-heading text-lg leading-snug text-text transition-colors group-hover:text-accent">
              {resource.title}
            </h3>
            {/* Compact brand mark for cardless resources — keeps the header
               from feeling empty without faking a missing image. */}
            {!showThumb && (
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-border text-accent">
                <FileCode2 size={15} />
              </span>
            )}
          </div>

          <p className="line-clamp-2 text-sm leading-relaxed text-text-muted">
            {resource.short_description}
          </p>

          {/* Tags render inline here only when there's no image to host them
             as an overlay above. */}
          {!showThumb && resource.tech_tags?.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {resource.tech_tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border px-2 py-0.5 font-mono-ui text-[10px] uppercase tracking-widest text-text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="mt-auto flex items-center justify-between border-t border-border pt-4 font-mono-ui text-[11px] uppercase tracking-widest text-text-muted">
            <span className="inline-flex items-center gap-1.5">
              <Download size={12} /> {resource.download_count ?? 0}
            </span>
            <span className="inline-flex items-center gap-1 text-accent transition-all duration-200 group-hover:gap-1.5 group-hover:text-accent-deep">
              Get resource
              <ArrowUpRight size={12} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </div>
        </div>
      </BracketFrame>
    </Link>
  );
}