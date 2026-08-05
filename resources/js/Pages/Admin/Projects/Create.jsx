import AdminLayout from '../../../Layouts/AdminLayout';
import PageHeader from '../../../Components/admin/PageHeader';
import ProjectForm from './Form';

export default function ProjectsCreate() {
  return (
    <AdminLayout title="New Project">
      <PageHeader eyebrow="Projects" title="New project" />
      <ProjectForm />
    </AdminLayout>
  );
}
