import { useForm } from '@inertiajs/react';
import Card from '../../../Components/admin/Card';
import AdminButton from '../../../Components/admin/AdminButton';
import FormField from '../../../Components/admin/form/FormField';
import TextInput from '../../../Components/admin/form/TextInput';
import TextArea from '../../../Components/admin/form/TextArea';
import ListRepeater from '../../../Components/admin/form/ListRepeater';
import Toggle from '../../../Components/admin/form/Toggle';
import RichTextEditor from '../../../Components/admin/form/RichTextEditor';

export default function PostForm({ post = null }) {
  const isEdit = !!post;

  const resolve = (name, param) => (typeof route === 'function' ? route(name, param) : '#');

  const { data, setData, post: submitPost, processing, errors } = useForm({
    _method: isEdit ? 'put' : 'post',
    title: post?.title ?? '',
    excerpt: post?.excerpt ?? '',
    content: post?.content ?? '',
    featured_image: null,
    tech_tags: post?.tech_tags ?? [],
    is_published: post?.is_published ?? false,
  });

  const submit = (e) => {
    e.preventDefault();
    const url = isEdit ? resolve('admin.posts.update', post.id) : resolve('admin.posts.store');
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

          <FormField label="Excerpt" htmlFor="excerpt" error={errors.excerpt} hint="Short summary shown on the blog listing card.">
            <TextArea
              id="excerpt"
              value={data.excerpt}
              onChange={(e) => setData('excerpt', e.target.value)}
              invalid={!!errors.excerpt}
              rows={2}
            />
          </FormField>

          <FormField label="Content" htmlFor="content" error={errors.content} required>
            <RichTextEditor
              value={data.content}
              onChange={(html) => setData('content', html)}
              uploadUrl={resolve('admin.posts.upload-image')}
            />
          </FormField>
        </div>
      </Card>

      <Card title="Featured image" description="Used as the listing thumbnail and social preview image.">
        <div className="flex flex-col gap-4">
          {post?.featured_image_path && (
            <img
              src={`/storage/${post.featured_image_path}`}
              alt=""
              className="h-40 w-full rounded-md border border-border object-cover sm:w-64"
            />
          )}
          <FormField label="Upload image" htmlFor="featured_image" error={errors.featured_image}>
            <input
              id="featured_image"
              type="file"
              accept="image/*"
              onChange={(e) => setData('featured_image', e.target.files?.[0] ?? null)}
              className="text-sm text-text-muted file:mr-3 file:rounded-md file:border-0 file:bg-accent/10 file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-accent"
            />
          </FormField>
        </div>
      </Card>

      <Card title="Tech tags">
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
          checked={data.is_published}
          onChange={(val) => setData('is_published', val)}
          label="Published"
          description="Published posts are visible on the public blog."
        />
      </Card>

      <div className="flex justify-end gap-2">
        <AdminButton as="link" href={resolve('admin.posts.index')} variant="secondary">
          Cancel
        </AdminButton>
        <AdminButton type="submit" disabled={processing}>
          {processing ? 'Saving…' : isEdit ? 'Update post' : 'Create post'}
        </AdminButton>
      </div>
    </form>
  );
}
