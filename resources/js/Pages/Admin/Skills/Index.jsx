import AdminLayout from '../../../Layouts/AdminLayout';
import PageHeader from '../../../Components/admin/PageHeader';
import DataTable from '../../../Components/admin/DataTable';
import AdminButton from '../../../Components/admin/AdminButton';
import DeleteButton from '../../../Components/admin/DeleteButton';
import { Plus, Layers } from 'lucide-react';

export default function SkillsIndex({ skills = [] }) {
  const resolve = (name, param) => (typeof route === 'function' ? route(name, param) : '#');

  const columns = [
    {
      key: 'name',
      header: 'Skill',
      render: (row) => <span className="font-medium">{row.name}</span>,
    },
    {
      key: 'category',
      header: 'Category',
      render: (row) => (
        <span className="text-text-muted">{row.category?.title ?? '—'}</span>
      ),
    },
    {
      key: 'icon',
      header: 'Icon',
      render: (row) => (
        <span className="font-mono-ui text-xs text-text-muted">{row.icon}</span>
      ),
    },
    {
      key: 'level',
      header: 'Level',
      render: (row) => (
        <span className="rounded-full border border-border px-2 py-0.5 font-mono-ui text-xs text-text-muted">
          {row.level}
        </span>
      ),
    },
    {
      key: 'actions',
      header: '',
      className: 'text-right w-px whitespace-nowrap',
      render: (row) => (
        <div className="flex items-center justify-end gap-2">
          <AdminButton as="link" href={resolve('admin.skills.edit', row.id)} variant="secondary" size="sm">
            Edit
          </AdminButton>
          <DeleteButton href={resolve('admin.skills.destroy', row.id)} iconOnly />
        </div>
      ),
    },
  ];

  return (
    <AdminLayout title="Skills">
      <PageHeader
        eyebrow="Content"
        title="Skills"
        description="Individual skills shown in the Skills section."
        actions={
          <AdminButton as="link" href={resolve('admin.skills.create')}>
            <Plus size={15} /> New skill
          </AdminButton>
        }
      />

      <DataTable
        columns={columns}
        rows={skills}
        empty={{
          icon: Layers,
          title: 'No skills yet',
          description: 'Add skills after creating at least one skill category.',
          action: (
            <AdminButton as="link" href={resolve('admin.skills.create')} size="sm">
              <Plus size={14} /> New skill
            </AdminButton>
          ),
        }}
      />
    </AdminLayout>
  );
}
