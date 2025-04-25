
import React from "react";
import { Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface AIMessageProps {
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const AIMessage = ({ content, isUser, timestamp }: AIMessageProps) => {
  return (
    <div className={cn(
      "flex w-full py-4",
      isUser ? "bg-white" : "bg-gray-50"
    )}>
      <div className="flex-1 px-4 md:px-8 max-w-4xl mx-auto w-full">
        <div className="flex gap-3 items-start">
          <div className={cn(
            "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0",
            isUser ? "bg-primary" : "bg-primary/10"
          )}>
            {isUser ? <User size={16} className="text-white" /> : <Bot size={16} className="text-primary" />}
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-900 leading-relaxed whitespace-pre-wrap">{content}</p>
            <p className="text-xs text-gray-500 mt-1">{timestamp.toLocaleTimeString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIMessage;
