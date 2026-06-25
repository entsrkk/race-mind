export type GuideContent =
  | string
  | (
      | {
          type: "paragraph";
          title?: string;
          text: string;
        }
      | {
          type: "bulletList";
          title?: string;
          items: string[];
        }
      | {
          type: "compare";
          title?: string;
          columns: string[];
          rows: string[][];
        }
      | {
          type: "callout";
          title?: string;
          text: string;
        }
    )[];

export interface Guide {
  id: string;
  title: string;
  description: string;
  icon: string;
  content: GuideContent;
}

export interface GuidesData {
  carSetupGuides: Guide[];
  weatherConditions: Guide[];
  gameSettings: Guide[];
  ratingPoints: Guide[];
}
