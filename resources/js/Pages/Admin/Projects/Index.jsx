import AdminLayout from '../../../Layouts/AdminLayout';
import PageHeader from '../../../Components/admin/PageHeader';
import DataTable from '../../../Components/admin/DataTable';
import AdminButton from '../../../Components/admin/AdminButton';
import DeleteButton from '../../../Components/admin/DeleteButton';
import { Plus, FolderKanban, Star } from 'lucide-react';

export default function ProjectsIndex({ projects = [] }) {
  const resolve = (name, param) => (typeof route === 'function' ? route(name, param) : '#');

  const columns = [
    {
      key: 'sort_order',
      header: '#',
      className: 'w-10',
      render: (row) => <span className="font-mono-ui text-xs text-text-muted">{row.sort_order}</span>,
    },
    {
      key: 'title',
      header: 'Project',
      render: (row) => (
        <div>
          <span className="font-medium">{row.title}</span>
          {row.subtitle && (
            <p className="mt-0.5 text-xs text-text-muted">{row.subtitle}</p>
          )}
        </div>
      ),
    },
    {
      key: 'architecture_tag',
      header: 'Architecture',
      render: (row) => (
        <span className="font-mono-ui text-xs text-text-muted">{row.architecture_tag || '—'}</span>
      ),
    },
    {
      key: 'is_featured',
      header: 'Featured',
      className: 'text-center',
      render: (row) =>
        row.is_featured ? (
          <Star size={14} className="mx-auto fill-accent text-accent" />
        ) : (
          <span className="text-text-muted">—</span>
        ),
    },
    {
      key: 'actions',
      header: '',
      className: 'text-right w-px whitespace-nowrap',
      render: (row) => (
        <div className="flex items-center justify-end gap-2">
          <AdminButton as="link" href={resolve('admin.projects.edit', row.id)} variant="secondary" size="sm">
            Edit
          </AdminButton>
          <DeleteButton href={resolve('admin.projects.destroy', row.id)} iconOnly />
        </div>
      ),
    },
  ];

  return (
    <AdminLayout title="Projects">
      <PageHeader
        eyebrow="Content"
        title="Projects"
        description="Case studies and work shown in the Projects section."
        actions={
          <AdminButton as="link" href={resolve('admin.projects.create')}>
            <Plus size={15} /> New project
          </AdminButton>
        }
      />

      <DataTable
        columns={columns}
        rows={projects}
        empty={{
          icon: FolderKanban,
          title: 'No projects yet',
          description: 'Add your first case study or project.',
          action: (
            <AdminButton as="link" href={resolve('admin.projects.create')} size="sm">
              <Plus size={14} /> New project
            </AdminButton>
          ),
        }}
      />
    </AdminLayout>
  );
}
