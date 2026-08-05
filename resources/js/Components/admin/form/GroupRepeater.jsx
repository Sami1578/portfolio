import { Plus, Trash2 } from 'lucide-react';
import TextInput from './TextInput';

/**
 * Repeater for an array of objects with a fixed set of keys.
 * `fields` describes each column, e.g.
 *   [{ key: 'value', placeholder: '35%' }, { key: 'label', placeholder: 'Query Speed' }]
 *
 * Used for stats, about fields, contact_info, social_links.
 */
export default function GroupRepeater({ label, items = [], fields = [], onChange, addLabel = 'Add row', error }) {
  const blank = () => Object.fromEntries(fields.map((f) => [f.key, '']));

  const update = (index, key, value) => {
    const next = items.map((item, i) => (i === index ? { ...item, [key]: value } : item));
    onChange(next);
  };

  const add = () => onChange([...items, blank()]);
  const remove = (index) => onChange(items.filter((_, i) => i !== index));

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <span className="font-mono-ui text-xs uppercase tracking-[0.14em] text-text-muted">
          {label}
        </span>
      )}

      <div className="flex flex-col gap-2">
        {items.map((item, index) => (
          <div key={index} className="flex items-start gap-2 rounded-md border border-border bg-bg p-2">
            <div className="grid flex-1 gap-2 sm:grid-cols-2">
              {fields.map((field) => (
                <TextInput
                  key={field.key}
                  value={item?.[field.key] ?? ''}
                  onChange={(e) => update(index, field.key, e.target.value)}
                  placeholder={field.placeholder || field.key}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => remove(index)}
              className="flex-shrink-0 rounded-md p-1.5 text-text-muted transition-colors hover:bg-accent/10 hover:text-accent"
              aria-label="Remove row"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>

      {error && <p className="text-xs text-accent">{error}</p>}

      <button
        type="button"
        onClick={add}
        className="mt-1 inline-flex w-fit items-center gap-1.5 rounded-md border border-dashed border-border px-3 py-1.5 text-xs text-text-muted transition-colors hover:border-accent hover:text-accent"
      >
        <Plus size={14} /> {addLabel}
      </button>
    </div>
  );
}
