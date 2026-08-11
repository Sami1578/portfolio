import AdminLayout from '../../../Layouts/AdminLayout';
import PageHeader from '../../../Components/admin/PageHeader';
import ResourceForm from './Form';

export default function ResourcesCreate() {
  return (
    <AdminLayout title="New Resource">
      <PageHeader eyebrow="Resources" title="New resource" />
      <ResourceForm />
    </AdminLayout>
  );
}
