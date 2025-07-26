import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Icon } from "../ui/icon";
import { useState } from "react";
import { useAccount } from "wagmi";
import { ConnectWallet } from "@coinbase/onchainkit/wallet";

type CampaignsScreenProps = {
  setActiveTab: (tab: string) => void;
};

type Campaign = {
  id: string;
  title: string;
  status: "ACTIVE" | "COMPLETED" | "PENDING";
  target: string;
  endDate: string;
  totalValue: string;
  progress: number;
};

export function CampaignsScreen({ setActiveTab }: CampaignsScreenProps) {
  const { isConnected } = useAccount();
  const [activeFilter, setActiveFilter] = useState("All");

  const campaigns: Campaign[] = [
    {
      id: "1",
      title: "Nike Summer Campaign",
      status: "ACTIVE",
      target: "50.000 views",
      endDate: "2025-07-30",
      totalValue: "$2.500",
      progress: 75
    },
    {
      id: "2",
      title: "Adidas Run Series",
      status: "COMPLETED",
      target: "10.000 likes",
      endDate: "2025-07-20",
      totalValue: "$1.800",
      progress: 100
    },
    {
      id: "3",
      title: "Puma Fitness Challenge",
      status: "PENDING",
      target: "25.000 shares",
      endDate: "2025-08-15",
      totalValue: "$3.200",
      progress: 0
    }
  ];

  const filters = ["All", "Active", "Pending", "Completed"];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "bg-blue-200 text-green-600";
      case "COMPLETED":
        return "bg-blue-200 text-green-600";
      case "PENDING":
        return "bg-yellow-200 text-yellow-700";
      default:
        return "bg-gray-200 text-gray-600";
    }
  };

  const filteredCampaigns = campaigns.filter(campaign => {
    if (activeFilter === "All") return true;
    return campaign.status.toLowerCase() === activeFilter.toLowerCase();
  });

  if (!isConnected) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-black">
            Campaigns
          </h1>
          <p className="text-gray-600">
            Connect your wallet to view and manage your campaigns
          </p>
        </div>

        <Card className="bg-white p-6 space-y-4">
          <div className="text-center space-y-4">
            <Icon name="heart" className="mx-auto text-gray-400" size="lg" />
            <h2 className="text-lg font-semibold text-gray-700">
              Connect Wallet Required
            </h2>
            <p className="text-gray-500 text-sm">
              You need to connect your wallet to access campaigns
            </p>
            <ConnectWallet className="w-full" />
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-black">Campaigns</h1>
        <Button
          variant="ghost"
          size="sm"
          className="bg-blue-500 text-white hover:bg-blue-600 p-3 rounded-lg"
          icon={<Icon name="plus" size="sm" />}
          onClick={() => setActiveTab("campaign-basics")}
        >
          +
        </Button>
      </div>

      {/* Filters */}
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              activeFilter === filter
                ? "bg-blue-100 text-blue-600 border-2 border-blue-300 border-dashed"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Campaigns List */}
      <div className="space-y-4">
        {filteredCampaigns.map((campaign) => (
          <Card key={campaign.id} className="bg-white p-4">
            {/* Campaign Header */}
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-800">{campaign.title}</h3>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs font-bold ${getStatusColor(campaign.status)}`}>
                  {campaign.status}
                </span>
                <Icon name="arrow-right" className="text-gray-400" size="sm" />
              </div>
            </div>

            {/* Campaign Details */}
            <div className="space-y-1 mb-6">
              <p className="text-sm text-gray-700">Target: {campaign.target}</p>
              <p className="text-sm text-gray-700">Ends: {campaign.endDate}</p>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 gap-4 mb-3">
              <div className="bg-gray-100 rounded-lg p-3 text-center">
                <p className="text-xl font-bold text-green-600">{campaign.totalValue}</p>
                <p className="text-xs text-gray-700">Total value</p>
              </div>
              <div className="bg-gray-100 rounded-lg p-3 text-center">
                <p className="text-xl font-bold text-blue-600">{campaign.progress}%</p>
                <p className="text-xs text-gray-700">Progress</p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${campaign.progress}%` }}
              ></div>
            </div>

            {/* Action Button */}
            <Button
              variant="ghost"
              className="w-full bg-gray-100 text-gray-700 hover:bg-gray-200 py-3 rounded-lg"
            >
              View details
            </Button>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredCampaigns.length === 0 && (
        <Card className="bg-white p-6 text-center space-y-4">
          <Icon name="heart" className="mx-auto text-gray-400" size="lg" />
          <h2 className="text-lg font-semibold text-gray-700">
            No campaigns found
          </h2>
          <p className="text-gray-500 text-sm">
            {activeFilter === "All" 
              ? "Create your first campaign to get started"
              : `No ${activeFilter.toLowerCase()} campaigns found`
            }
          </p>
        </Card>
      )}
    </div>
  );
} 