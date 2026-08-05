import AdminLayout from '../../../Layouts/AdminLayout';
import PageHeader from '../../../Components/admin/PageHeader';
import SkillCategoryForm from './Form';

export default function SkillCategoriesEdit({ category }) {
  return (
    <AdminLayout title="Edit Category">
      <PageHeader eyebrow="Skill categories" title="Edit category" description={category.title} />
      <SkillCategoryForm category={category} />
    </AdminLayout>
  );
}
