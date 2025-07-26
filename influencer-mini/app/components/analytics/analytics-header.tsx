import { Button } from "../ui/button";
import { Icon } from "../ui/icon";

type AnalyticsHeaderProps = {
  title: string;
  description: string;
  onDownload?: () => void;
  onFilter?: () => void;
};

export function AnalyticsHeader({ title, description, onDownload, onFilter }: AnalyticsHeaderProps) {
  return (
    <div className="flex justify-between items-start">
      <div>
        <h1 className="text-2xl font-bold text-black">{title}</h1>
        <p className="text-gray-600 mt-1">{description}</p>
      </div>
      <div className="flex space-x-2">
        <Button
          variant="ghost"
          size="sm"
          className="p-2 text-gray-600 hover:bg-gray-100"
          onClick={onDownload}
        >
          <Icon name="arrow-right" size="sm" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="p-2 text-gray-600 hover:bg-gray-100"
          onClick={onFilter}
        >
          <Icon name="star" size="sm" />
        </Button>
      </div>
    </div>
  );
} 