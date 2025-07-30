
import { getCSSVar, getRainbowColor, getSemanticColor } from "../../../../styles";
import { jiraData } from "./jira-data";

export const Type = {
  "Tech for Business Foundation": {
    name: "Tech for Business Foundation",
    color: getSemanticColor('active')
  },

  "Tech for China": {
    name: "Tech for China",
    color: getSemanticColor('active')
  },

  "Tech for Tech Foundation": {
    name: "Tech for Tech Foundation",
    color: getSemanticColor('active')
  }
} as const;

export const Goal = {
  "Guest Experience": {
    name: "Guest Experience",
    color: getSemanticColor('active')
  },

  "Effieciency Improvement": {
    name: "Effieciency Improvement",
    color: getSemanticColor('active')
  },

  "Drive Sales": {
    name: "Drive Sales",
    color: getSemanticColor('active')
  },

  "Foundation": {
    name: "Foundation",
    color: getSemanticColor('active')
  },

  "No Goal": {
    name: "No Goal",
    color: getSemanticColor('active')
  },

  "Compliance": {
    name: "Compliance",
    color: getSemanticColor('active')
  }
} as const;

export const Function = {
  "Brand Marketing": {
    name: "Brand Marketing",
    color: getRainbowColor("purple")
  },

  "Corporate": {
    name: "Corporate",
    color: getRainbowColor("orange")
  },

  "E-com": {
    name: "E-com",
    color: getRainbowColor("pink")
  },

  "Fulfillment": {
    name: "Fulfillment",
    color: getRainbowColor("cyan")
  },

  "Product": {
    name: "Product",
    color: getRainbowColor("emerald")
  },

  "Retail": {
    name: "Retail",
    color: getRainbowColor("rose")
  },

  "Tech": {
    name: "Tech",
    color: getRainbowColor("blue")
  }
} as const;


export const RistLevel = {
  "On Track": {
    name: "On Track",
    color: getSemanticColor('active')
  },

  "Manageable Risks": {
    name: "Manageable Risks",
    color: getSemanticColor('warning')
  },

  "High Risks": {
    name: "High Risks",
    color: getSemanticColor('error')
  },

  "Pending": {
    name: "Pending",
    color: getSemanticColor('active')
  },

  "Unknown": {
    name: "Unknown",
    color: getSemanticColor('active')
  }
} as const;


export const Status = {
  "Business Intake": {
    name: "Business Intake",
    color: getSemanticColor('warning'),
  },

  "Feasibility Study": {
    name: "Feasibility Study",
    color: getSemanticColor('warning'),
  },

  "Development": {
    name: "Development",
    color: getSemanticColor('active'),
  },

  "System Deploy": {
    name: "System Deploy",
    color: getSemanticColor('active'),
  },

  "Operations Handover": {
    name: "Operations Handover",
    color: getSemanticColor('success'),
  },
} as const

export const Priority = {
  "High": {
    name: "High",
    color: getSemanticColor('error'),
    icon: "chevrons-up"
  },

  "Medium": {
    name: "Medium",
    color: getSemanticColor('active'),
    icon: "equal"
  },

  "Low": {
    name: "Low",
    color: getCSSVar("--color--text-negative"),
    icon: "chevrons-down"
  },
}

/**
 * 动态生成 CN Initiative 配置
 * 自动从 jira 数据中提取所有唯一的 CN Initiative 值
 */
function generateCNInitiativeConfig() {
  // 提取所有唯一的 CN Initiative 值
  const uniqueInitiatives = Array.from(
    new Set(jiraData.map(item => item["CN Initiative"]))
  ).filter(Boolean); // 过滤掉空值

  // 生成配置对象
  const config: Record<string, { name: string; color: string }> = {};
  
  uniqueInitiatives.forEach(initiative => {
    config[initiative] = {
      name: initiative,
      color: getSemanticColor('active')
    };
  });

  return config;
}

export const CNInitiative = generateCNInitiativeConfig();