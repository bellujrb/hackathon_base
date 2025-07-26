import { useState } from "react";
import { useAccount } from "wagmi";
import { ConnectWallet } from "@coinbase/onchainkit/wallet";
import { AnalyticsHeader } from "./analytics-header";
import { TimeFilters } from "./time-filters";
import { MetricCard } from "./metric-card";
import { PerformanceChart } from "./performance-chart";
import { EngagementBreakdown } from "./engagement-breakdown";
import { BestPerformance } from "./best-performance";
import { TopPerformingContent } from "./top-performing-content";
import { MetricCard as MetricCardType, ChartData, ContentItem, BestPerformanceData } from "./types";
import { Card } from "../ui/card";
import { Icon } from "../ui/icon";

type AnalyticsScreenProps = {
  setActiveTab: (tab: string) => void;
};

export function AnalyticsScreen({ setActiveTab }: AnalyticsScreenProps) {
  const { isConnected } = useAccount();
  const [activeTimeFilter, setActiveTimeFilter] = useState("7 days");
  const [selectedMetric, setSelectedMetric] = useState("views");

  const timeFilters = ["7 days", "30 days", "3 months", "1 year"];

  // Dados do gráfico para diferentes métricas
  const chartData: Record<string, ChartData[]> = {
    views: [
      { day: 'Mon', value: 0.0, lastWeek: 0.0 },
      { day: 'Tue', value: 0.1, lastWeek: 0.08 },
      { day: 'Wed', value: 0.0, lastWeek: 0.05 },
      { day: 'Thu', value: 0.1, lastWeek: 0.12 },
      { day: 'Fri', value: 0.1, lastWeek: 0.09 },
      { day: 'Sat', value: 0.1, lastWeek: 0.15 },
      { day: 'Sun', value: 0.1, lastWeek: 0.11 }
    ],
    engagement: [
      { day: 'Mon', value: 5.2, lastWeek: 4.8 },
      { day: 'Tue', value: 6.8, lastWeek: 5.1 },
      { day: 'Wed', value: 4.9, lastWeek: 5.3 },
      { day: 'Thu', value: 7.1, lastWeek: 6.2 },
      { day: 'Fri', value: 6.5, lastWeek: 5.9 },
      { day: 'Sat', value: 8.4, lastWeek: 7.8 },
      { day: 'Sun', value: 7.9, lastWeek: 7.2 }
    ],
    earnings: [
      { day: 'Mon', value: 1200, lastWeek: 1100 },
      { day: 'Tue', value: 1800, lastWeek: 1600 },
      { day: 'Wed', value: 1400, lastWeek: 1500 },
      { day: 'Thu', value: 2200, lastWeek: 1900 },
      { day: 'Fri', value: 2000, lastWeek: 1800 },
      { day: 'Sat', value: 2800, lastWeek: 2500 },
      { day: 'Sun', value: 2600, lastWeek: 2400 }
    ],
    campaigns: [
      { day: 'Mon', value: 2, lastWeek: 2 },
      { day: 'Tue', value: 3, lastWeek: 2 },
      { day: 'Wed', value: 2, lastWeek: 3 },
      { day: 'Thu', value: 4, lastWeek: 3 },
      { day: 'Fri', value: 3, lastWeek: 4 },
      { day: 'Sat', value: 5, lastWeek: 4 },
      { day: 'Sun', value: 4, lastWeek: 5 }
    ]
  };

  const metrics: MetricCardType[] = [
    {
      id: "views",
      title: "Views",
      value: "2.4M",
      icon: "star",
      iconColor: "text-white",
      iconBgColor: "bg-blue-500",
      trend: "12.8%",
      isSelected: true
    },
    {
      id: "engagement",
      title: "Engagement",
      value: "8.4%",
      icon: "heart",
      iconColor: "text-white",
      iconBgColor: "bg-red-500",
      trend: "5.2%"
    },
    {
      id: "earnings",
      title: "Earnings",
      value: "18.650",
      icon: "check",
      iconColor: "text-white",
      iconBgColor: "bg-green-500",
      trend: "23.5%"
    },
    {
      id: "campaigns",
      title: "Campaigns",
      value: "24",
      icon: "plus",
      iconColor: "text-white",
      iconBgColor: "bg-purple-500",
      trend: "15%"
    }
  ];

  const topContent: ContentItem[] = [
    {
      id: "1",
      views: "15K",
      likes: "3K",
      comments: "180",
      date: "2025-07-20",
      engagement: "17.9%"
    },
    {
      id: "2",
      views: "12K",
      likes: "2K",
      comments: "95",
      date: "2025-07-19",
      engagement: "15.8%"
    },
    {
      id: "3",
      views: "12K",
      likes: "2K",
      comments: "95",
      date: "2025-07-19",
      engagement: "15.8%"
    }
  ];

  const bestPerformanceData: BestPerformanceData = {
    bestDay: {
      day: "Saturday",
      percentage: "+34% above average"
    },
    peakHours: {
      hours: "6-8 PM",
      percentage: "+28% engagement"
    },
    topContentType: {
      type: "Video posts",
      percentage: "+45% vs photos"
    }
  };

  const getMetricLabel = (metric: string) => {
    switch (metric) {
      case 'views': return 'Views';
      case 'engagement': return 'Engagement';
      case 'earnings': return 'Earnings';
      case 'campaigns': return 'Campaigns';
      default: return 'Views';
    }
  };

  const getValueFormatter = (metric: string) => {
    switch (metric) {
      case 'views': return (value: number) => `${value.toFixed(1)}M`;
      case 'engagement': return (value: number) => `${value.toFixed(1)}%`;
      case 'earnings': return (value: number) => `$${value.toLocaleString()}`;
      case 'campaigns': return (value: number) => value.toString();
      default: return (value: number) => value.toString();
    }
  };

  const handleViewAll = () => {
    // Implementar navegação para ver todos os conteúdos
    console.log("View all content");
  };

  const handleDownload = () => {
    // Implementar download dos dados
    console.log("Download analytics");
  };

  const handleFilter = () => {
    // Implementar filtros adicionais
    console.log("Open filters");
  };

  if (!isConnected) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-black">
            Analytics
          </h1>
          <p className="text-gray-600">
            Connect your wallet to view your analytics and insights
          </p>
        </div>

        <Card className="bg-white p-6 space-y-4">
          <div className="text-center space-y-4">
            <Icon name="star" className="mx-auto text-gray-400" size="lg" />
            <h2 className="text-lg font-semibold text-gray-700">
              Connect Wallet Required
            </h2>
            <p className="text-gray-500 text-sm">
              You need to connect your wallet to access analytics
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
      <AnalyticsHeader
        title="Analytics"
        description="Track your performance across all campaigns"
        onDownload={handleDownload}
        onFilter={handleFilter}
      />

      {/* Time Period Filters */}
      <TimeFilters
        filters={timeFilters}
        activeFilter={activeTimeFilter}
        onFilterChange={setActiveTimeFilter}
      />

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-4">
        {metrics.map((metric) => (
          <MetricCard
            key={metric.id}
            {...metric}
            isSelected={selectedMetric === metric.id}
            onClick={() => setSelectedMetric(metric.id)}
          />
        ))}
      </div>

      {/* Performance Chart */}
      <PerformanceChart
        data={chartData[selectedMetric]}
        selectedMetric={selectedMetric}
        getValueFormatter={getValueFormatter}
        getMetricLabel={getMetricLabel}
      />

      {/* Engagement Breakdown */}
      <EngagementBreakdown
        likes={68}
        comments={24}
        shares={8}
      />

      {/* Best Performance */}
      <BestPerformance {...bestPerformanceData} />

      {/* Top Performing Content */}
      <TopPerformingContent
        content={topContent}
        onViewAll={handleViewAll}
      />
    </div>
  );
} 