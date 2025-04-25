
import React, { useState } from "react";
import { PlusCircle, Settings, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Message } from "./chat/ChatMessage";
import { PromptSuggestion } from "./chat/SuggestedPrompts";
import MessageInput from "./chat/MessageInput";
import ChatHeader from "./chat/ChatHeader";
import ChatMessages from "./chat/ChatMessages";

const suggestedPrompts: PromptSuggestion[] = [
  {
    title: "Create a new workflow",
    description: "Let me help you design and implement a new business process workflow",
    icon: PlusCircle,
    prompt: "I want to create a new workflow for..."
  },
  {
    title: "Optimize existing workflow",
    description: "I'll analyze your current workflow and suggest improvements",
    icon: Settings,
    prompt: "Help me optimize this workflow:"
  },
  {
    title: "Explore automation ideas",
    description: "Let's discuss potential automation opportunities for your business",
    icon: MessageSquare,
    prompt: "I'd like to explore automation possibilities for..."
  }
];

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Hi! I'm your AI automation assistant. I can help you create new workflows, optimize existing processes, or explore automation ideas. What would you like to do?",
      role: "assistant",
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      content: content.trim(),
      role: "user",
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    
    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I understand you want to " + content.toLowerCase() + ". Let's break this down step by step. First, could you tell me more about the specific business process you're working with?",
        role: "assistant",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const handlePromptClick = (prompt: string) => {
    handleSendMessage(prompt);
  };
  
  return (
    <div className="flex flex-col h-[calc(100vh-10rem)] md:h-[calc(100vh-8rem)] bg-white dark:bg-gray-900 rounded-lg border shadow-sm">
      <ChatHeader />
      
      <ChatMessages 
        messages={messages}
        suggestedPrompts={suggestedPrompts}
        onPromptClick={handlePromptClick}
        isLoading={isLoading}
      />
      
      <div className="border-t p-4">
        <MessageInput 
          onSendMessage={handleSendMessage} 
          isLoading={isLoading}
          placeholder="Describe your business process or automation needs..."
        />
      </div>
    </div>
  );
};

export default ChatInterface;
