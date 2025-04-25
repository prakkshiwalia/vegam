
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Bot, User, PlusCircle, Settings, MessageSquare, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";

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
      "flex w-full py-6 first:pt-0 border-b border-gray-100 dark:border-gray-800",
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

const suggestedPrompts = [
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
  const [input, setInput] = useState("");
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
    setInput("");
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
    setInput(prompt);
    handleSendMessage(prompt);
  };
  
  return (
    <div className="flex flex-col h-[calc(100vh-10rem)] md:h-[calc(100vh-8rem)] bg-white dark:bg-gray-900 rounded-lg border shadow-sm">
      <div className="flex-1 overflow-y-auto chat-container">
        {messages.length === 1 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {suggestedPrompts.map((prompt, index) => (
              <Card 
                key={index} 
                className="cursor-pointer hover:border-primary/40 transition-all"
                onClick={() => handlePromptClick(prompt.prompt)}
              >
                <CardContent className="pt-6">
                  <div className="flex flex-col items-start gap-2">
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
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage(input);
          }}
          className="flex gap-2 items-center max-w-5xl mx-auto w-full"
        >
          <Input
            placeholder="Describe your business process or automation needs..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1"
          />
          <Button 
            type="submit" 
            disabled={isLoading || !input.trim()}
            size="icon"
            className="shrink-0"
          >
            <Send size={18} className={cn(
              "text-white transition-colors",
              !input.trim() && "text-gray-400"
            )} />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;
