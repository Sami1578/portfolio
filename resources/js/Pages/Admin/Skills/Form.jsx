import { useForm } from '@inertiajs/react';
import Card from '../../../Components/admin/Card';
import AdminButton from '../../../Components/admin/AdminButton';
import FormField from '../../../Components/admin/form/FormField';
import TextInput from '../../../Components/admin/form/TextInput';
import SelectInput from '../../../Components/admin/form/SelectInput';

const LEVEL_OPTIONS = [
  { value: 'Expert',       label: 'Expert' },
  { value: 'Advanced',     label: 'Advanced' },
  { value: 'Intermediate', label: 'Intermediate' },
  { value: 'Beginner',     label: 'Beginner' },
];

export default function SkillForm({ skill = null, categories = [] }) {
  const isEdit = !!skill;

  const { data, setData, post, put, processing, errors } = useForm({
    skill_category_id: skill?.skill_category_id ?? '',
    name:  skill?.name  ?? '',
    icon:  skill?.icon  ?? '',
    color: skill?.color ?? '',
    level: skill?.level ?? '',
  });

  const resolve = (name, param) => (typeof route === 'function' ? route(name, param) : '#');

  const submit = (e) => {
    e.preventDefault();
    if (isEdit) {
      put(resolve('admin.skills.update', skill.id));
    } else {
      post(resolve('admin.skills.store'));
    }
  };

  const categoryOptions = categories.map((c) => ({ value: c.id, label: c.title }));

  return (
    <form onSubmit={submit} className="flex flex-col gap-6">
      <Card>
        <div className="flex flex-col gap-4">
          <FormField label="Category" htmlFor="skill_category_id" error={errors.skill_category_id} required>
            <SelectInput
              id="skill_category_id"
              value={data.skill_category_id}
              onChange={(e) => setData('skill_category_id', e.target.value)}
              options={categoryOptions}
              placeholder="Select a category…"
              invalid={!!errors.skill_category_id}
            />
          </FormField>

          <FormField label="Name" htmlFor="name" error={errors.name} required>
            <TextInput
              id="name"
              value={data.name}
              onChange={(e) => setData('name', e.target.value)}
              invalid={!!errors.name}
              autoFocus
            />
          </FormField>

          <FormField label="Icon" htmlFor="icon" error={errors.icon} hint="Icon identifier used by the frontend (e.g. SiLaravel)." required>
            <TextInput
              id="icon"
              value={data.icon}
              onChange={(e) => setData('icon', e.target.value)}
              invalid={!!errors.icon}
            />
          </FormField>

          <FormField label="Color" htmlFor="color" error={errors.color} hint="Tailwind color class or hex (e.g. #FF6B6B or text-red-500)." required>
            <TextInput
              id="color"
              value={data.color}
              onChange={(e) => setData('color', e.target.value)}
              invalid={!!errors.color}
            />
          </FormField>

          <FormField label="Level" htmlFor="level" error={errors.level} required>
            <SelectInput
              id="level"
              value={data.level}
              onChange={(e) => setData('level', e.target.value)}
              options={LEVEL_OPTIONS}
              placeholder="Select a level…"
              invalid={!!errors.level}
            />
          </FormField>
        </div>
      </Card>

      <div className="flex justify-end gap-2">
        <AdminButton as="link" href={resolve('admin.skills.index')} variant="secondary">
          Cancel
        </AdminButton>
        <AdminButton type="submit" disabled={processing}>
          {processing ? 'Saving…' : isEdit ? 'Update skill' : 'Create skill'}
        </AdminButton>
      </div>
    </form>
  );
}
