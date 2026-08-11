import { useForm, router } from '@inertiajs/react';
import { useState } from 'react';
import Card from '../../../Components/admin/Card';
import AdminButton from '../../../Components/admin/AdminButton';
import FormField from '../../../Components/admin/form/FormField';
import TextInput from '../../../Components/admin/form/TextInput';
import TextArea from '../../../Components/admin/form/TextArea';
import ListRepeater from '../../../Components/admin/form/ListRepeater';
import Toggle from '../../../Components/admin/form/Toggle';
import RichTextEditor from '../../../Components/admin/form/RichTextEditor';
import { X, FileArchive, Film } from 'lucide-react';

export default function ResourceForm({ resource = null }) {
  const isEdit = !!resource;
  const resolve = (name, param) => (typeof route === 'function' ? route(name, param) : '#');

  // Existing media rows (only present on edit). Deleting one of these
  // fires immediately via router.delete — no need to wait for the form
  // submit, same pattern as DeleteButton elsewhere in admin.
  const [existingMedia, setExistingMedia] = useState(resource?.media ?? []);
  const [removingId, setRemovingId] = useState(null);

  const { data, setData, post: submitPost, processing, errors } = useForm({
    _method: isEdit ? 'put' : 'post',
    title: resource?.title ?? '',
    slug: resource?.slug ?? '',
    short_description: resource?.short_description ?? '',
    instructions: resource?.instructions ?? '',
    preview_files: [],
    code_bundle: null,
    tech_tags: resource?.tech_tags ?? [],
    is_active: resource?.is_active ?? false,
  });

  const handleFilesChange = (e) => {
    const files = Array.from(e.target.files ?? []);
    setData('preview_files', [...data.preview_files, ...files]);
    e.target.value = ''; // allow re-selecting the same file after removing it
  };

  const removeNewFile = (index) => {
    setData('preview_files', data.preview_files.filter((_, i) => i !== index));
  };

  const removeExistingMedia = (media) => {
    if (!confirm('Remove this media item?')) return;

    setRemovingId(media.id);
    router.delete(route('admin.resources.media.destroy', [resource.id, media.id]), {
      preserveScroll: true,
      onSuccess: () => setExistingMedia((current) => current.filter((m) => m.id !== media.id)),
      onFinish: () => setRemovingId(null),
    });
  };

  const submit = (e) => {
    e.preventDefault();
    const url = isEdit ? resolve('admin.resources.update', resource.id) : resolve('admin.resources.store');
    submitPost(url, { forceFormData: true });
  };

  return (
    <form onSubmit={submit} className="flex flex-col gap-6">
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

          <FormField
            label="Slug"
            htmlFor="slug"
            error={errors.slug}
            hint="Leave blank to auto-generate from the title."
          >
            <TextInput
              id="slug"
              value={data.slug}
              onChange={(e) => setData('slug', e.target.value)}
              invalid={!!errors.slug}
            />
          </FormField>

          <FormField
            label="Short description"
            htmlFor="short_description"
            error={errors.short_description}
            hint="Shown on the resources listing card."
            required
          >
            <TextArea
              id="short_description"
              value={data.short_description}
              onChange={(e) => setData('short_description', e.target.value)}
              invalid={!!errors.short_description}
              rows={2}
            />
          </FormField>

          <FormField label="Setup instructions" htmlFor="instructions" error={errors.instructions}>
            <RichTextEditor
              value={data.instructions}
              onChange={(html) => setData('instructions', html)}
              uploadUrl={resolve('admin.posts.upload-image')}
            />
          </FormField>
        </div>
      </Card>

      <Card
        title="Media"
        description="Screenshots or short clips shown in the gallery on the public listing and detail pages. Upload as many as you like."
      >
        <div className="flex flex-col gap-4">
          {existingMedia.length > 0 && (
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
              {existingMedia.map((media) => (
                <div key={media.id} className="group relative aspect-video overflow-hidden rounded-md border border-border">
                  {media.type === 'video' ? (
                    <video src={`/storage/${media.path}`} className="h-full w-full object-cover" muted />
                  ) : (
                    <img src={`/storage/${media.path}`} alt="" className="h-full w-full object-cover" />
                  )}
                  <button
                    type="button"
                    onClick={() => removeExistingMedia(media)}
                    disabled={removingId === media.id}
                    aria-label="Remove media"
                    className="absolute right-1 top-1 rounded-full bg-black/70 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100 disabled:opacity-60"
                  >
                    <X size={13} />
                  </button>
                  {media.type === 'video' && (
                    <span className="absolute bottom-1 left-1 rounded bg-black/70 p-1 text-white">
                      <Film size={11} />
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}

          {data.preview_files.length > 0 && (
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
              {data.preview_files.map((file, index) => (
                <div key={`${file.name}-${index}`} className="group relative aspect-video overflow-hidden rounded-md border border-dashed border-accent-soft">
                  <img src={URL.createObjectURL(file)} alt="" className="h-full w-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeNewFile(index)}
                    aria-label="Remove from upload queue"
                    className="absolute right-1 top-1 rounded-full bg-black/70 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    <X size={13} />
                  </button>
                  <span className="absolute bottom-1 left-1 rounded bg-accent px-1.5 py-0.5 text-[10px] uppercase tracking-widest text-white">
                    New
                  </span>
                </div>
              ))}
            </div>
          )}

          <FormField
            label="Add media"
            htmlFor="preview_files"
            error={errors.preview_files || errors['preview_files.0']}
            hint="Images or short videos. You can select multiple files at once, or add more in separate passes."
          >
            <input
              id="preview_files"
              type="file"
              multiple
              accept="image/*,video/mp4,video/webm"
              onChange={handleFilesChange}
              className="text-sm text-text-muted file:mr-3 file:rounded-md file:border-0 file:bg-accent/10 file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-accent"
            />
          </FormField>
        </div>
      </Card>

      <Card title="Code bundle" description="ZIP file made available via the download button on the public page.">
        <div className="flex flex-col gap-4">
          {resource?.code_bundle_path && (
            <p className="flex items-center gap-2 text-sm text-text-muted">
              <FileArchive size={14} />
              Current file: <span className="text-text">{resource.code_bundle_original_name ?? 'code-bundle.zip'}</span>
              {' '}— uploading a new one will replace it.
            </p>
          )}
          <FormField label="Upload ZIP" htmlFor="code_bundle" error={errors.code_bundle}>
            <input
              id="code_bundle"
              type="file"
              accept=".zip"
              onChange={(e) => setData('code_bundle', e.target.files?.[0] ?? null)}
              className="text-sm text-text-muted file:mr-3 file:rounded-md file:border-0 file:bg-accent/10 file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-accent"
            />
          </FormField>
        </div>
      </Card>

      <Card title="Tags">
        <ListRepeater
          items={data.tech_tags}
          onChange={(val) => setData('tech_tags', val)}
          placeholder="Laravel"
          addLabel="Add tag"
          error={errors.tech_tags}
        />
      </Card>

      <Card title="Settings">
        <Toggle
          checked={data.is_active}
          onChange={(val) => setData('is_active', val)}
          label="Active"
          description="Active resources are visible on the public resources page."
        />
      </Card>

      <div className="flex justify-end gap-2">
        <AdminButton as="link" href={resolve('admin.resources.index')} variant="secondary">
          Cancel
        </AdminButton>
        <AdminButton type="submit" disabled={processing}>
          {processing ? 'Saving…' : isEdit ? 'Update resource' : 'Create resource'}
        </AdminButton>
      </div>
    </form>
  );
}
