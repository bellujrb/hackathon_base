"use client";

import {
  useMiniKit,
  useAddFrame,
  useOpenUrl,
} from "@coinbase/onchainkit/minikit";
import {
  Name,
  Identity,
  Address,
  Avatar,
  EthBalance,
  Badge,
} from "@coinbase/onchainkit/identity";
import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownDisconnect,
} from "@coinbase/onchainkit/wallet";
import { useEffect, useMemo, useState, useCallback } from "react";
import { useAccount } from "wagmi";
import { Features } from "./components/onboarding/onboarding_features";
import { Button } from "./components/ui/button";
import { Icon } from "./components/ui/icon";
import { Home } from "./components/welcome_screen/welcome";
import { ConnectionScreen } from "./components/connection/connection_screen";
import { DashboardScreen } from "./components/dashboard/dashboard_screen";
import { BottomNavigation } from "./components/navigation/bottom_navigation";
import { CampaignsScreen } from "./components/campaigns/campaigns_screen";
import { CampaignBasicsScreen } from "./components/create-campaings/campaign_basics_screen";
import { ContentRequirementsScreen } from "./components/create-campaings/content_requirements_screen";
import { SuccessMetricsScreen } from "./components/create-campaings/success_metrics_screen";
import { BudgetTimelineScreen } from "./components/create-campaings/budget_timeline_screen";
import { CampaignSuccessScreen } from "./components/create-campaings/campaign_success_screen";
import { AnalyticsScreen } from "./components/analytics/analytics_screen";
import { SettingsScreen } from "./components/settings/settings_screen";

export default function App() {
  const { setFrameReady, isFrameReady, context } = useMiniKit();
  const [frameAdded, setFrameAdded] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const { isConnected } = useAccount();

  const addFrame = useAddFrame();
  const openUrl = useOpenUrl();

  useEffect(() => {
    if (!isFrameReady) {
      setFrameReady();
    }
  }, [setFrameReady, isFrameReady]);

  const handleAddFrame = useCallback(async () => {
    const frameAdded = await addFrame();
    setFrameAdded(Boolean(frameAdded));
  }, [addFrame]);

  const saveFrameButton = useMemo(() => {
    if (context && !context.client.added) {
      return (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleAddFrame}
          className="text-[var(--app-accent)] p-4"
          icon={<Icon name="plus" size="sm" />}
        >
          Save Frame
        </Button>
      );
    }

    if (frameAdded) {
      return (
        <div className="flex items-center space-x-1 text-sm font-medium text-[#0052FF] animate-fade-out">
          <Icon name="check" size="sm" className="text-[#0052FF]" />
          <span>Saved</span>
        </div>
      );
    }

    return null;
  }, [context, frameAdded, handleAddFrame]);

  return (
    <div className="flex flex-col min-h-screen font-sans text-[var(--app-foreground)] mini-app-theme from-[var(--app-background)] to-[var(--app-gray)]">
      <div className="w-full max-w-md mx-auto px-4 py-3">
        <header className="flex justify-between items-center mb-6 h-11 relative z-[9999]">
          <h1 className="text-xl font-bold text-[var(--app-foreground)]">InfluNest</h1>
          <div className="flex items-center space-x-2">
            <Wallet className="z-[10000] relative">
              <ConnectWallet>
                <Name className="text-inherit" />
              </ConnectWallet>
              <WalletDropdown className="z-[10000]">
                <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
                  <Avatar />
                  <Name>
                    <Badge />
                  </Name>
                  <Address />
                  <EthBalance />
                </Identity>
                <WalletDropdownDisconnect />
              </WalletDropdown>
            </Wallet>
            {saveFrameButton}
          </div>
        </header>

        <main className={`flex-1 ${(activeTab === "dashboard" || activeTab === "campaigns" || activeTab === "analytics" || activeTab === "settings" || activeTab === "campaign-basics" || activeTab === "content-requirements" || activeTab === "success-metrics" || activeTab === "budget-timeline" || activeTab === "campaign-success") ? "pb-20" : ""}`}>
          {activeTab === "home" && <Home setActiveTab={setActiveTab} />}
          {activeTab === "connection" && <ConnectionScreen setActiveTab={setActiveTab} />}
          {activeTab === "features" && <Features setActiveTab={setActiveTab} />}
          {activeTab === "dashboard" && <DashboardScreen setActiveTab={setActiveTab} />}
          {activeTab === "campaigns" && <CampaignsScreen setActiveTab={setActiveTab} />}
          {activeTab === "campaign-basics" && <CampaignBasicsScreen setActiveTab={setActiveTab} />}
          {activeTab === "content-requirements" && <ContentRequirementsScreen setActiveTab={setActiveTab} />}
          {activeTab === "success-metrics" && <SuccessMetricsScreen setActiveTab={setActiveTab} />}
          {activeTab === "budget-timeline" && <BudgetTimelineScreen setActiveTab={setActiveTab} />}
          {activeTab === "campaign-success" && <CampaignSuccessScreen setActiveTab={setActiveTab} />}
          {activeTab === "analytics" && <AnalyticsScreen setActiveTab={setActiveTab} />}
          {activeTab === "settings" && <SettingsScreen setActiveTab={setActiveTab} />}
        </main>

        <footer className="mt-2 pt-4 flex justify-center">
          <Button
            variant="ghost"
            size="sm"
            className="text-[var(--ock-text-foreground-muted)] text-xs"
            onClick={() => openUrl("https://base.org/builders/minikit")}
          >
            Built on Base with MiniKit
          </Button>
        </footer>
      </div>
      
      {/* Bottom Navigation - Only show from dashboard onwards */}
      {(activeTab === "dashboard" || activeTab === "campaigns" || activeTab === "analytics" || activeTab === "settings" || activeTab === "campaign-basics" || activeTab === "content-requirements" || activeTab === "success-metrics" || activeTab === "budget-timeline" || activeTab === "campaign-success") && (
        <BottomNavigation 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          isConnected={isConnected} 
        />
      )}
    </div>
  );
}
