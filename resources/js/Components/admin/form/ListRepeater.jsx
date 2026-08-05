import { Plus, Trash2, GripVertical } from 'lucide-react';
import TextInput from './TextInput';
import TextArea from './TextArea';

/**
 * Repeater for a flat array of strings.
 * e.g. stack: ['Laravel', 'React'] or highlights: ['...', '...']
 */
export default function ListRepeater({
  label,
  items = [],
  onChange,
  placeholder = '',
  addLabel = 'Add item',
  multiline = false,
  error,
}) {
  const update = (index, value) => {
    const next = [...items];
    next[index] = value;
    onChange(next);
  };

  const add = () => onChange([...items, '']);
  const remove = (index) => onChange(items.filter((_, i) => i !== index));

  const Field = multiline ? TextArea : TextInput;

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <span className="font-mono-ui text-xs uppercase tracking-[0.14em] text-text-muted">
          {label}
        </span>
      )}

      <div className="flex flex-col gap-2">
        {items.map((item, index) => (
          <div key={index} className="flex items-start gap-2">
            <GripVertical size={16} className="mt-2.5 flex-shrink-0 text-text-muted/50" />
            <Field
              value={item ?? ''}
              onChange={(e) => update(index, e.target.value)}
              placeholder={placeholder}
              rows={multiline ? 2 : undefined}
            />
            <button
              type="button"
              onClick={() => remove(index)}
              className="mt-1.5 flex-shrink-0 rounded-md p-1.5 text-text-muted transition-colors hover:bg-accent/10 hover:text-accent"
              aria-label="Remove item"
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
