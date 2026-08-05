import { useForm } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';
import PageHeader from '../../../Components/admin/PageHeader';
import Card from '../../../Components/admin/Card';
import AdminButton from '../../../Components/admin/AdminButton';
import FormField from '../../../Components/admin/form/FormField';
import TextInput from '../../../Components/admin/form/TextInput';
import TextArea from '../../../Components/admin/form/TextArea';
import GroupRepeater from '../../../Components/admin/form/GroupRepeater';

export default function ContactEdit({ contact }) {
  const { data, setData, put, processing, errors } = useForm({
    contact_info: contact.contact_info || [],
    social_links: contact.social_links || [],
    whatsapp_number: contact.whatsapp_number || '',
    whatsapp_default_message: contact.whatsapp_default_message || '',
  });

  const resolve = (name) => (typeof route === 'function' ? route(name) : '#');

  const submit = (e) => {
    e.preventDefault();
    put(resolve('admin.contact.update'), { preserveScroll: true });
  };

  return (
    <AdminLayout title="Contact Details">
      <PageHeader
        eyebrow="Content"
        title="Contact details"
        description="Contact methods, social links, and WhatsApp settings."
      />

      <form onSubmit={submit} className="flex flex-col gap-6">
        <Card title="Contact info" description="Label/value pairs (email, phone, location).">
          <GroupRepeater
            items={data.contact_info}
            onChange={(val) => setData('contact_info', val)}
            fields={[
              { key: 'label', placeholder: 'Email' },
              { key: 'value', placeholder: 'hello@example.com' },
            ]}
            addLabel="Add contact method"
            error={errors.contact_info}
          />
        </Card>

        <Card title="Social links" description="Label + URL for each social profile.">
          <GroupRepeater
            items={data.social_links}
            onChange={(val) => setData('social_links', val)}
            fields={[
              { key: 'label', placeholder: 'GitHub' },
              { key: 'url', placeholder: 'https://github.com/you' },
            ]}
            addLabel="Add social link"
            error={errors.social_links}
          />
        </Card>

        <Card title="WhatsApp">
          <div className="flex flex-col gap-4">
            <FormField
              label="WhatsApp number"
              htmlFor="whatsapp_number"
              error={errors.whatsapp_number}
              hint="Include country code, digits only. e.g. 10000000000"
              required
            >
              <TextInput
                id="whatsapp_number"
                value={data.whatsapp_number}
                onChange={(e) => setData('whatsapp_number', e.target.value)}
                invalid={!!errors.whatsapp_number}
              />
            </FormField>
            <FormField label="Default message" htmlFor="whatsapp_default_message" error={errors.whatsapp_default_message} required>
              <TextArea
                id="whatsapp_default_message"
                value={data.whatsapp_default_message}
                onChange={(e) => setData('whatsapp_default_message', e.target.value)}
                invalid={!!errors.whatsapp_default_message}
              />
            </FormField>
          </div>
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
