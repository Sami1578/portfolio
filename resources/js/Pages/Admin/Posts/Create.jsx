import AdminLayout from '../../../Layouts/AdminLayout';
import PageHeader from '../../../Components/admin/PageHeader';
import PostForm from './Form';

export default function PostsCreate() {
  return (
    <AdminLayout title="New Post">
      <PageHeader eyebrow="Blog Posts" title="New post" />
      <PostForm />
    </AdminLayout>
  );
}
