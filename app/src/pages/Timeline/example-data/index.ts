import type { BaseTimelineItemType } from "tristan-ui";
import { Example_Issues_1 } from "./_example1";
import { Example_Issues_2 } from "./_example2";
import { Example_Issues_3 } from "./_example3";


export const status = {
  high: {
    name: "High",
    color: "red"
  },
  medium: {
    name: "Medium",
    color: "yellow"
  },
  low: {
    name: "Low",
    color: "green"
  }
}

export const team = {
  sales: {
    name: "Sales",
    color: "blue"
  },
  marketing: {
    name: "Marketing",
    color: "green"
  },
  engineering: {
    name: "Engineering",
    color: "purple"
  },
  design: {
    name: "Design",
    color: "orange"
  },
  product: {
    name: "Product",
    color: "pink"
  },
  other: {
    name: "Other",
    color: "gray"
  }
}

export const priority = {
  high: {
    name: "High",
    color: "red",
    icon: "icon-a"
  },
  medium: {
    name: "Medium",
    color: "yellow",
    icon: "icon-b"
  },
  low: {
    name: "Low",
    color: "green",
    icon: "icon-c"
  }
}

export const riskLevel = {
  high: {
    name: "High Risks",
    color: "red",
    icon: "icon-a"
  },
  medium: {
    name: "Medium Risks",
    color: "yellow",
    icon: "icon-b"
  },
  low: {
    name: "Low Risks",
    color: "green",
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