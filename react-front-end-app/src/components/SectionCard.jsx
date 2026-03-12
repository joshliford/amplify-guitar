export default function SectionCard({ title, icon, children, className }) {
  return (
    // merges base card styling with any custom class styling passed in (i.e. row-span-2 for user card)
    <div className={`flex flex-col w-full rounded-xl border border-primary/50 hover:border-primary hover:-translate-y-1 bg-(--bg-surface) shadow-md hover:shadow-lg transition-all duration-200 overflow-hidden ${className || ''}`}>
      <div className="p-4 flex flex-row items-center justify-between border-b border-border">
        <h4 className="text-lg font-semibold text-(--text-high)">{title}</h4>
        <span className="text-primary">{icon}</span>
      </div>
      <div className="p-4 flex flex-col flex-1">{children}</div>
    </div>
  );
}
