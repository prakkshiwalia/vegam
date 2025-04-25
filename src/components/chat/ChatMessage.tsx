
import React from "react";
import { Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  const isUser = message.role === "user";
  
  return (
    <div className={cn(
      "flex w-full py-6 border-b border-gray-100 dark:border-gray-800",
      isUser ? "bg-white dark:bg-gray-900" : "bg-gray-50/50 dark:bg-gray-900/50"
    )}>
      <div className="flex-1 px-4 md:px-8 max-w-5xl mx-auto w-full">
        <div className="flex gap-3 items-start">
          <div className={cn(
            "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0",
            isUser ? "bg-blue-600 text-white" : "bg-primary text-white"
          )}>
            {isUser ? <User size={16} /> : <Bot size={16} />}
          </div>
          <div className="flex-1">
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-base leading-7 m-0">{message.content}</p>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
