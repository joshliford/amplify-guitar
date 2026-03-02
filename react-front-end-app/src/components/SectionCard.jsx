export default function SectionCard({ title, icon, children, className }) {
  return (
    // merges base card styling with any custom class styling passed in (i.e. row-span-2 for user card)
    <div className={`flex flex-col border-2 w-full rounded-xl shadow-lg hover:shadow-xl ${className || ''}`}>
      <div className="p-2 flex items-center justify-between shadow-lg rounded-t-lg border-b-2 border-[#D4A574] bg-[#1F5D3D] dark:bg-[#D4A574] dark:border-gray-600">
        <div className="flex justify-between items-center w-full p-2">
          <h4 className="m-2 text-2xl font-semibold text-[#FFFEF7] dark:text-black">
            {title}
          </h4>
          {icon}
        </div>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}
