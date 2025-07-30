import type { ProjectDataType } from "./data-init";
import { jiraData } from "./jira-data";

/**
 * 筛选出 startDate 或 endDate 为 undefined 的项目
 */
export function generateJiraDataWithNoDate(): ProjectDataType[] {
  return jiraData.filter(project => 
    project.startDate === undefined || project.endDate === undefined
  );
}

export const jiraDataWithNoDate = generateJiraDataWithNoDate();
