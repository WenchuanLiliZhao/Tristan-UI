
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
    icon: "icon-a"
  },
  medium: {
    name: "Medium",
    color: rainbowColorNames.amber,
    icon: "icon-b"
  },
  low: {
    name: "Low",
    color: rainbowColorNames.emerald,
    icon: "icon-c"
  }
}

export const riskLevel = {
  high: {
    name: "High Risks",
    color: rainbowColorNames.rose,
    icon: "icon-a"
  },
  medium: {
    name: "Medium Risks",
    color: rainbowColorNames.amber,
    icon: "icon-b"
  },
  low: {
    name: "Low Risks",
    color: rainbowColorNames.emerald,
    icon: "icon-c"
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