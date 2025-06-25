
import type { BaseTimelineItemType } from "../../../../design-system/ui-demos";
import { rainbowColorNames } from "../../../../styles";
import { Example_Issues_1 } from "./_example1";
import { Example_Issues_2 } from "./_example2";
import { Example_Issues_3 } from "./_example3";


export const status = {
  high: {
    name: "High",
    color: rainbowColorNames.rose
  },
  medium: {
    name: "Medium",
    color: rainbowColorNames.amber
  },
  low: {
    name: "Low",
    color: rainbowColorNames.emerald
  }
}

export const team = {
  sales: {
    name: "Sales",
    color: rainbowColorNames.blue
  },
  marketing: {
    name: "Marketing",
    color: rainbowColorNames.emerald
  },
  engineering: {
    name: "Engineering",
    color: rainbowColorNames.purple
  },
  design: {
    name: "Design",
    color: rainbowColorNames.orange
  },
  product: {
    name: "Product",
    color: rainbowColorNames.pink
  },
  other: {
    name: "Other",
    color: rainbowColorNames.cyan
  }
}

export const priority = {
  high: {
    name: "High",
    color: rainbowColorNames.rose,
    icon: "stat_2"
  },
  medium: {
    name: "Medium",
    color: rainbowColorNames.amber,
    icon: "stat_1"
  },
  low: {
    name: "Low",
    color: rainbowColorNames.emerald,
    icon: "stat_minus_1"
  }
}

export const riskLevel = {
  high: {
    name: "High Risks",
    color: rainbowColorNames.rose,
  },
  medium: {
    name: "Medium Risks",
    color: rainbowColorNames.amber,
  },
  low: {
    name: "Low Risks",
    color: rainbowColorNames.emerald,
  }
}

export interface ProjectDataType extends BaseTimelineItemType {
  projectKey: string;
  status: keyof typeof status
  progress: number
  team: keyof typeof team
  priority: keyof typeof priority
  category: string
  riskLevel: keyof typeof riskLevel
}

export const ExampleData: ProjectDataType[] = [
  ...Example_Issues_1,
  ...Example_Issues_2,
  ...Example_Issues_3
]