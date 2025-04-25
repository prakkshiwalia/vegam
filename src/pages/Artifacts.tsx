
import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";
import ArtifactCard from "@/components/ArtifactCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Plus } from "lucide-react";

const mockArtifacts = [
  {
    id: "1",
    title: "Customer Onboarding Form",
    description: "A form for collecting new customer information for the onboarding process.",
    type: "form" as const,
    date: new Date(2025, 3, 20)
  },
  {
    id: "2",
    title: "Support Request Workflow",
    description: "An automated workflow for handling customer support requests from submission to resolution.",
    type: "workflow" as const,
    date: new Date(2025, 3, 22)
  },
  {
    id: "3",
    title: "Sales Performance Dashboard",
    description: "A real-time dashboard showing sales performance metrics and trends.",
    type: "dashboard" as const,
    date: new Date(2025, 3, 23)
  },
  {
    id: "4",
    title: "Expense Approval Form",
    description: "A form for submitting and approving employee expenses.",
    type: "form" as const,
    date: new Date(2025, 3, 24)
  },
  {
    id: "5",
    title: "Monthly KPI Report",
    description: "An automated report showing key performance indicators for the month.",
    type: "report" as const,
    date: new Date(2025, 3, 25)
  },
  {
    id: "6",
    title: "Employee Onboarding Workflow",
    description: "A workflow for onboarding new employees, including documentation and training steps.",
    type: "workflow" as const,
    date: new Date(2025, 3, 26)
  }
];

const ArtifactsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  
  const filteredArtifacts = mockArtifacts.filter(artifact => {
    const matchesSearch = 
      artifact.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      artifact.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTab = 
      activeTab === "all" || artifact.type === activeTab;
    
    return matchesSearch && matchesTab;
  });
  
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      
      <div className="flex-1 md:ml-64">
        <div className="container mx-auto py-6 px-4 md:px-6">
          <header className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold">My Artifacts</h1>
              <p className="text-muted-foreground">
                Access and manage your AI-generated forms, workflows, and dashboards.
              </p>
            </div>
            
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search artifacts..."
                  className="pl-8 w-[200px]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <Button className="bg-automation-primary hover:bg-automation-primary/90 flex items-center gap-1">
                <Plus size={16} /> New Artifact
              </Button>
            </div>
          </header>
          
          <Tabs defaultValue="all" className="mb-6" value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="form">Forms</TabsTrigger>
              <TabsTrigger value="workflow">Workflows</TabsTrigger>
              <TabsTrigger value="dashboard">Dashboards</TabsTrigger>
              <TabsTrigger value="report">Reports</TabsTrigger>
            </TabsList>
          </Tabs>
          
          {filteredArtifacts.length === 0 ? (
            <div className="flex flex-col items-center justify-center bg-white dark:bg-gray-800 rounded-lg border p-10">
              <p className="text-lg text-muted-foreground mb-4">No artifacts found matching your criteria.</p>
              <Button onClick={() => {
                setSearchTerm("");
                setActiveTab("all");
              }}>
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArtifacts.map((artifact) => (
                <ArtifactCard
                  key={artifact.id}
                  title={artifact.title}
                  description={artifact.description}
                  type={artifact.type}
                  date={artifact.date}
                />
              ))}
            </div>
          )}
          
          <div className="mt-10 bg-white dark:bg-gray-800 rounded-lg border p-6">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-2">Need to Create Something New?</h3>
                <p className="text-muted-foreground mb-4 md:mb-0">
                  Return to the AI assistant to quickly generate new forms, workflows, or dashboards.
                </p>
              </div>
              <Button>Go to AI Assistant</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtifactsPage;
