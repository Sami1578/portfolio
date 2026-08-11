import AdminLayout from '../../../Layouts/AdminLayout';
import PageHeader from '../../../Components/admin/PageHeader';
import DataTable from '../../../Components/admin/DataTable';
import AdminButton from '../../../Components/admin/AdminButton';
import DeleteButton from '../../../Components/admin/DeleteButton';
import ActiveToggleCell from '../../../Components/admin/ActiveToggleCell';
import Pagination from '../../../Components/ui/Pagination';
import TagFilter from '../../../Components/ui/TagFilter';
import SearchInput from '../../../Components/ui/SearchInput';
import { Plus, Boxes, Download, FileArchive, Images } from 'lucide-react';

export default function ResourcesIndex({
  resources = { data: [], links: [] },
  availableTags = [],
  selectedTags = [],
  search = '',
}) {
  const resolve = (name, param) => (typeof route === 'function' ? route(name, param) : '#');
  const rows = resources.data ?? [];

  const columns = [
    {
      key: 'title',
      header: 'Resource',
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="relative h-10 w-14 shrink-0 overflow-hidden rounded-md border border-border bg-border/30">
            {row.thumbnail_path ? (
              <img src={`/storage/${row.thumbnail_path}`} alt="" className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-text-muted">
                <FileArchive size={14} />
              </div>
            )}
            {row.media_count > 1 && (
              <span className="absolute bottom-0.5 right-0.5 flex items-center gap-0.5 rounded bg-black/70 px-1 py-0.5 text-[9px] text-white">
                <Images size={9} /> {row.media_count}
              </span>
            )}
          </div>
          <div>
            <span className="font-medium">{row.title}</span>
            {row.short_description && (
              <p className="mt-0.5 max-w-md truncate text-xs text-text-muted">{row.short_description}</p>
            )}
          </div>
        </div>
      ),
    },
    {
      key: 'tech_tags',
      header: 'Tags',
      render: (row) => (
        <div className="flex flex-wrap gap-1">
          {(row.tech_tags ?? []).slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border px-2 py-0.5 text-[10px] uppercase tracking-widest text-text-muted"
            >
              {tag}
            </span>
          ))}
        </div>
      ),
    },
    {
      key: 'download_count',
      header: 'Downloads',
      className: 'text-center',
      render: (row) => (
        <span className="inline-flex items-center gap-1 text-xs text-text-muted">
          <Download size={13} /> {row.download_count}
        </span>
      ),
    },
    {
      key: 'is_active',
      header: 'Active',
      className: 'text-center',
      render: (row) => <ActiveToggleCell resource={row} />,
    },
    {
      key: 'actions',
      header: '',
      className: 'text-right w-px whitespace-nowrap',
      render: (row) => (
        <div className="flex items-center justify-end gap-2">
          <AdminButton as="link" href={resolve('admin.resources.edit', row.id)} variant="secondary" size="sm">
            Edit
          </AdminButton>
          <DeleteButton href={resolve('admin.resources.destroy', row.id)} iconOnly />
        </div>
      ),
    },
  ];

  return (
    <AdminLayout title="Resources">
      <PageHeader
        eyebrow="Content"
        title="Resources"
        description="Downloadable code bundles and templates shown on the public resources page."
        actions={
          <AdminButton as="link" href={resolve('admin.resources.create')}>
            <Plus size={15} /> New resource
          </AdminButton>
        }
      />

      <div className="mb-6 max-w-sm">
        <SearchInput
          routeName="admin.resources.index"
          initialValue={search}
          extraParams={selectedTags.length ? { tags: selectedTags } : {}}
          placeholder="Search resources…"
        />
      </div>

      <TagFilter
        routeName="admin.resources.index"
        tags={availableTags}
        selectedTags={selectedTags}
        extraParams={search ? { search } : {}}
      />

      <DataTable
        columns={columns}
        rows={rows}
        empty={{
          icon: Boxes,
          title: 'No resources yet',
          description: 'Add your first downloadable resource.',
          action: (
            <AdminButton as="link" href={resolve('admin.resources.create')} size="sm">
              <Plus size={14} /> New resource
            </AdminButton>
          ),
        }}
      />

      {rows.length > 0 && <Pagination links={resources.links} />}
    </AdminLayout>
  );
}
