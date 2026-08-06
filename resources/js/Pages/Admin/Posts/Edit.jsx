import AdminLayout from '../../../Layouts/AdminLayout';
import PageHeader from '../../../Components/admin/PageHeader';
import PostForm from './Form';

export default function PostsEdit({ post }) {
  return (
    <AdminLayout title="Edit Post">
      <PageHeader eyebrow="Blog Posts" title="Edit post" description={post.title} />
      <PostForm post={post} />
    </AdminLayout>
  );
}
