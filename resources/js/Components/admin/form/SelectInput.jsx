export default function SelectInput({ options = [], className = '', invalid = false, placeholder, ...props }) {
  return (
    <select
      className={`w-full rounded-md border bg-bg px-3 py-2 text-sm text-text outline-none transition-colors focus:border-accent ${
        invalid ? 'border-accent' : 'border-border'
      } ${className}`}
      {...props}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
