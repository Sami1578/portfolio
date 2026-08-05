import { useState } from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Menu, X, LogOut, ExternalLink } from 'lucide-react';
import Sidebar from '../Components/admin/Sidebar';
import FlashToast from '../Components/admin/FlashToast';
import ThemeToggle from '../Components/ui/ThemeToggle';

export default function AdminLayout({ title, children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { auth } = usePage().props;

  const resolve = (name) => (typeof route === 'function' ? route(name) : '#');

  const logout = () => router.post(resolve('logout'));

  return (
    <div className="min-h-screen bg-bg text-text">
      {title && <Head title={title} />}

      {/* Sidebar — desktop */}
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-border bg-surface lg:block">
        <Sidebar />
      </aside>

      {/* Sidebar — mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-text/40"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
          <aside className="absolute inset-y-0 left-0 w-64 border-r border-border bg-surface">
            <Sidebar onNavigate={() => setMobileOpen(false)} />
          </aside>
        </div>
      )}

      <div className="lg:pl-64">
        {/* Topbar */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-bg/80 px-4 backdrop-blur sm:px-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="text-text-muted transition-colors hover:text-text lg:hidden"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <span className="font-mono-ui text-xs uppercase tracking-[0.18em] text-text-muted">
              Portfolio CMS
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={resolve('home')}
              target="_blank"
              rel="noreferrer"
              className="hidden items-center gap-1.5 text-sm text-text-muted transition-colors hover:text-text sm:flex"
            >
              View site <ExternalLink size={14} />
            </a>
            <ThemeToggle />
            <span className="hidden text-sm text-text-muted sm:inline">{auth?.user?.name}</span>
            <button
              onClick={logout}
              className="flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-sm text-text transition-colors hover:border-border-strong"
            >
              <LogOut size={15} /> <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </header>

        <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:py-10">{children}</main>
      </div>

      <FlashToast />
    </div>
  );
}
