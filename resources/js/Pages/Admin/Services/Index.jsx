import AdminLayout from '../../../Layouts/AdminLayout';
import PageHeader from '../../../Components/admin/PageHeader';
import DataTable from '../../../Components/admin/DataTable';
import AdminButton from '../../../Components/admin/AdminButton';
import DeleteButton from '../../../Components/admin/DeleteButton';
import { Plus, Wrench } from 'lucide-react';

export default function ServicesIndex({ services = [] }) {
  const resolve = (name, param) =>
    typeof route === 'function' ? route(name, param) : '#';

  const columns = [
    { key: 'title', header: 'Title', render: (row) => <span className="font-medium">{row.title}</span> },
    { key: 'icon', header: 'Icon', render: (row) => <span className="font-mono-ui text-xs text-text-muted">{row.icon}</span> },
    {
      key: 'description',
      header: 'Description',
      render: (row) => <span className="line-clamp-1 text-text-muted">{row.description}</span>,
    },
    {
      key: 'actions',
      header: '',
      className: 'text-right w-px whitespace-nowrap',
      render: (row) => (
        <div className="flex items-center justify-end gap-2">
          <AdminButton as="link" href={resolve('admin.services.edit', row.id)} variant="secondary" size="sm">
            Edit
          </AdminButton>
          <DeleteButton href={resolve('admin.services.destroy', row.id)} iconOnly />
        </div>
      ),
    },
  ];

  return (
    <AdminLayout title="Services">
      <PageHeader
        eyebrow="Content"
        title="Services"
        actions={
          <AdminButton as="link" href={resolve('admin.services.create')}>
            <Plus size={15} /> New service
          </AdminButton>
        }
      />

      <DataTable
        columns={columns}
        rows={services}
        empty={{
          icon: Wrench,
          title: 'No services yet',
          description: 'Add the services you offer to show them on your site.',
          action: (
            <AdminButton as="link" href={resolve('admin.services.create')} size="sm">
              <Plus size={14} /> New service
            </AdminButton>
          ),
        }}
      />
    </AdminLayout>
  );
}
