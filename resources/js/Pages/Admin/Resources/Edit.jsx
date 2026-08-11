import AdminLayout from '../../../Layouts/AdminLayout';
import PageHeader from '../../../Components/admin/PageHeader';
import ResourceForm from './Form';

export default function ResourcesEdit({ resource }) {
  return (
    <AdminLayout title="Edit Resource">
      <PageHeader eyebrow="Resources" title="Edit resource" description={resource.title} />
      <ResourceForm resource={resource} />
    </AdminLayout>
  );
}
