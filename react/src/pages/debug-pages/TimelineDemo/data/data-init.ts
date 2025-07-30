import type { BaseTimelineItemType } from "tristan-ui";
import { type Function, type Goal, type RistLevel, type Status, type Type } from "./data-types";

export interface ProjectDataType extends BaseTimelineItemType {
  "Type": keyof typeof Type;
  "CN Initiative": string;
  "Owner": string;
  "Business Owner": string;
  "Risk Level": keyof typeof RistLevel;
  "Goal": keyof typeof Goal;
  "Function": keyof typeof Function;
  "Status": keyof typeof Status;
  "Intake": string;
  "Priority": string;
  "Progress": number;
}