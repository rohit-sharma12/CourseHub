const SidebarItem = ({ icon, text, danger }) => (
    <button
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium
        ${danger
                ? "text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10"
                : "hover:bg-gray-100 dark:hover:bg-slate-800"
            }`}
    >
        {icon}
        {text}
    </button>
);

export default SidebarItem;