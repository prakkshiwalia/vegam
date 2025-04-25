
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Loader, Bot } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

const ChatMessage = ({ message }: { message: Message }) => {
  const isUser = message.role === "user";
  
  return (
    <div className={cn(
      "flex w-full mb-4",
      isUser ? "justify-end" : "justify-start"
    )}>
      <div className={cn(
        "max-w-[80%] rounded-2xl p-4",
        isUser ? "bg-automation-primary text-white rounded-tr-none" : "bg-gray-100 dark:bg-gray-800 rounded-tl-none"
      )}>
        <p className="text-sm">{message.content}</p>
        <p className="text-xs mt-1 opacity-70">
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute:'2-digit' })}
        </p>
      </div>
    </div>
  );
};

// Mock AI responses for the demo
const mockResponses = [
  "I've analyzed your business process. Let me generate a customized workflow for you.",
  "Based on your description, I recommend automating your approval process with the following steps...",
  "I can help you create a form for collecting this information. Would you like to see a preview?",
  "I've created a dashboard that monitors these KPIs. You can customize it further if needed.",
  "Your automation workflow has been set up. Would you like me to walk you through how it works?"
];

const getMockResponse = () => {
  return mockResponses[Math.floor(Math.random() * mockResponses.length)];
};

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Hi there! I'm your AI automation assistant. Describe a business process you'd like to automate, and I'll help you create the necessary workflows, forms, and dashboards.",
      role: "assistant",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      role: "user",
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    
    // Simulate AI thinking time
    setTimeout(() => {
      // Add AI response
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: getMockResponse(),
        role: "assistant",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);

      // Randomly show the artifact generated toast
      if (Math.random() > 0.5) {
        toast({
          title: "Artifact Generated",
          description: "A new workflow diagram has been created based on your request.",
        });
      }
    }, 1500);
  };
  
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 chat-container">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        {isLoading && (
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Bot size={16} className="animate-pulse" />
            <span>AI is thinking...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-4 border-t">
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex gap-2"
        >
          <Input
            placeholder="Describe a process to automate..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1"
          />
          <Button 
            type="submit" 
            disabled={isLoading || !input.trim()}
            className="bg-automation-primary hover:bg-automation-primary/90"
          >
            {isLoading ? <Loader size={18} className="animate-spin" /> : <Send size={18} />}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;
