
import React, { useRef, useEffect } from "react";
import { Bot } from "lucide-react";
import ChatMessage, { Message } from "./ChatMessage";
import SuggestedPrompts, { PromptSuggestion } from "./SuggestedPrompts";

interface ChatMessagesProps {
  messages: Message[];
  suggestedPrompts: PromptSuggestion[];
  onPromptClick: (prompt: string) => void;
  isLoading: boolean;
}

const ChatMessages = ({ messages, suggestedPrompts, onPromptClick, isLoading }: ChatMessagesProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
  return (
    <div className="flex-1 overflow-y-auto">
      {messages.length === 1 && (
        <SuggestedPrompts 
          prompts={suggestedPrompts} 
          onPromptClick={onPromptClick} 
        />
      )}
      
      {messages.map((message) => (
        <ChatMessage key={message.id} message={message} />
      ))}
      
      {isLoading && (
        <div className="flex items-center gap-2 text-sm text-gray-500 p-4">
          <Bot size={16} className="animate-pulse" />
          <span>Thinking...</span>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessages;
