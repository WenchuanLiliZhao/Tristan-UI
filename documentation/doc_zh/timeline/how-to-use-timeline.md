# 如何使用 Timeline



## 步骤 1：创建自己的数据接口

```typescript
import type { BaseTimelineItemType } from "tristan-ui";

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
```

## 步骤 2：创建符合接口的示例数据

```typescript
export const ExampleData: ProjectDataType[] = [
  {
    id: "1",
    name: "Interactive Calculus Workshop",
    startDate: new Date("2024-01-01"),
    endDate: new Date("2024-01-31"),
    projectKey: "CALC-001",
    status: "high",
    progress: 50,
    team: "engineering",
    priority: "high",
    category: "Advance Solutions",
    riskLevel: "high"
  },
  {
    id: "2",
    name: "Mobile App Development",
    startDate: new Date("2024-02-01"),
    endDate: new Date("2024-03-31"),
    projectKey: "MOBILE-002",
    status: "low",
    progress: 100,
    team: "engineering",
    priority: "low",
    category: "Advance Solutions",
    riskLevel: "low"
  },
  {
    id: "3",
    name: "Machine Learning Model Training",
    startDate: new Date("2024-03-01"),
    endDate: new Date("2024-03-31"),
    projectKey: "ML-003",
    status: "high",
    progress: 100,
    team: "engineering",
    priority: "low",
    category: "Advance Capabilities",
    riskLevel: "medium"
  },
  // more data...
]
```

