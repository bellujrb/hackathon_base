// Campaign Data Types
export interface CampaignData {
  // Campaign Basics
  campaignName: string;
  brandName: string;
  
  // Content Requirements
  selectedContentTypes: string[];
  selectedPlatforms: string[];
  
  // Success Metrics
  selectedPrimaryKPIs: string[];
  selectedSecondaryKPIs: string[];
  primaryTargets: Record<string, string>;
  secondaryTargets: Record<string, string>;
  
  // Budget & Timeline
  totalBudget: string;
  endDate: string;
}

// Content Type Definition
export interface ContentType {
  id: string;
  name: string;
  description: string;
  icon: "heart" | "star" | "check" | "plus" | "arrow-right" | "lightning" | "wallet" | "camera";
}

// Platform Definition
export interface Platform {
  id: string;
  name: string;
  icon: "heart" | "star" | "check" | "plus" | "arrow-right" | "lightning" | "wallet" | "camera";
}

// KPI Metric Definition
export interface KPIMetric {
  id: string;
  name: string;
  icon: "heart" | "star" | "check" | "plus" | "arrow-right" | "lightning" | "wallet" | "camera";
  color: string;
  borderColor: string;
  bgColor: string;
}

// Form Progress
export interface FormProgress {
  completedSteps: number;
  totalSteps: number;
  percentage: number;
}

// Campaign Save Result
export interface CampaignSaveResult {
  success: boolean;
  campaignId: string;
  error?: string;
} 