
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus, Search, MessageSquare } from "lucide-react";

interface ActionItem {
  icon: React.ElementType;
  title: string;
  description: string;
  onClick: () => void;
}

const SuggestedActions = () => {
  const actions: ActionItem[] = [
    {
      icon: Plus,
      title: "Create a new workflow",
      description: "Start building a new automation process",
      onClick: () => console.log("Create workflow clicked"),
    },
    {
      icon: Search,
      title: "Optimize an existing workflow",
      description: "Improve an existing process step-by-step",
      onClick: () => console.log("Optimize workflow clicked"),
    },
    {
      icon: MessageSquare,
      title: "Chat freely",
      description: "Explore automation ideas and get recommendations",
      onClick: () => console.log("Chat freely clicked"),
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
      {actions.map((action, index) => (
        <Button
          key={index}
          variant="outline"
          className="h-auto p-4 flex flex-col items-start gap-2 hover:bg-primary/5 transition-colors text-left"
          onClick={action.onClick}
        >
          <div className="flex items-center gap-2 text-primary">
            <action.icon size={20} />
            <span className="font-medium truncate w-full">{action.title}</span>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2 w-full">
            {action.description}
          </p>
        </Button>
      ))}
    </div>
  );
};

export default SuggestedActions;
