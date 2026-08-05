import EmptyState from './EmptyState';

/**
 * columns: [{ key, header, render?(row), className? }]
 * rows: array of records
 */
export default function DataTable({ columns = [], rows = [], empty }) {
  if (!rows.length) {
    return <EmptyState {...empty} />;
  }

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-border">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`px-4 py-3 font-mono-ui text-[11px] uppercase tracking-[0.14em] text-text-muted ${col.className || ''}`}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-b border-border last:border-0 hover:bg-bg/50">
                {columns.map((col) => (
                  <td key={col.key} className={`px-4 py-3 align-middle text-text ${col.className || ''}`}>
                    {col.render ? col.render(row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
