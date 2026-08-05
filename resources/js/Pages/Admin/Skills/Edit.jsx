import AdminLayout from '../../../Layouts/AdminLayout';
import PageHeader from '../../../Components/admin/PageHeader';
import SkillForm from './Form';

export default function SkillsEdit({ skill, categories = [] }) {
  return (
    <AdminLayout title="Edit Skill">
      <PageHeader eyebrow="Skills" title="Edit skill" description={skill.name} />
      <SkillForm skill={skill} categories={categories} />
    </AdminLayout>
  );
}
