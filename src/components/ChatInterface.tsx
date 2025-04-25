
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bot, Search, FileSearch, Send } from "lucide-react";
import AIMessage from "./chat/AIMessage";
import SuggestedActions from "./chat/SuggestedActions";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Hi! I'm your AI automation assistant. How can I help you today?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      isUser: true,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsThinking(true);
    
    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I understand you want to explore automation options. Let me help you with that. Could you tell me more about your specific needs?",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsThinking(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg border shadow-sm">
      <div className="border-b p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Bot size={18} className="text-primary" />
          </div>
          <div>
            <h2 className="font-semibold">AI Assistant</h2>
            <p className="text-xs text-muted-foreground">Powered by GPT</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-1">
            <Search size={14} />
            <span>Search</span>
          </Button>
          <Button variant="outline" size="sm" className="gap-1">
            <FileSearch size={14} />
            <span>Deep Research</span>
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {messages.length === 1 && <SuggestedActions />}
        
        {messages.map((message) => (
          <AIMessage
            key={message.id}
            content={message.content}
            isUser={message.isUser}
            timestamp={message.timestamp}
          />
        ))}
        
        {isThinking && (
          <div className="flex items-center gap-2 p-4 text-sm text-muted-foreground">
            <Bot size={16} className="animate-pulse" />
            <span>Thinking...</span>
          </div>
        )}
      </div>

      <div className="border-t p-4">
        <div className="flex gap-2">
          <Input
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            className="flex-1"
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim() || isThinking}
            size="icon"
            className={cn(
              "shrink-0",
              input.trim() ? "bg-primary" : "bg-gray-100"
            )}
          >
            <Send size={18} className={input.trim() ? "text-white" : "text-gray-400"} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
