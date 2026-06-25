import React from "react";
import { CATEGORY_CONFIG, CategoryKey } from "../../types/guideCategories";
import { useGuideStore } from "../../store/guideStore";

interface CategoryTabProps {
  category: CategoryKey;
}

const CategoryTab = React.memo(({ 
  category 
}: CategoryTabProps) => {
  const activeCategory = useGuideStore((state) => state.activeCategory);
  const setActiveCategory = useGuideStore((state) => state.setActiveCategory);
  
  const config = CATEGORY_CONFIG[category];
  const Icon = config.icon;
  const isActive = activeCategory === category;

  return (
    <button
      onClick={() => setActiveCategory(category)}
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
        isActive
          ? "bg-blue-500/30 text-blue-100 border border-blue-400/70"
          : "text-gray-400 hover:text-blue-200 hover:bg-blue-500/20 border border-transparent"
      }`}
    >
      <Icon size={18} />
      <span className="text-sm font-medium">{config.label}</span>
    </button>
  );
});

CategoryTab.displayName = "CategoryTab";

export default CategoryTab;
