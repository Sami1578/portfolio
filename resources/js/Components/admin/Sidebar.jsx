import { Link, usePage } from '@inertiajs/react';
import {
  LayoutDashboard,
  User,
  FileText,
  Wrench,
  FolderKanban,
  Layers,
  Tags,
  Mail,
  Phone,
  BookOpen,
  MessageSquare,
} from 'lucide-react';

const nav = [
  { section: 'Overview', items: [{ label: 'Dashboard', href: 'admin.dashboard', icon: LayoutDashboard }] },
  {
    section: 'Content',
    items: [
      { label: 'Profile', href: 'admin.profile.edit', icon: User },
      { label: 'About', href: 'admin.about.edit', icon: FileText },
      { label: 'Services', href: 'admin.services.index', icon: Wrench },
      { label: 'Projects', href: 'admin.projects.index', icon: FolderKanban },
      { label: 'Skill Categories', href: 'admin.skill-categories.index', icon: Tags },
      { label: 'Skills', href: 'admin.skills.index', icon: Layers },
      { label: 'Blog Posts', href: 'admin.posts.index', icon: BookOpen },
      { label: 'Contact Details', href: 'admin.contact.edit', icon: Phone },
    ],
  },
  {
    section: 'Inbox',
    items: [
      { label: 'Messages', href: 'admin.messages.index', icon: Mail },
      { label: 'Comments', href: 'admin.comments.index', icon: MessageSquare },
    ],
  },
];

export default function Sidebar({ onNavigate }) {
  const { url } = usePage();

  // route() is provided globally by Ziggy in Laravel. Fall back gracefully.
  const resolve = (name) => (typeof route === 'function' ? route(name) : '#');
  const isActive = (name) => {
    try {
      return typeof route === 'function' ? route().current(name) : false;
    } catch {
      return false;
    }
  };

  return (
    <nav className="flex h-full flex-col gap-8 p-6">
      <Link
        href={resolve('admin.dashboard')}
        className="font-display text-xl tracking-tight text-text"
        onClick={onNavigate}
      >
        Admin<span className="text-accent">.</span>
      </Link>

      <div className="flex flex-col gap-7">
        {nav.map((group) => (
          <div key={group.section} className="flex flex-col gap-2">
            <p className="font-mono-ui text-[11px] uppercase tracking-[0.18em] text-text-muted">
              {group.section}
            </p>
            <ul className="flex flex-col gap-0.5">
              {group.items.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href) || url.startsWith(resolve(item.href).replace(window.location.origin, ''));
                return (
                  <li key={item.href}>
                    <Link
                      href={resolve(item.href)}
                      onClick={onNavigate}
                      className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
                        active
                          ? 'bg-accent/10 text-accent'
                          : 'text-text-muted hover:bg-border/40 hover:text-text'
                      }`}
                    >
                      <Icon size={17} strokeWidth={1.75} />
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </nav>
  );
}
