
import React, { useState, useRef, useEffect } from "react";
import { Bot } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ChatMessage, { Message } from "./chat/ChatMessage";
import SuggestedPrompts, { PromptSuggestion } from "./chat/SuggestedPrompts";
import MessageInput from "./chat/MessageInput";
import { PlusCircle, Settings, MessageSquare } from "lucide-react";

const suggestedPrompts: PromptSuggestion[] = [
  {
    title: "Create a new workflow from scratch",
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
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
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
      <div className="flex-1 overflow-y-auto chat-container">
        {messages.length === 1 && (
          <SuggestedPrompts 
            prompts={suggestedPrompts} 
            onPromptClick={handlePromptClick} 
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
