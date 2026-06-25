import React from "react";
import { Settings, Sun, CloudRain, Cloud, Monitor, Cpu, Trophy, Shield, LucideIcon } from "lucide-react";
import { Guide } from "../../types/guide";

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

interface GuideCardProps {
  guide: Guide;
  isSelected: boolean;
  onClick: () => void;
}

const GuideCard = React.memo(({ guide, isSelected, onClick }: GuideCardProps) => {
  const Icon = iconMap[guide.icon] || Settings;

  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 ${
        isSelected
          ? "bg-blue-600/20 border-l-3 border-blue-500"
          : "bg-[#171d2a] hover:bg-[#1d2433] border-l-3 border-transparent"
      }`}
    >
      <Icon size={20} className={isSelected ? "text-blue-400" : "text-gray-400"} />
      <div className="flex-1 min-w-0">
        <h3 className={`text-sm font-medium truncate ${isSelected ? "text-blue-300" : "text-gray-200"}`}>
          {guide.title}
        </h3>
        <p className="text-xs font-medium text-gray-500 truncate">{guide.description}</p>
      </div>
    </div>
  );
});

GuideCard.displayName = "GuideCard";

export default GuideCard;
