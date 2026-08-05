import AdminLayout from '../../../Layouts/AdminLayout';
import PageHeader from '../../../Components/admin/PageHeader';
import SkillForm from './Form';

export default function SkillsCreate({ categories = [] }) {
  return (
    <AdminLayout title="New Skill">
      <PageHeader eyebrow="Skills" title="New skill" />
      <SkillForm categories={categories} />
    </AdminLayout>
  );
}
