import { Link } from '@inertiajs/react';
import AdminLayout from '../../Layouts/AdminLayout';
import PageHeader from '../../Components/admin/PageHeader';
import Card from '../../Components/admin/Card';
import EmptyState from '../../Components/admin/EmptyState';
import { Mail, ArrowUpRight } from 'lucide-react';

export default function Dashboard({ stats = [], recentMessages = [] }) {
  return (
    <AdminLayout title="Dashboard">
      <PageHeader
        eyebrow="Overview"
        title="Dashboard"
        description="Manage everything that appears on your public portfolio."
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="group rounded-xl border border-border bg-surface p-5 transition-colors hover:border-border-strong"
          >
            <div className="flex items-start justify-between">
              <span className="font-display text-3xl tracking-tight text-text">{stat.value}</span>
              <ArrowUpRight
                size={16}
                className="text-text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </div>
            <p className="mt-2 font-mono-ui text-xs uppercase tracking-[0.14em] text-text-muted">
              {stat.label}
            </p>
          </Link>
        ))}
      </div>

      <div className="mt-6">
        <Card title="Recent messages" description="Latest submissions from your contact form.">
          {recentMessages.length ? (
            <ul className="flex flex-col divide-y divide-border">
              {recentMessages.map((msg) => (
                <li key={msg.id}>
                  <Link
                    href={typeof route === 'function' ? route('admin.messages.show', msg.id) : '#'}
                    className="flex items-center justify-between gap-4 py-3 transition-colors hover:text-accent"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-text">{msg.subject}</p>
                      <p className="truncate text-xs text-text-muted">
                        {msg.name} · {msg.email}
                      </p>
                    </div>
                    <span className="flex-shrink-0 font-mono-ui text-xs text-text-muted">
                      {new Date(msg.created_at).toLocaleDateString()}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <EmptyState icon={Mail} title="No messages yet" description="Contact form submissions will appear here." />
          )}
        </Card>
      </div>
    </AdminLayout>
  );
}
