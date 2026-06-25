import { List, LucideIcon, Monitor, Settings, Sun, Trophy } from "lucide-react";

export type CategoryKey =
  | "all"
  | "carSetupGuides"
  | "weatherConditions"
  | "gameSettings"
  | "ratingPoints";

export const CATEGORY_CONFIG: Record<CategoryKey, { label: string; icon: LucideIcon }> = {
  all: { label: "All", icon: List },
  carSetupGuides: { label: "Car Setup Guides", icon: Settings },
  weatherConditions: { label: "Weather Conditions", icon: Sun },
  gameSettings: { label: "Game Settings", icon: Monitor },
  ratingPoints: { label: "Rating Points", icon: Trophy },
};
