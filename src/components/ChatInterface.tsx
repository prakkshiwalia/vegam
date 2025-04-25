
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Bot, User, PlusCircle, Image, Paperclip, Smile } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

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
            {isUser ? (
              <User size={16} />
            ) : (
              <Bot size={16} />
            )}
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

const mockResponses = [
  "Based on your description, I've created a customer onboarding workflow with 5 steps. You can view and customize it in the artifacts section.",
  "I've designed a support ticket handling system with automatic categorization and priority assignment. Would you like me to explain the workflow in detail?",
  "I've generated a customizable invoice processing workflow. This includes validation, approval, and payment tracking stages.",
  "I've created an employee leave request workflow that incorporates manager approvals and HR notifications. You can view the full diagram in the artifacts section.",
  "Based on your needs, I've developed a procurement workflow with budget checks, multi-level approvals, and vendor management integration.",
  "I've designed a content approval workflow with draft, review, and publish stages. Would you like to see more details about each stage?",
];

const getMockResponse = () => {
  return mockResponses[Math.floor(Math.random() * mockResponses.length)];
};

const ChatInterface = () => {
  const [activeTab, setActiveTab] = useState("chat");
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
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      role: "user",
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: getMockResponse(),
        role: "assistant",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);

      if (Math.random() > 0.5) {
        toast({
          title: "Artifact Generated",
          description: "A new workflow diagram has been created based on your request.",
        });
      }
    }, 1500);
  };
  
  return (
    <div className="flex flex-col h-[calc(100vh-10rem)] md:h-[calc(100vh-8rem)] bg-white dark:bg-gray-900 w-full rounded-lg border shadow-sm">
      <div className="border-b p-3 flex justify-between items-center">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full justify-start h-9 bg-transparent p-0">
            <TabsTrigger value="chat" className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-md h-8">
              <Bot size={16} className="mr-2" /> Chat
            </TabsTrigger>
            <TabsTrigger value="templates" className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-md h-8">
              <PlusCircle size={16} className="mr-2" /> Templates
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <Tabs value={activeTab} className="flex-1 flex flex-col">
        <TabsContent value="chat" className="flex-1 flex flex-col m-0 p-0 data-[state=active]:flex-1">
          <div className="flex-1 overflow-y-auto chat-container">
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
          
          <div className="border-t border-gray-200 dark:border-gray-800 p-4 bg-white dark:bg-gray-900 sticky bottom-0 w-full">
            <div className="max-w-5xl mx-auto w-full">
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex gap-2 items-center"
              >
                <Input
                  placeholder="Ask about automating your business process..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                />
                <div className="flex gap-1">
                  <Button 
                    type="button" 
                    variant="ghost"
                    size="icon"
                    className="hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <Paperclip size={18} className="text-gray-500" />
                  </Button>
                  <Button 
                    type="button" 
                    variant="ghost"
                    size="icon"
                    className="hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <Image size={18} className="text-gray-500" />
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={isLoading || !input.trim()}
                    variant="ghost"
                    size="icon"
                    className="hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <Send size={18} className={cn(
                      "text-gray-500 transition-colors",
                      input.trim() && "text-primary"
                    )} />
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="templates" className="flex-1 overflow-y-auto m-0 p-4 data-[state=active]:flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { title: "Customer Onboarding", desc: "Create a workflow for new customer registration and setup" },
              { title: "Invoice Processing", desc: "Automate invoice receipt, validation, and payment" },
              { title: "Leave Request", desc: "Streamline employee time-off requests and approvals" },
              { title: "Support Ticket", desc: "Build a ticket handling system with auto-routing" },
              { title: "Content Approval", desc: "Create a review process for marketing content" },
              { title: "Procurement", desc: "Manage purchase requests, approvals, and vendor orders" }
            ].map((template, i) => (
              <div key={i} className="border rounded-lg p-4 hover:border-primary cursor-pointer transition-all hover:shadow-sm">
                <h3 className="font-medium mb-1">{template.title}</h3>
                <p className="text-sm text-gray-500">{template.desc}</p>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ChatInterface;
