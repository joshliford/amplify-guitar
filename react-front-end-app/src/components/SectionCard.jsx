export default function SectionCard({ title, icon, children, className }) {
  return (
    // merges base card styling with any custom class styling passed in (i.e. row-span-2 for user card)
    <div className={`flex flex-col border-2 border-gray-300 dark:border-gray-700 w-full  rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200 bg-white dark:bg-[#1e2d42] ${className || ''}`}>
      <div className="p-4 flex flex-row items-center justify-between shadow-lg rounded-t-lg border-b-2 border-[#415a77] dark:border-[#149eca]">
        <h4 className="text-lg font-semibold">{title}</h4>
        {icon}
      </div>
      <div className="p-4 flex flex-col flex-1">{children}</div>
    </div>
  );
}
