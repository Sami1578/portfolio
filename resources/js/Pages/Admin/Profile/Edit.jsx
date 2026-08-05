import { useForm } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';
import PageHeader from '../../../Components/admin/PageHeader';
import Card from '../../../Components/admin/Card';
import AdminButton from '../../../Components/admin/AdminButton';
import FormField from '../../../Components/admin/form/FormField';
import TextInput from '../../../Components/admin/form/TextInput';
import TextArea from '../../../Components/admin/form/TextArea';
import Toggle from '../../../Components/admin/form/Toggle';
import ListRepeater from '../../../Components/admin/form/ListRepeater';
import GroupRepeater from '../../../Components/admin/form/GroupRepeater';

export default function ProfileEdit({ profile }) {
  const { data, setData, put, processing, errors } = useForm({
    name: profile.name || '',
    initials: profile.initials || '',
    title: profile.title || '',
    tagline: profile.tagline || '',
    available: profile.available ?? true,
    availability_label: profile.availability_label || '',
    location: profile.location || '',
    stack: profile.stack || [],
    stats: profile.stats || [],
  });

  const resolve = (name) => (typeof route === 'function' ? route(name) : '#');

  const submit = (e) => {
    e.preventDefault();
    put(resolve('admin.profile.update'), { preserveScroll: true });
  };

  return (
    <AdminLayout title="Profile">
      <PageHeader
        eyebrow="Content"
        title="Profile"
        description="The hero identity, availability status, and headline stats."
      />

      <form onSubmit={submit} className="flex flex-col gap-6">
        <Card title="Identity">
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField label="Name" htmlFor="name" error={errors.name} required>
              <TextInput id="name" value={data.name} onChange={(e) => setData('name', e.target.value)} invalid={!!errors.name} />
            </FormField>
            <FormField label="Initials" htmlFor="initials" error={errors.initials} hint="Shown in the avatar mark." required>
              <TextInput id="initials" value={data.initials} onChange={(e) => setData('initials', e.target.value)} invalid={!!errors.initials} />
            </FormField>
            <FormField label="Title" htmlFor="title" error={errors.title} required>
              <TextInput id="title" value={data.title} onChange={(e) => setData('title', e.target.value)} invalid={!!errors.title} />
            </FormField>
            <FormField label="Location" htmlFor="location" error={errors.location} required>
              <TextInput id="location" value={data.location} onChange={(e) => setData('location', e.target.value)} invalid={!!errors.location} />
            </FormField>
          </div>
          <div className="mt-4">
            <FormField label="Tagline" htmlFor="tagline" error={errors.tagline} required>
              <TextArea id="tagline" value={data.tagline} onChange={(e) => setData('tagline', e.target.value)} invalid={!!errors.tagline} />
            </FormField>
          </div>
        </Card>

        <Card title="Availability">
          <div className="flex flex-col gap-4">
            <Toggle
              label="Available for work"
              description="Controls the status dot shown on the site."
              checked={data.available}
              onChange={(val) => setData('available', val)}
            />
            <FormField label="Availability label" htmlFor="availability_label" error={errors.availability_label} required>
              <TextInput
                id="availability_label"
                value={data.availability_label}
                onChange={(e) => setData('availability_label', e.target.value)}
                invalid={!!errors.availability_label}
              />
            </FormField>
          </div>
        </Card>

        <Card title="Tech stack" description="Short list of core technologies shown in the hero.">
          <ListRepeater
            items={data.stack}
            onChange={(val) => setData('stack', val)}
            placeholder="e.g. Laravel"
            addLabel="Add technology"
            error={errors.stack}
          />
        </Card>

        <Card title="Stats" description="Headline numbers (value + label).">
          <GroupRepeater
            items={data.stats}
            onChange={(val) => setData('stats', val)}
            fields={[
              { key: 'value', placeholder: '10+' },
              { key: 'label', placeholder: 'Projects shipped' },
            ]}
            addLabel="Add stat"
            error={errors.stats}
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
