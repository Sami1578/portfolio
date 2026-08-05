import AdminLayout from '../../../Layouts/AdminLayout';
import PageHeader from '../../../Components/admin/PageHeader';
import ServiceForm from './Form';

export default function ServicesCreate() {
  return (
    <AdminLayout title="New Service">
      <PageHeader eyebrow="Services" title="New service" />
      <ServiceForm />
    </AdminLayout>
  );
}
