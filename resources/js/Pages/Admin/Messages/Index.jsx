import { Link } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';
import PageHeader from '../../../Components/admin/PageHeader';
import DataTable from '../../../Components/admin/DataTable';
import DeleteButton from '../../../Components/admin/DeleteButton';
import EmptyState from '../../../Components/admin/EmptyState';
import { Mail } from 'lucide-react';

export default function MessagesIndex({ messages = [] }) {
  const resolve = (name, param) => (typeof route === 'function' ? route(name, param) : '#');

  const columns = [
    {
      key: 'from',
      header: 'From',
      render: (row) => (
        <div>
          <p className="font-medium text-text">{row.name}</p>
          <p className="text-xs text-text-muted">{row.email}</p>
        </div>
      ),
    },
    {
      key: 'subject',
      header: 'Subject',
      render: (row) => <span className="line-clamp-1">{row.subject}</span>,
    },
    {
      key: 'created_at',
      header: 'Received',
      className: 'whitespace-nowrap',
      render: (row) => (
        <span className="font-mono-ui text-xs text-text-muted">
          {new Date(row.created_at).toLocaleDateString()}
        </span>
      ),
    },
    {
      key: 'actions',
      header: '',
      className: 'text-right w-px whitespace-nowrap',
      render: (row) => (
        <div className="flex items-center justify-end gap-2">
          <Link
            href={resolve('admin.messages.show', row.id)}
            className="rounded-md border border-border px-3 py-1.5 text-xs text-text-muted transition-colors hover:border-border-strong hover:text-text"
          >
            View
          </Link>
          <DeleteButton href={resolve('admin.messages.destroy', row.id)} iconOnly />
        </div>
      ),
    },
  ];

  return (
    <AdminLayout title="Messages">
      <PageHeader
        eyebrow="Inbox"
        title="Messages"
        description="Contact form submissions from your portfolio site."
      />

      {messages.length ? (
        <DataTable columns={columns} rows={messages} />
      ) : (
        <EmptyState
          icon={Mail}
          title="No messages yet"
          description="Contact form submissions will appear here."
        />
      )}
    </AdminLayout>
  );
}
