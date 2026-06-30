import { memo } from "react";
import { Home, Fuel, LibraryBig, LucideIcon } from "lucide-react";
import { combineClasses } from "../../lib/utils";
import { useAppStore, TabId } from "../../store/appStore";

interface SidebarMenuItemProps {
  icon: LucideIcon;
  active?: boolean;
  label: string;
  onClick: () => void;
}

const SidebarMenuItem = memo(
  ({ icon: Icon, active = false, label, onClick }: SidebarMenuItemProps) => (
    <div className="relative group flex items-center justify-center mb-2 cursor-pointer w-full h-12" title={label} onClick={onClick}>
      <div className={combineClasses( "absolute left-0 w-1.25 h-10 rounded-r-full bg-blue-400 transition-all duration-500", active ? "opacity-100 scale-100 shadow-[0_0_4px_rgba(129,140,248,0.6)]" : "opacity-0 scale-50 group-hover:opacity-30 group-hover:scale-100", )} />
      <div className={combineClasses( "transition-all duration-300 relative z-10", active ? "text-blue-400" : "text-gray-500 group-hover:text-blue-300", )} >
        <Icon size={22} strokeWidth={2} />
      </div>
    </div>
  ),
);

SidebarMenuItem.displayName = "SidebarMenuItem";

const MENU_ITEMS: { id: TabId; label: string; icon: LucideIcon }[] = [
  { id: "home", label: "Home", icon: Home },
  { id: "fuel", label: "Fuel Calculator", icon: Fuel },
  { id: "guide", label: "Guide Book", icon: LibraryBig },
];

const Sidebar = () => {
  const activeTab = useAppStore((state) => state.activeTab);
  const setActiveTab = useAppStore((state) => state.setActiveTab);

  return (
    <div className="w-14 flex flex-col items-center py-6 bg-transparent select-none h-full relative z-20">
      {MENU_ITEMS.map((item) => (
        <SidebarMenuItem
          key={item.id}
          active={item.id === activeTab}
          label={item.label}
          icon={item.icon}
          onClick={() => setActiveTab(item.id)}
        />
      ))}
    </div>
  );
};

export default Sidebar;