import AdminLayout from '../../../Layouts/AdminLayout';
import PageHeader from '../../../Components/admin/PageHeader';
import ProjectForm from './Form';

export default function ProjectsEdit({ project }) {
  return (
    <AdminLayout title="Edit Project">
      <PageHeader eyebrow="Projects" title="Edit project" description={project.title} />
      <ProjectForm project={project} />
    </AdminLayout>
  );
}
