export default function FilterButton({ label, value, filterOptions, isActive }) {
  return (
    <div>
      <button
        value={value}
        onClick={() => filterOptions(value)}
        className={`
                ${
                  isActive === value
                    ? `p-2 rounded-xl shadow-lg bg-(--primary) text-(--on-primary) hover:cursor-pointer`
                    : `p-2 rounded-xl shadow-lg bg-(--bg-surface) hover:bg-(--bg-elevated) hover:cursor-pointer transition-colors`
                }`}
      >
        {label}
      </button>
    </div>
  );
}
