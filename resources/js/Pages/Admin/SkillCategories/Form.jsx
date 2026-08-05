import { useForm } from '@inertiajs/react';
import Card from '../../../Components/admin/Card';
import AdminButton from '../../../Components/admin/AdminButton';
import FormField from '../../../Components/admin/form/FormField';
import TextInput from '../../../Components/admin/form/TextInput';

export default function SkillCategoryForm({ category = null }) {
  const isEdit = !!category;

  const { data, setData, post, put, processing, errors } = useForm({
    title: category?.title || '',
  });

  const resolve = (name, param) => (typeof route === 'function' ? route(name, param) : '#');

  const submit = (e) => {
    e.preventDefault();
    if (isEdit) {
      put(resolve('admin.skill-categories.update', category.id));
    } else {
      post(resolve('admin.skill-categories.store'));
    }
  };

  return (
    <form onSubmit={submit} className="flex flex-col gap-6">
      <Card>
        <FormField label="Title" htmlFor="title" error={errors.title} required>
          <TextInput id="title" value={data.title} onChange={(e) => setData('title', e.target.value)} invalid={!!errors.title} autoFocus />
        </FormField>
      </Card>

      <div className="flex justify-end gap-2">
        <AdminButton as="link" href={resolve('admin.skill-categories.index')} variant="secondary">
          Cancel
        </AdminButton>
        <AdminButton type="submit" disabled={processing}>
          {processing ? 'Saving…' : isEdit ? 'Update category' : 'Create category'}
        </AdminButton>
      </div>
    </form>
  );
}
