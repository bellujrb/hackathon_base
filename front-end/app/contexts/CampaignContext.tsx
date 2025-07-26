import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CampaignData } from '../types/campaign';

interface CampaignContextType {
  campaignData: CampaignData;
  updateCampaignBasics: (data: { campaignName: string; brandName: string }) => void;
  updateContentRequirements: (data: { selectedContentTypes: string[]; selectedPlatforms: string[] }) => void;
  updateSuccessMetrics: (data: {
    selectedPrimaryKPIs: string[];
    selectedSecondaryKPIs: string[];
    primaryTargets: Record<string, string>;
    secondaryTargets: Record<string, string>;
  }) => void;
  updateBudgetTimeline: (data: { totalBudget: string; endDate: string }) => void;
  resetCampaignData: () => void;
  getCampaignData: () => CampaignData;
}

const defaultCampaignData: CampaignData = {
  campaignName: '',
  brandName: '',
  selectedContentTypes: [],
  selectedPlatforms: [],
  selectedPrimaryKPIs: [],
  selectedSecondaryKPIs: [],
  primaryTargets: {},
  secondaryTargets: {},
  totalBudget: '',
  endDate: '',
};

const CampaignContext = createContext<CampaignContextType | undefined>(undefined);

export function CampaignProvider({ children }: { children: ReactNode }) {
  const [campaignData, setCampaignData] = useState<CampaignData>(defaultCampaignData);

  const updateCampaignBasics = (data: { campaignName: string; brandName: string }) => {
    setCampaignData(prev => ({
      ...prev,
      ...data
    }));
  };

  const updateContentRequirements = (data: { selectedContentTypes: string[]; selectedPlatforms: string[] }) => {
    setCampaignData(prev => ({
      ...prev,
      ...data
    }));
  };

  const updateSuccessMetrics = (data: {
    selectedPrimaryKPIs: string[];
    selectedSecondaryKPIs: string[];
    primaryTargets: Record<string, string>;
    secondaryTargets: Record<string, string>;
  }) => {
    setCampaignData(prev => ({
      ...prev,
      ...data
    }));
  };

  const updateBudgetTimeline = (data: { totalBudget: string; endDate: string }) => {
    setCampaignData(prev => ({
      ...prev,
      ...data
    }));
  };

  const resetCampaignData = () => {
    setCampaignData(defaultCampaignData);
  };

  const getCampaignData = () => {
    return campaignData;
  };

  const value: CampaignContextType = {
    campaignData,
    updateCampaignBasics,
    updateContentRequirements,
    updateSuccessMetrics,
    updateBudgetTimeline,
    resetCampaignData,
    getCampaignData,
  };

  return (
    <CampaignContext.Provider value={value}>
      {children}
    </CampaignContext.Provider>
  );
}

export function useCampaign() {
  const context = useContext(CampaignContext);
  if (context === undefined) {
    throw new Error('useCampaign must be used within a CampaignProvider');
  }
  return context;
} 