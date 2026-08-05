import { useForm } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';
import PageHeader from '../../../Components/admin/PageHeader';
import Card from '../../../Components/admin/Card';
import AdminButton from '../../../Components/admin/AdminButton';
import FormField from '../../../Components/admin/form/FormField';
import TextInput from '../../../Components/admin/form/TextInput';
import ListRepeater from '../../../Components/admin/form/ListRepeater';
import GroupRepeater from '../../../Components/admin/form/GroupRepeater';

export default function AboutEdit({ about }) {
  const { data, setData, put, processing, errors } = useForm({
    eyebrow: about.eyebrow || '',
    heading: about.heading || '',
    paragraphs: about.paragraphs || [],
    fields: about.fields || [],
  });

  const resolve = (name) => (typeof route === 'function' ? route(name) : '#');

  const submit = (e) => {
    e.preventDefault();
    put(resolve('admin.about.update'), { preserveScroll: true });
  };

  return (
    <AdminLayout title="About">
      <PageHeader
        eyebrow="Content"
        title="About"
        description="The narrative section and the key-value detail list."
      />

      <form onSubmit={submit} className="flex flex-col gap-6">
        <Card title="Heading">
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField label="Eyebrow" htmlFor="eyebrow" error={errors.eyebrow} required>
              <TextInput id="eyebrow" value={data.eyebrow} onChange={(e) => setData('eyebrow', e.target.value)} invalid={!!errors.eyebrow} />
            </FormField>
            <FormField label="Heading" htmlFor="heading" error={errors.heading} required>
              <TextInput id="heading" value={data.heading} onChange={(e) => setData('heading', e.target.value)} invalid={!!errors.heading} />
            </FormField>
          </div>
        </Card>

        <Card title="Paragraphs" description="Each entry becomes a paragraph in the About body.">
          <ListRepeater
            items={data.paragraphs}
            onChange={(val) => setData('paragraphs', val)}
            placeholder="Write a paragraph…"
            addLabel="Add paragraph"
            multiline
            error={errors.paragraphs}
          />
        </Card>

        <Card title="Detail fields" description="The label/value list beside the narrative.">
          <GroupRepeater
            items={data.fields}
            onChange={(val) => setData('fields', val)}
            fields={[
              { key: 'label', placeholder: 'Role' },
              { key: 'value', placeholder: 'Full-Stack Developer' },
            ]}
            addLabel="Add field"
            error={errors.fields}
          />
        </Card>

        <div className="flex justify-end">
          <AdminButton type="submit" disabled={processing}>
            {processing ? 'Saving…' : 'Save changes'}
          </AdminButton>
        </div>
      </form>
    </AdminLayout>
  );
}
