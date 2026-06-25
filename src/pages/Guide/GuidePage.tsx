import { useMemo, useState } from "react";
import { Settings, Sun, CloudRain, Cloud, Monitor, Cpu, Trophy, Shield, LucideIcon } from "lucide-react";
import guidesData from "../../data/guides.json";
import { useDebounce } from "../../hooks/useDebounce";
import { useGuideStore } from "../../store/guideStore";
import SearchBar from "../../components/Guide/SearchBar";
import CategoryTab from "../../components/Guide/CategoryTab";
import { CATEGORY_CONFIG, CategoryKey } from "../../types/guideCategories";
import GuideCard from "../../components/Guide/GuideCard";
import GuideContentRenderer from "../../components/Guide/GuideContentRenderer";
import { Guide, GuideContent, GuidesData } from "../../types/guide";

const getGuideContentText = (content: GuideContent): string => {
  if (typeof content === "string") {
    return content;
  }

  return content
    .map((block) => {
      if (block.type === "paragraph" || block.type === "callout") {
        return [block.title, block.text].filter(Boolean).join(" ");
      }

      if (block.type === "bulletList") {
        return [block.title, ...block.items].filter(Boolean).join(" ");
      }

      return [block.title, ...block.columns, ...block.rows.flat()].filter(Boolean).join(" ");
    })
    .join(" ");
};

const guideMatchesQuery = (guide: Guide, query: string): boolean => {
  const searchableText = [
    guide.title,
    guide.description,
    getGuideContentText(guide.content),
  ].join(" ").toLowerCase();

  return searchableText.includes(query);
};

export default function GuidePage() {
  const searchQuery = useGuideStore((state) => state.searchQuery);
  const activeCategory = useGuideStore((state) => state.activeCategory);
  const [selectedGuideId, setSelectedGuideId] = useState<string | null>(null);
  
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const filteredGuides = useMemo(() => {
    // If category is "all", get all guides from all categories
    if (activeCategory === "all") {
      const allGuidesArray: Guide[] = [];
      Object.values(guidesData as GuidesData).forEach((guides) => {
        allGuidesArray.push(...guides);
      });
      
      if (!debouncedSearchQuery.trim()) {
        return allGuidesArray;
      }

      const query = debouncedSearchQuery.toLowerCase();
      return allGuidesArray.filter((guide: Guide) => guideMatchesQuery(guide, query));
    }

    const categoryGuides = (guidesData as GuidesData)[activeCategory];
    
    if (!debouncedSearchQuery.trim()) {
      return categoryGuides;
    }

    const query = debouncedSearchQuery.toLowerCase();
    return categoryGuides.filter((guide: Guide) => guideMatchesQuery(guide, query));
  }, [activeCategory, debouncedSearchQuery]);

  const allGuides = useMemo(() => {
    if (!debouncedSearchQuery.trim()) {
      return [];
    }

    const query = debouncedSearchQuery.toLowerCase();
    const allGuidesArray: Guide[] = [];
    
    Object.values(guidesData as GuidesData).forEach((guides) => {
      guides.forEach((guide: Guide) => {
        if (guideMatchesQuery(guide, query)) {
          allGuidesArray.push(guide);
        }
      });
    });

    return allGuidesArray;
  }, [debouncedSearchQuery]);

  const displayGuides = debouncedSearchQuery.trim() ? allGuides : filteredGuides;
  const showAllCategories = debouncedSearchQuery.trim();

  const selectedGuide = displayGuides.find((guide) => guide.id === selectedGuideId) || null;

  const iconMap: Record<string, LucideIcon> = {
    Settings,
    Sun,
    CloudRain,
    Cloud,
    Monitor,
    Cpu,
    Trophy,
    Shield,
  };

  return (
    <div className="relative min-h-full py-8 px-10 flex justify-center overflow-y-auto select-none bg-[#171d2a]">
      <div className="relative z-10 w-full max-w-7xl flex flex-col space-y-6">
        <h1 className="text-3xl font-bold text-white">
          Guide Books
          <span className="text-base text-gray-500 font-medium block mt-1">
            Comprehensive guides to help you master Assetto Corsa Competizione
          </span>
        </h1>

        {!showAllCategories && (
          <div className="flex flex-wrap gap-2">
            {(Object.keys(CATEGORY_CONFIG) as CategoryKey[]).map((category) => (
              <CategoryTab
                key={category}
                category={category}
              />
            ))}
          </div>
        )}

        <div className="flex flex-row gap-4">
          {/* Sidebar - Guide List */}
          <div className="w-full lg:w-80 shrink-0 bg-[#151b27]/90 border border-zinc-700/50 rounded-2xl overflow-hidden flex flex-col lg:max-h-[calc(100vh-240px)]">
            <div className="p-4 border-b border-zinc-700/50">
              <h2 className="text-sm font-semibold text-gray-300">
                {showAllCategories ? "All Guides" : CATEGORY_CONFIG[activeCategory].label}
              </h2>
              <p className="text-xs text-gray-500 mt-1">{displayGuides.length} guides</p>
              <div className="mt-3">
                <SearchBar />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-3 space-y-1.5 max-h-96 lg:max-h-none">
              {displayGuides.length > 0 ? (
                displayGuides.map((guide) => (
                  <GuideCard
                    key={guide.id}
                    guide={guide}
                    isSelected={selectedGuideId === guide.id}
                    onClick={() => setSelectedGuideId(guide.id)}
                  />
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-400 text-sm">No guides found matching your search.</p>
                </div>
              )}
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 bg-[#151b27]/90 border border-zinc-700/50 rounded-2xl overflow-hidden flex flex-col min-h-100 lg:min-h-0 lg:max-h-[calc(100vh-240px)]">
            {selectedGuide ? (
              <>
                <div className="py-3 px-6 border-b border-zinc-700/50">
                  <div className="flex items-center gap-3">
                    {(() => {
                      const Icon = iconMap[selectedGuide.icon] || Settings;
                      return <Icon size={24} className="text-blue-400" />;
                    })()}
                    <div>
                      <h2 className="text-xl font-semibold text-gray-100">{selectedGuide.title}</h2>
                      <p className="text-sm text-gray-400 mt-1">{selectedGuide.description}</p>
                    </div>
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto p-5">
                  <GuideContentRenderer content={selectedGuide.content} />
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-gray-400 text-lg">Select a guide from the sidebar to view its content</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
