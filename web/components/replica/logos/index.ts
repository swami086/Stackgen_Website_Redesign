"use client";

export type { MarkProps, VendorSlug } from "./marks";
export {
  AwsMark,
  BackstageMark,
  CursorMark,
  DatadogMark,
  EksMark,
  GitHubMark,
  GitLabMark,
  JiraMark,
  OpaMark,
  PagerDutyMark,
  PrometheusMark,
  SlackMark,
  TerraformMark,
  VENDOR_MARKS,
  VendorMark,
} from "./marks";

/** Human-readable names for accessible labels where a mark stands alone. */
export const VENDOR_NAMES: Record<import("./marks").VendorSlug, string> = {
  aws: "AWS",
  backstage: "Backstage",
  cursor: "Cursor",
  datadog: "Datadog",
  eks: "Amazon EKS",
  github: "GitHub",
  gitlab: "GitLab",
  jira: "Jira",
  opa: "Open Policy Agent",
  pagerduty: "PagerDuty",
  prometheus: "Prometheus",
  slack: "Slack",
  terraform: "Terraform",
};
