import AdminLayout from '../../../Layouts/AdminLayout';
import PageHeader from '../../../Components/admin/PageHeader';
import DataTable from '../../../Components/admin/DataTable';
import AdminButton from '../../../Components/admin/AdminButton';
import DeleteButton from '../../../Components/admin/DeleteButton';
import { Plus, Tags } from 'lucide-react';

export default function SkillCategoriesIndex({ categories = [] }) {
  const resolve = (name, param) => (typeof route === 'function' ? route(name, param) : '#');

  const columns = [
    { key: 'title', header: 'Category', render: (row) => <span className="font-medium">{row.title}</span> },
    {
      key: 'skills_count',
      header: 'Skills',
      render: (row) => <span className="text-text-muted">{row.skills_count}</span>,
    },
    {
      key: 'actions',
      header: '',
      className: 'text-right w-px whitespace-nowrap',
      render: (row) => (
        <div className="flex items-center justify-end gap-2">
          <AdminButton as="link" href={resolve('admin.skill-categories.edit', row.id)} variant="secondary" size="sm">
            Edit
          </AdminButton>
          <DeleteButton
            href={resolve('admin.skill-categories.destroy', row.id)}
            confirmMessage="Delete this category? Its skills will also be removed."
            iconOnly
          />
        </div>
      ),
    },
  ];

  return (
    <AdminLayout title="Skill Categories">
      <PageHeader
        eyebrow="Content"
        title="Skill categories"
        description="Group your skills (e.g. Backend, Frontend)."
        actions={
          <AdminButton as="link" href={resolve('admin.skill-categories.create')}>
            <Plus size={15} /> New category
          </AdminButton>
        }
      />

      <DataTable
        columns={columns}
        rows={categories}
        empty={{
          icon: Tags,
          title: 'No categories yet',
          description: 'Create a category before adding skills to it.',
          action: (
            <AdminButton as="link" href={resolve('admin.skill-categories.create')} size="sm">
              <Plus size={14} /> New category
            </AdminButton>
          ),
        }}
      />
    </AdminLayout>
  );
}
