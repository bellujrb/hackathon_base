import { useState, useEffect } from "react";
import { Button } from "../../../components/button";
import { Card } from "../../../components/card";
import Icon from "../../../components/icon";
import { useCampaign } from "../../contexts/CampaignContext";
import { KPIMetric } from "../../types/campaign";

type SuccessMetricsScreenProps = {
  setActiveTab: (tab: string) => void;
};

export function SuccessMetricsScreen({ setActiveTab }: SuccessMetricsScreenProps) {
  const { campaignData, updateSuccessMetrics } = useCampaign();
  const [selectedPrimaryKPIs, setSelectedPrimaryKPIs] = useState<string[]>(
    campaignData.selectedPrimaryKPIs.length > 0 ? campaignData.selectedPrimaryKPIs : ["views"]
  );
  const [selectedSecondaryKPIs, setSelectedSecondaryKPIs] = useState<string[]>(
    campaignData.selectedSecondaryKPIs.length > 0 ? campaignData.selectedSecondaryKPIs : ["likes"]
  );
  const [primaryTargets, setPrimaryTargets] = useState<Record<string, string>>(
    Object.keys(campaignData.primaryTargets).length > 0 ? campaignData.primaryTargets : { views: "1" }
  );
  const [secondaryTargets, setSecondaryTargets] = useState<Record<string, string>>(
    Object.keys(campaignData.secondaryTargets).length > 0 ? campaignData.secondaryTargets : { likes: "" }
  );

  // Sync local state with context when context changes
  useEffect(() => {
    if (campaignData.selectedPrimaryKPIs.length > 0) {
      setSelectedPrimaryKPIs(campaignData.selectedPrimaryKPIs);
    }
    if (campaignData.selectedSecondaryKPIs.length > 0) {
      setSelectedSecondaryKPIs(campaignData.selectedSecondaryKPIs);
    }
    if (Object.keys(campaignData.primaryTargets).length > 0) {
      setPrimaryTargets(campaignData.primaryTargets);
    }
    if (Object.keys(campaignData.secondaryTargets).length > 0) {
      setSecondaryTargets(campaignData.secondaryTargets);
    }
  }, [campaignData.selectedPrimaryKPIs, campaignData.selectedSecondaryKPIs, campaignData.primaryTargets, campaignData.secondaryTargets]);

  const primaryKPIs: KPIMetric[] = [
    {
      id: "views",
      name: "Views",
      icon: "star",
      color: "text-green-600",
      borderColor: "border-green-500",
      bgColor: "bg-green-100"
    },
    {
      id: "engagement",
      name: "Engagement",
      icon: "heart",
      color: "text-purple-600",
      borderColor: "border-purple-500",
      bgColor: "bg-purple-100"
    },
    {
      id: "reach",
      name: "Reach",
      icon: "check",
      color: "text-yellow-600",
      borderColor: "border-yellow-500",
      bgColor: "bg-yellow-100"
    }
  ];

  const secondaryKPIs: KPIMetric[] = [
    {
      id: "likes",
      name: "Likes",
      icon: "heart",
      color: "text-blue-600",
      borderColor: "border-blue-500",
      bgColor: "bg-blue-100"
    },
    {
      id: "comments",
      name: "Comments",
      icon: "star",
      color: "text-red-600",
      borderColor: "border-red-500",
      bgColor: "bg-red-100"
    }
  ];

  const handleBackToDashboard = () => {
    setActiveTab("dashboard");
  };

  const handleContinue = () => {
    updateSuccessMetrics({
      selectedPrimaryKPIs,
      selectedSecondaryKPIs,
      primaryTargets,
      secondaryTargets
    });
    setActiveTab("budget-timeline");
  };

  const togglePrimaryKPI = (kpiId: string) => {
    setSelectedPrimaryKPIs(prev => 
      prev.includes(kpiId)
        ? prev.filter(id => id !== kpiId)
        : [...prev, kpiId]
    );
  };

  const toggleSecondaryKPI = (kpiId: string) => {
    setSelectedSecondaryKPIs(prev => 
      prev.includes(kpiId)
        ? prev.filter(id => id !== kpiId)
        : [...prev, kpiId]
    );
  };

  const updatePrimaryTarget = (kpiId: string, value: string) => {
    setPrimaryTargets(prev => ({
      ...prev,
      [kpiId]: value
    }));
  };

  const updateSecondaryTarget = (kpiId: string, value: string) => {
    setSecondaryTargets(prev => ({
      ...prev,
      [kpiId]: value
    }));
  };

  const isFormValid = selectedPrimaryKPIs.length > 0 && 
    selectedPrimaryKPIs.every(kpi => primaryTargets[kpi]?.trim().length > 0);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center">
        <button
          onClick={handleBackToDashboard}
          className="text-blue-500 hover:text-blue-600 font-medium"
        >
          ← Back to dashboard
        </button>
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-black">Success Metrics (KPIs)</h1>
      </div>

      {/* Primary KPIs Section */}
      <Card className="bg-white p-6 space-y-4">
        <h2 className="text-lg font-bold text-black">Primary KPIs *</h2>
        <div className="space-y-4">
          {primaryKPIs.map((kpi) => (
            <div key={kpi.id} className="space-y-2">
              <Card
                className={`p-4 cursor-pointer transition-all border-2 ${
                  selectedPrimaryKPIs.includes(kpi.id)
                    ? `${kpi.borderColor} ${kpi.bgColor}`
                    : "border-gray-200 bg-white hover:border-gray-300"
                }`}
                onClick={() => togglePrimaryKPI(kpi.id)}
              >
                <div className="flex items-center space-x-3">
                  <Icon 
                    name={kpi.icon} 
                    className={`${
                      selectedPrimaryKPIs.includes(kpi.id) ? kpi.color : "text-gray-600"
                    }`} 
                  />
                  <span className="font-medium text-black">{kpi.name}</span>
                </div>
              </Card>
              {selectedPrimaryKPIs.includes(kpi.id) && (
                <input
                  type="number"
                  value={primaryTargets[kpi.id] || ""}
                  onChange={(e) => updatePrimaryTarget(kpi.id, e.target.value)}
                  placeholder="100000"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-colors"
                />
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Secondary KPIs Section */}
      <Card className="bg-white p-6 space-y-4">
        <h2 className="text-lg font-bold text-black">Secondary KPIs (Optional)</h2>
        <div className="space-y-4">
          {secondaryKPIs.map((kpi) => (
            <div key={kpi.id} className="space-y-2">
              <Card
                className={`p-4 cursor-pointer transition-all border-2 ${
                  selectedSecondaryKPIs.includes(kpi.id)
                    ? `${kpi.borderColor} ${kpi.bgColor}`
                    : "border-gray-200 bg-white hover:border-gray-300"
                }`}
                onClick={() => toggleSecondaryKPI(kpi.id)}
              >
                <div className="flex items-center space-x-3">
                  <Icon 
                    name={kpi.icon} 
                    className={`${
                      selectedSecondaryKPIs.includes(kpi.id) ? kpi.color : "text-gray-600"
                    }`} 
                  />
                  <span className="font-medium text-black">{kpi.name}</span>
                </div>
              </Card>
              {selectedSecondaryKPIs.includes(kpi.id) && (
                <input
                  type="number"
                  value={secondaryTargets[kpi.id] || ""}
                  onChange={(e) => updateSecondaryTarget(kpi.id, e.target.value)}
                  placeholder="0"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
                />
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex space-x-3">
        <Button
          onClick={handleBackToDashboard}
          variant="outline"
          className="flex-1 bg-white border-gray-300 text-gray-700 hover:bg-gray-50 py-3 rounded-lg font-medium"
        >
          <Icon name="arrow-right" className="mr-2 rotate-180" />
          Back
        </Button>
        <Button
          onClick={handleContinue}
          disabled={!isFormValid}
          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Continue
          <Icon name="arrow-right" className="ml-2" />
        </Button>
      </div>
    </div>
  );
} 