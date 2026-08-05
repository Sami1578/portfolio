import { useForm } from '@inertiajs/react';
import Card from '../../../Components/admin/Card';
import AdminButton from '../../../Components/admin/AdminButton';
import FormField from '../../../Components/admin/form/FormField';
import TextInput from '../../../Components/admin/form/TextInput';
import TextArea from '../../../Components/admin/form/TextArea';
import ListRepeater from '../../../Components/admin/form/ListRepeater';
import GroupRepeater from '../../../Components/admin/form/GroupRepeater';
import Toggle from '../../../Components/admin/form/Toggle';

export default function ProjectForm({ project = null }) {
  const isEdit = !!project;

  const { data, setData, post, put, processing, errors } = useForm({
    title:            project?.title            ?? '',
    subtitle:         project?.subtitle         ?? '',
    architecture_tag: project?.architecture_tag ?? '',
    description:      project?.description      ?? '',
    highlights:       project?.highlights       ?? [],
    stats:            project?.stats            ?? [],
    tech_stack:       project?.tech_stack       ?? [],
    is_featured:      project?.is_featured      ?? false,
    sort_order:       project?.sort_order       ?? 0,
  });

  const resolve = (name, param) => (typeof route === 'function' ? route(name, param) : '#');

  const submit = (e) => {
    e.preventDefault();
    if (isEdit) {
      put(resolve('admin.projects.update', project.id));
    } else {
      post(resolve('admin.projects.store'));
    }
  };

  return (
    <form onSubmit={submit} className="flex flex-col gap-6">
      {/* Core fields */}
      <Card title="Details">
        <div className="flex flex-col gap-4">
          <FormField label="Title" htmlFor="title" error={errors.title} required>
            <TextInput
              id="title"
              value={data.title}
              onChange={(e) => setData('title', e.target.value)}
              invalid={!!errors.title}
              autoFocus
            />
          </FormField>

          <FormField label="Subtitle" htmlFor="subtitle" error={errors.subtitle} hint="Short context line (e.g. 'MENA Region · NDA Protected').">
            <TextInput
              id="subtitle"
              value={data.subtitle}
              onChange={(e) => setData('subtitle', e.target.value)}
              invalid={!!errors.subtitle}
            />
          </FormField>

          <FormField label="Architecture tag" htmlFor="architecture_tag" error={errors.architecture_tag} hint="e.g. 'REST API · Event-Driven · Multi-Tenant'">
            <TextInput
              id="architecture_tag"
              value={data.architecture_tag}
              onChange={(e) => setData('architecture_tag', e.target.value)}
              invalid={!!errors.architecture_tag}
            />
          </FormField>

          <FormField label="Description" htmlFor="description" error={errors.description} required>
            <TextArea
              id="description"
              value={data.description}
              onChange={(e) => setData('description', e.target.value)}
              invalid={!!errors.description}
              rows={4}
            />
          </FormField>
        </div>
      </Card>

      {/* Array fields */}
      <Card title="Highlights">
        <ListRepeater
          items={data.highlights}
          onChange={(val) => setData('highlights', val)}
          placeholder="Built RBAC system supporting 5 roles…"
          addLabel="Add highlight"
          error={errors.highlights}
        />
      </Card>

      <Card title="Stats">
        <GroupRepeater
          items={data.stats}
          fields={[
            { key: 'value', placeholder: '35%' },
            { key: 'label', placeholder: 'Query speed improvement' },
          ]}
          onChange={(val) => setData('stats', val)}
          addLabel="Add stat"
          error={errors.stats}
        />
      </Card>

      <Card title="Tech stack">
        <ListRepeater
          items={data.tech_stack}
          onChange={(val) => setData('tech_stack', val)}
          placeholder="Laravel"
          addLabel="Add technology"
          error={errors.tech_stack}
        />
      </Card>

      {/* Meta */}
      <Card title="Settings">
        <div className="flex flex-col gap-4">
          <Toggle
            checked={data.is_featured}
            onChange={(val) => setData('is_featured', val)}
            label="Featured project"
            description="Featured projects are highlighted on the portfolio."
          />

          <FormField label="Sort order" htmlFor="sort_order" error={errors.sort_order} hint="Lower numbers appear first.">
            <TextInput
              id="sort_order"
              type="number"
              min="0"
              value={data.sort_order}
              onChange={(e) => setData('sort_order', parseInt(e.target.value, 10) || 0)}
              invalid={!!errors.sort_order}
              className="w-32"
            />
          </FormField>
        </div>
      </Card>

      <div className="flex justify-end gap-2">
        <AdminButton as="link" href={resolve('admin.projects.index')} variant="secondary">
          Cancel
        </AdminButton>
        <AdminButton type="submit" disabled={processing}>
          {processing ? 'Saving…' : isEdit ? 'Update project' : 'Create project'}
        </AdminButton>
      </div>
    </form>
  );
}
