import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Icon } from "../ui/icon";
import { useCampaign } from "../../contexts/CampaignContext";

type BudgetTimelineScreenProps = {
  setActiveTab: (tab: string) => void;
};

export function BudgetTimelineScreen({ setActiveTab }: BudgetTimelineScreenProps) {
  const { campaignData, updateBudgetTimeline } = useCampaign();
  const [totalBudget, setTotalBudget] = useState(campaignData.totalBudget || "0");
  const [endDate, setEndDate] = useState(campaignData.endDate);

  // Get today's date in YYYY-MM-DD format for min attribute
  const today = new Date().toISOString().split('T')[0];

  // Format currency input
  const formatCurrency = (value: string): string => {
    // Remove all non-numeric characters except decimal point
    const numericValue = value.replace(/[^\d.]/g, '');
    
    // Ensure only one decimal point
    const parts = numericValue.split('.');
    if (parts.length > 2) {
      return parts[0] + '.' + parts.slice(1).join('');
    }
    
    // Limit to 4 decimal places (common for crypto)
    if (parts.length === 2 && parts[1].length > 4) {
      return parts[0] + '.' + parts[1].substring(0, 4);
    }
    
    return numericValue;
  };

  // Format display value with commas for thousands
  const formatDisplayValue = (value: string): string => {
    if (!value || value === '0') return '';
    
    const numericValue = parseFloat(value);
    if (isNaN(numericValue)) return '';
    
    return numericValue.toLocaleString('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 4
    });
  };

  // Sync local state with context when context changes
  useEffect(() => {
    if (campaignData.totalBudget) {
      setTotalBudget(campaignData.totalBudget);
    }
    if (campaignData.endDate) {
      setEndDate(campaignData.endDate);
    }
  }, [campaignData.totalBudget, campaignData.endDate]);

  const handleBack = () => {
    setActiveTab("success-metrics");
  };

  const handleCreate = () => {
    updateBudgetTimeline({ totalBudget, endDate });
    setActiveTab("campaign-success");
  };

  const isFormValid = totalBudget.trim().length > 0 && 
    parseFloat(totalBudget) > 0 &&
    endDate.trim().length > 0 && 
    new Date(endDate) >= new Date(today);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-black">Budget & Timeline</h1>
        <p className="text-gray-600">Set your campaign budget and timeline</p>
      </div>

      {/* Budget & Timeline Form */}
      <Card className="bg-white p-6 space-y-6">
        {/* Total Budget Input */}
        <div className="space-y-2">
          <label htmlFor="totalBudget" className="block text-sm font-medium text-gray-700">
            Total Budget (ETH) *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 text-lg">Ξ</span>
            </div>
            <input
              id="totalBudget"
              type="text"
              value={formatDisplayValue(totalBudget)}
              onChange={(e) => setTotalBudget(formatCurrency(e.target.value))}
              className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors font-bold text-gray-800"
              placeholder="0.0"
            />
          </div>
          <p className="text-xs text-gray-500">
            Use até 4 casas decimais (ex: 1.2345 ETH)
          </p>
        </div>

        {/* End Date Input */}
        <div className="space-y-2">
          <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
            End Date *
          </label>
          <div className="relative">
            <input
              id="endDate"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              min={today}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors ${
                endDate && new Date(endDate) < new Date(today)
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-300'
              }`}
              placeholder="dd/mm/aaaa"
            />
          </div>
          {endDate && new Date(endDate) < new Date(today) && (
            <p className="text-sm text-red-600">
              A data de término não pode ser anterior a hoje
            </p>
          )}
        </div>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex space-x-3">
        <Button
          onClick={handleBack}
          variant="outline"
          className="flex-1 bg-white border-gray-300 text-gray-700 hover:bg-gray-50 py-3 rounded-lg font-medium"
        >
          <Icon name="arrow-right" className="mr-2 rotate-180" />
          Back
        </Button>
        <Button
          onClick={handleCreate}
          disabled={!isFormValid}
          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Create
        </Button>
      </div>
    </div>
  );
} 