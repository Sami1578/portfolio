import { Link, router } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';
import PageHeader from '../../../Components/admin/PageHeader';
import Card from '../../../Components/admin/Card';
import AdminButton from '../../../Components/admin/AdminButton';
import { ArrowLeft, Trash2 } from 'lucide-react';

export default function MessagesShow({ message }) {
  const resolve = (name, param) => (typeof route === 'function' ? route(name, param) : '#');

  const destroy = () => {
    if (confirm('Delete this message? This cannot be undone.')) {
      router.delete(resolve('admin.messages.destroy', message.id), {
        onSuccess: () => router.visit(resolve('admin.messages.index')),
      });
    }
  };

  return (
    <AdminLayout title="Message">
      <PageHeader
        eyebrow="Inbox"
        title={message.subject}
        actions={
          <div className="flex items-center gap-2">
            <AdminButton as="link" href={resolve('admin.messages.index')} variant="secondary">
              <ArrowLeft size={15} /> Back
            </AdminButton>
            <AdminButton variant="danger" onClick={destroy}>
              <Trash2 size={15} /> Delete
            </AdminButton>
          </div>
        }
      />

      <div className="flex flex-col gap-4">
        {/* Metadata */}
        <Card>
          <dl className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {[
              { label: 'From',    value: message.name },
              { label: 'Email',   value: message.email },
              { label: 'Received', value: new Date(message.created_at).toLocaleString() },
            ].map(({ label, value }) => (
              <div key={label}>
                <dt className="font-mono-ui text-[11px] uppercase tracking-[0.14em] text-text-muted">
                  {label}
                </dt>
                <dd className="mt-0.5 text-sm text-text">{value}</dd>
              </div>
            ))}
          </dl>
        </Card>

        {/* Body */}
        <Card title="Message">
          <p className="whitespace-pre-wrap text-sm leading-relaxed text-text">
            {message.message}
          </p>
        </Card>

        {/* Reply shortcut */}
        <div className="flex justify-end">
          <a
            href={`mailto:${message.email}?subject=Re: ${encodeURIComponent(message.subject)}`}
            className="inline-flex items-center gap-1.5 rounded-md border border-border px-4 py-2 text-sm text-text transition-colors hover:border-border-strong"
          >
            Reply via email ↗
          </a>
        </div>
      </div>
    </AdminLayout>
  );
}
