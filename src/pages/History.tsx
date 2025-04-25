
import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { History as HistoryIcon, Clock, Calendar, Bot, FileText, Gauge, Filter } from "lucide-react";

// Fake history data for demonstration
const generateMockHistory = (days: number) => {
  const history = [];
  const now = new Date();
  
  for (let i = 0; i < 20; i++) {
    const hoursAgo = Math.floor(Math.random() * (days * 24));
    const timestamp = new Date(now.getTime() - hoursAgo * 60 * 60 * 1000);
    
    const types = ["conversation", "workflow", "artifact", "dashboard"];
    const type = types[Math.floor(Math.random() * types.length)];
    
    const titles = {
      conversation: [
        "Asked about workflow optimization",
        "Discussed automation strategy",
        "Requested help with form creation",
        "Asked about integration options",
      ],
      workflow: [
        "Created customer onboarding workflow",
        "Modified approval process workflow",
        "Optimized data processing workflow",
        "Shared workflow with team",
      ],
      artifact: [
        "Created feedback form",
        "Generated monthly report",
        "Updated customer survey",
        "Created invoice template",
      ],
      dashboard: [
        "Created sales dashboard",
        "Updated KPI metrics",
        "Customized analytics view",
        "Shared dashboard with team",
      ],
    };
    
    const title = titles[type][Math.floor(Math.random() * titles[type].length)];
    
    history.push({
      id: `hist-${i}`,
      type,
      title,
      timestamp,
    });
  }
  
  return history.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
};

const HistoryPage = () => {
  const [activeFilter, setActiveFilter] = useState<"24h" | "7d">("24h");
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  
  const historyData = activeFilter === "24h" 
    ? generateMockHistory(1) 
    : generateMockHistory(7);
  
  const filteredHistory = typeFilter 
    ? historyData.filter(item => item.type === typeFilter) 
    : historyData;

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "conversation":
        return <Bot size={16} className="text-blue-500" />;
      case "workflow":
        return <Gauge size={16} className="text-green-500" />;
      case "artifact":
        return <FileText size={16} className="text-amber-500" />;
      case "dashboard":
        return <HistoryIcon size={16} className="text-purple-500" />;
      default:
        return <HistoryIcon size={16} />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "conversation":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "workflow":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "artifact":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300";
      case "dashboard":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = diffMs / (1000 * 60 * 60);
    
    if (diffHours < 24) {
      return `${Math.floor(diffHours)} hours ago`;
    } else {
      return `${Math.floor(diffHours / 24)} days ago`;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      
      <div className="flex-1 md:ml-64">
        <div className="container mx-auto py-6 px-4 md:px-6">
          <header className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-2">
                <HistoryIcon size={28} /> Activity History
              </h1>
              <p className="text-muted-foreground">
                Review your recent activities and interactions
              </p>
            </div>
            
            <div className="flex gap-2">
              <Tabs value={activeFilter} onValueChange={(value) => setActiveFilter(value as "24h" | "7d")}>
                <TabsList>
                  <TabsTrigger value="24h" className="flex items-center gap-1">
                    <Clock size={14} />
                    <span>Last 24 Hours</span>
                  </TabsTrigger>
                  <TabsTrigger value="7d" className="flex items-center gap-1">
                    <Calendar size={14} />
                    <span>Last 7 Days</span>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
              
              <div className="relative">
                <Button variant="outline" className="flex items-center gap-1">
                  <Filter size={14} />
                  <span>{typeFilter || "All Types"}</span>
                </Button>
                <div className="absolute z-10 right-0 mt-1 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-md border overflow-hidden hidden group-hover:block">
                  <div className="p-2">
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start" 
                      onClick={() => setTypeFilter(null)}
                    >
                      All Types
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start" 
                      onClick={() => setTypeFilter("conversation")}
                    >
                      Conversations
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start" 
                      onClick={() => setTypeFilter("workflow")}
                    >
                      Workflows
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start" 
                      onClick={() => setTypeFilter("artifact")}
                    >
                      Artifacts
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start" 
                      onClick={() => setTypeFilter("dashboard")}
                    >
                      Dashboards
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </header>
          
          <div className="space-y-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg border shadow-sm overflow-hidden">
              {filteredHistory.length > 0 ? (
                filteredHistory.map((item, index) => (
                  <div 
                    key={item.id}
                    className={`p-4 flex items-center justify-between ${index !== filteredHistory.length - 1 ? 'border-b' : ''}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-md ${getTypeColor(item.type)}`}>
                        {getTypeIcon(item.type)}
                      </div>
                      <div>
                        <h3 className="font-medium">{item.title}</h3>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {formatTime(item.timestamp)}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {item.timestamp.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <HistoryIcon size={16} />
                    </Button>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center">
                  <HistoryIcon size={48} className="mx-auto mb-4 text-muted-foreground/50" />
                  <h3 className="text-lg font-medium mb-1">No activity found</h3>
                  <p className="text-muted-foreground">
                    There's no activity matching your current filters.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;
