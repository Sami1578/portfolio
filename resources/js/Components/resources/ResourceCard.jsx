import React from 'react';
import { Link } from '@inertiajs/react';
import { Download, FileArchive, Images } from 'lucide-react';
import BracketFrame from '../ui/BracketFrame';

export default function ResourceCard({ resource }) {
  return (
    <Link href={route('resources.show', resource.slug)} className="group block">
      <BracketFrame className="flex h-full flex-col overflow-hidden border border-border bg-surface/40 transition-colors group-hover:border-accent-soft">
        <div className="relative aspect-video w-full overflow-hidden bg-ink-2">
          {resource.thumbnail_path ? (
            <img
              src={`/storage/${resource.thumbnail_path}`}
              alt={resource.title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-text-muted">
              <FileArchive size={28} />
            </div>
          )}

          {resource.media_count > 1 && (
            <span className="absolute bottom-2 right-2 inline-flex items-center gap-1 rounded-full bg-black/70 px-2 py-0.5 font-mono-ui text-[10px] uppercase tracking-widest text-white">
              <Images size={11} /> {resource.media_count}
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-3 p-5">
          <h3 className="font-heading text-lg text-text">{resource.title}</h3>
          <p className="line-clamp-2 text-sm text-text-muted">{resource.short_description}</p>

          {resource.tech_tags?.length > 0 && (
            <div className="mt-auto flex flex-wrap gap-1.5 pt-1">
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

          <div className="flex items-center justify-between border-t border-border pt-3 font-mono-ui text-[11px] uppercase tracking-widest text-text-muted">
            <span className="inline-flex items-center gap-1">
              <Download size={12} /> {resource.download_count}
            </span>
            <span className="text-accent transition-colors group-hover:text-accent-deep">View →</span>
          </div>
        </div>
      </BracketFrame>
    </Link>
  );
}
