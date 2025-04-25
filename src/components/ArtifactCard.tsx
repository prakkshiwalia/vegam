
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, BarChart3, Check } from "lucide-react";

type ArtifactType = "form" | "workflow" | "dashboard" | "report";

interface ArtifactCardProps {
  title: string;
  description: string;
  type: ArtifactType;
  date: Date;
  onClick?: () => void;
}

const getIconForType = (type: ArtifactType) => {
  switch (type) {
    case "form":
      return <FileText size={18} />;
    case "workflow":
      return <Check size={18} />;
    case "dashboard":
      return <BarChart3 size={18} />;
    case "report":
      return <FileText size={18} />;
    default:
      return <FileText size={18} />;
  }
};

const getColorForType = (type: ArtifactType) => {
  switch (type) {
    case "form":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
    case "workflow":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
    case "dashboard":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
    case "report":
      return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
  }
};

const ArtifactCard: React.FC<ArtifactCardProps> = ({
  title,
  description,
  type,
  date,
  onClick,
}) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <div className={`p-1.5 rounded-md ${getColorForType(type)}`}>
              {getIconForType(type)}
            </div>
            <CardTitle className="text-lg">{title}</CardTitle>
          </div>
          <div className="text-xs text-muted-foreground">
            {date.toLocaleDateString()}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {description}
        </p>
      </CardContent>
      <CardFooter>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onClick}
          className="w-full"
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ArtifactCard;
