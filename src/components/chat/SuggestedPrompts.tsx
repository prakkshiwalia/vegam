
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { PlusCircle, Settings, MessageSquare } from "lucide-react";

export interface PromptSuggestion {
  title: string;
  description: string;
  icon: React.ElementType;
  prompt: string;
}

interface SuggestedPromptsProps {
  prompts: PromptSuggestion[];
  onPromptClick: (prompt: string) => void;
}

const SuggestedPrompts = ({ prompts, onPromptClick }: SuggestedPromptsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
      {prompts.map((prompt, index) => (
        <Card 
          key={index} 
          className="cursor-pointer hover:border-primary/40 transition-all hover:shadow-md"
          onClick={() => onPromptClick(prompt.prompt)}
        >
          <CardContent className="pt-6">
            <div className="flex flex-col items-start gap-3">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <prompt.icon size={20} />
              </div>
              <h3 className="font-semibold text-lg">{prompt.title}</h3>
              <p className="text-sm text-muted-foreground">{prompt.description}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default SuggestedPrompts;
