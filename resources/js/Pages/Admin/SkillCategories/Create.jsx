import AdminLayout from '../../../Layouts/AdminLayout';
import PageHeader from '../../../Components/admin/PageHeader';
import SkillCategoryForm from './Form';

export default function SkillCategoriesCreate() {
  return (
    <AdminLayout title="New Category">
      <PageHeader eyebrow="Skill categories" title="New category" />
      <SkillCategoryForm />
    </AdminLayout>
  );
}
