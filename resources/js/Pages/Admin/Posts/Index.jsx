import AdminLayout from '../../../Layouts/AdminLayout';
import PageHeader from '../../../Components/admin/PageHeader';
import DataTable from '../../../Components/admin/DataTable';
import AdminButton from '../../../Components/admin/AdminButton';
import DeleteButton from '../../../Components/admin/DeleteButton';
import Pagination from '../../../Components/ui/Pagination';
import { Plus, BookOpen, Eye } from 'lucide-react';

export default function PostsIndex({ posts = { data: [], links: [] } }) {
  const resolve = (name, param) => (typeof route === 'function' ? route(name, param) : '#');
  const rows = posts.data ?? [];

  const columns = [
    {
      key: 'title',
      header: 'Post',
      render: (row) => (
        <div>
          <span className="font-medium">{row.title}</span>
          {row.excerpt && <p className="mt-0.5 max-w-md truncate text-xs text-text-muted">{row.excerpt}</p>}
        </div>
      ),
    },
    {
      key: 'is_published',
      header: 'Status',
      render: (row) =>
        row.is_published ? (
          <span className="rounded-full bg-status/10 px-2 py-0.5 text-xs font-medium text-status">Published</span>
        ) : (
          <span className="rounded-full bg-border/60 px-2 py-0.5 text-xs font-medium text-text-muted">Draft</span>
        ),
    },
    {
      key: 'view_count',
      header: 'Views',
      className: 'text-center',
      render: (row) => (
        <span className="inline-flex items-center gap-1 text-xs text-text-muted">
          <Eye size={13} /> {row.view_count}
        </span>
      ),
    },
    {
      key: 'actions',
      header: '',
      className: 'text-right w-px whitespace-nowrap',
      render: (row) => (
        <div className="flex items-center justify-end gap-2">
          <AdminButton as="link" href={resolve('admin.posts.edit', row.id)} variant="secondary" size="sm">
            Edit
          </AdminButton>
          <DeleteButton href={resolve('admin.posts.destroy', row.id)} iconOnly />
        </div>
      ),
    },
  ];

  return (
    <AdminLayout title="Blog Posts">
      <PageHeader
        eyebrow="Content"
        title="Blog Posts"
        description="Write and manage articles shown on the public blog."
        actions={
          <AdminButton as="link" href={resolve('admin.posts.create')}>
            <Plus size={15} /> New post
          </AdminButton>
        }
      />

      <DataTable
        columns={columns}
        rows={rows}
        empty={{
          icon: BookOpen,
          title: 'No posts yet',
          description: 'Write your first blog post.',
          action: (
            <AdminButton as="link" href={resolve('admin.posts.create')} size="sm">
              <Plus size={14} /> New post
            </AdminButton>
          ),
        }}
      />

      {rows.length > 0 && <Pagination links={posts.links} />}
    </AdminLayout>
  );
}
