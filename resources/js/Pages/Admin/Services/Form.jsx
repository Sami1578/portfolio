import { useForm } from '@inertiajs/react';
import Card from '../../../Components/admin/Card';
import AdminButton from '../../../Components/admin/AdminButton';
import FormField from '../../../Components/admin/form/FormField';
import TextInput from '../../../Components/admin/form/TextInput';
import TextArea from '../../../Components/admin/form/TextArea';

export default function ServiceForm({ service = null }) {
  const isEdit = !!service;

  const { data, setData, post, put, processing, errors } = useForm({
    icon: service?.icon || '',
    title: service?.title || '',
    description: service?.description || '',
  });

  const resolve = (name, param) => (typeof route === 'function' ? route(name, param) : '#');

  const submit = (e) => {
    e.preventDefault();
    if (isEdit) {
      put(resolve('admin.services.update', service.id));
    } else {
      post(resolve('admin.services.store'));
    }
  };

  return (
    <form onSubmit={submit} className="flex flex-col gap-6">
      <Card>
        <div className="flex flex-col gap-4">
          <FormField label="Title" htmlFor="title" error={errors.title} required>
            <TextInput id="title" value={data.title} onChange={(e) => setData('title', e.target.value)} invalid={!!errors.title} />
          </FormField>
          <FormField label="Icon" htmlFor="icon" error={errors.icon} hint="Icon name/key used by the frontend." required>
            <TextInput id="icon" value={data.icon} onChange={(e) => setData('icon', e.target.value)} invalid={!!errors.icon} />
          </FormField>
          <FormField label="Description" htmlFor="description" error={errors.description} required>
            <TextArea id="description" value={data.description} onChange={(e) => setData('description', e.target.value)} invalid={!!errors.description} />
          </FormField>
        </div>
      </Card>

      <div className="flex justify-end gap-2">
        <AdminButton as="link" href={resolve('admin.services.index')} variant="secondary">
          Cancel
        </AdminButton>
        <AdminButton type="submit" disabled={processing}>
          {processing ? 'Saving…' : isEdit ? 'Update service' : 'Create service'}
        </AdminButton>
      </div>
    </form>
  );
}
