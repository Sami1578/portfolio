import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import { Download, ArrowRight, FileCode2 } from 'lucide-react';
import BracketFrame from '../ui/BracketFrame';

export default function ResourceCard({ resource }) {
  const [thumbFailed, setThumbFailed] = useState(false);

  const media = resource.media ?? [];
  const cover = media[0];
  const showThumb = cover?.url && cover.type !== 'video' && !thumbFailed;
  const tags = resource.tech_tags ?? [];

  return (
    <Link href={route('resources.show', resource.slug)} className="group block h-full">
      <BracketFrame
        className="flex h-full min-h-[13rem] overflow-hidden border border-border bg-surface/40 transition-colors
                   duration-300 group-hover:border-accent-soft"
      >
        {/* Full-height side panel — same split-screen idea as the hero
           identity card, scaled down. Nothing is rendered here at all when
           there's no media, so the row just becomes a single content column
           instead of reserving empty space. */}
        {showThumb && (
          <div className="relative w-2/5 shrink-0 overflow-hidden bg-ink-2">
            <img
              src={cover.url}
              alt={resource.title}
              onError={() => setThumbFailed(true)}
              className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-r from-transparent to-surface/40" />
          </div>
        )}

        <div className="flex flex-1 flex-col gap-3 p-6">
          <div className="flex items-start gap-2.5">
            {!showThumb && (
              <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center text-accent">
                <FileCode2 size={15} />
              </span>
            )}
            <h3 className="font-heading text-lg leading-snug text-text transition-colors group-hover:text-accent">
              {resource.title}
            </h3>
          </div>

          <p className="line-clamp-2 flex-1 text-sm leading-relaxed text-text-muted">
            {resource.short_description}
          </p>

          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 font-mono-ui text-[10px] uppercase tracking-widest text-text-muted">
              {tags.slice(0, 3).map((tag, i) => (
                <React.Fragment key={tag}>
                  {i > 0 && <span className="text-border">·</span>}
                  <span>{tag}</span>
                </React.Fragment>
              ))}
            </div>
          )}

          <div className="mt-auto flex items-center justify-between border-t border-border pt-3">
            <span className="inline-flex items-center gap-1.5 font-mono-ui text-[11px] text-text-muted">
              <Download size={12} /> {resource.download_count ?? 0}
            </span>
            <span className="inline-flex items-center gap-1 font-mono-ui text-[11px] uppercase tracking-widest text-accent transition-all duration-200 group-hover:gap-2 group-hover:text-accent-deep">
              Download
              <ArrowRight size={12} className="transition-transform duration-200 group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </BracketFrame>
    </Link>
  );
}