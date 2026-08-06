import { Link, router } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';
import PageHeader from '../../../Components/admin/PageHeader';
import DataTable from '../../../Components/admin/DataTable';
import AdminButton from '../../../Components/admin/AdminButton';
import DeleteButton from '../../../Components/admin/DeleteButton';
import { MessageSquare, Check, X } from 'lucide-react';

const TABS = [
  { key: 'pending', label: 'Pending' },
  { key: 'approved', label: 'Approved' },
  { key: 'rejected', label: 'Rejected' },
  { key: 'all', label: 'All' },
];

export default function CommentsIndex({ comments = [], status = 'pending' }) {
  const resolve = (name, param) => (typeof route === 'function' ? route(name, param) : '#');

  const columns = [
    {
      key: 'post',
      header: 'Post',
      render: (row) => (
        <span className="font-medium">{row.post?.title ?? '—'}</span>
      ),
    },
    {
      key: 'author',
      header: 'Author',
      render: (row) => (
        <div>
          <span className="text-text">{row.author_name}</span>
          <p className="text-xs text-text-muted">{row.author_email}</p>
          {row.parent && (
            <p className="mt-0.5 text-xs text-accent">↳ reply to {row.parent.author_name}</p>
          )}
        </div>
      ),
    },
    {
      key: 'body',
      header: 'Comment',
      render: (row) => <p className="max-w-md truncate text-text-muted">{row.body}</p>,
    },
    {
      key: 'status',
      header: 'Status',
      render: (row) => (
        <span
          className={`rounded-full px-2 py-0.5 text-xs font-medium ${
            row.status === 'approved'
              ? 'bg-status/10 text-status'
              : row.status === 'rejected'
                ? 'bg-accent/10 text-accent'
                : 'bg-border/60 text-text-muted'
          }`}
        >
          {row.status}
        </span>
      ),
    },
    {
      key: 'actions',
      header: '',
      className: 'text-right w-px whitespace-nowrap',
      render: (row) => (
        <div className="flex items-center justify-end gap-2">
          {row.status !== 'approved' && (
            <AdminButton onClick={() => router.patch(resolve('admin.comments.approve', row.id), {}, { preserveScroll: true })} variant="secondary" size="sm">
              <Check size={14} /> Approve
            </AdminButton>
          )}
          {row.status !== 'rejected' && (
            <AdminButton onClick={() => router.patch(resolve('admin.comments.reject', row.id), {}, { preserveScroll: true })} variant="secondary" size="sm">
              <X size={14} /> Reject
            </AdminButton>
          )}
          <DeleteButton href={resolve('admin.comments.destroy', row.id)} iconOnly />
        </div>
      ),
    },
  ];

  return (
    <AdminLayout title="Comments">
      <PageHeader
        eyebrow="Inbox"
        title="Comments"
        description="Review and moderate comments left on blog posts."
      />

      <div className="mb-5 flex items-center gap-1 border-b border-border">
        {TABS.map((tab) => (
          <Link
            key={tab.key}
            href={resolve('admin.comments.index') + `?status=${tab.key}`}
            className={`border-b-2 px-3 py-2 text-sm transition-colors ${
              status === tab.key
                ? 'border-accent text-accent'
                : 'border-transparent text-text-muted hover:text-text'
            }`}
          >
            {tab.label}
          </Link>
        ))}
      </div>

      <DataTable
        columns={columns}
        rows={comments}
        empty={{
          icon: MessageSquare,
          title: 'No comments',
          description: 'Nothing here yet.',
        }}
      />
    </AdminLayout>
  );
}
