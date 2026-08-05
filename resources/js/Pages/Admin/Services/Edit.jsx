import AdminLayout from '../../../Layouts/AdminLayout';
import PageHeader from '../../../Components/admin/PageHeader';
import ServiceForm from './Form';

export default function ServicesEdit({ service }) {
  return (
    <AdminLayout title="Edit Service">
      <PageHeader eyebrow="Services" title="Edit service" description={service.title} />
      <ServiceForm service={service} />
    </AdminLayout>
  );
}
