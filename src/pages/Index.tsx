
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import ChatInterface from "@/components/ChatInterface";
import ArtifactCard from "@/components/ArtifactCard";
import WorkflowDiagram from "@/components/WorkflowDiagram";
import FormGenerator from "@/components/FormGenerator";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { X, Plus, PlusCircle, Pause, Play } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const sampleWorkflowSteps = [
  {
    id: "step1",
    title: "Customer Request Submission",
    description: "Customer fills out the online form with their request details."
  },
  {
    id: "step2",
    title: "Initial Review",
    description: "Support team reviews the request and categorizes it by priority and type."
  },
  {
    id: "step3",
    title: "Department Assignment",
    description: "Request is automatically assigned to the appropriate department based on type."
  },
  {
    id: "step4",
    title: "Resolution",
    description: "Department resolves the request and provides feedback."
  },
  {
    id: "step5",
    title: "Customer Notification",
    description: "Customer is automatically notified of the resolution."
  }
];

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedArtifact, setSelectedArtifact] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [artifactsGenerated] = useState([
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
    }
  ]);

  const handleNewWorkflow = () => {
    navigate("/workflows/new");
  };

  const handleNewArtifact = () => {
    navigate("/artifacts/new");
  };
  
  const toggleGeneration = () => {
    setIsGenerating(!isGenerating);
    toast({
      title: isGenerating ? "Generation Paused" : "Generation Activated",
      description: isGenerating 
        ? "AI workflow generation has been paused." 
        : "AI will now automatically generate workflows based on your conversations.",
    });
  };
  
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      
      <div className="flex-1 md:ml-64">
        <div className="container mx-auto py-6 px-4 md:px-6 max-w-7xl">
          <header className="mb-6">
            <h1 className="text-3xl font-bold">
              <span className="gradient-text">VegamAI</span> Business Automation
            </h1>
            <p className="text-muted-foreground">
              Describe what you need and let AI build forms, workflows, and dashboards for you.
            </p>
          </header>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className={`lg:col-span-${selectedArtifact ? '7' : '12'} bg-white dark:bg-gray-800 rounded-lg shadow-sm border w-full`}>
              <ChatInterface />
            </div>
            
            {selectedArtifact && (
              <div className="lg:col-span-5 bg-white dark:bg-gray-800 rounded-lg shadow-sm border overflow-y-auto">
                <div className="p-4 border-b flex justify-between items-center">
                  <h2 className="font-medium">Artifact Preview</h2>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => setSelectedArtifact(null)}
                  >
                    <X size={18} />
                  </Button>
                </div>
                
                <div className="p-4">
                  {selectedArtifact === "1" && <FormGenerator />}
                  {selectedArtifact === "2" && (
                    <WorkflowDiagram 
                      title="Support Request Workflow" 
                      steps={sampleWorkflowSteps} 
                    />
                  )}
                </div>
              </div>
            )}
          </div>
          
          <div className="mt-6">
            <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
              <h2 className="text-xl font-semibold">Recently Generated Artifacts</h2>
              <div className="flex flex-wrap gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="gap-1"
                  onClick={handleNewWorkflow}
                >
                  <Plus size={16} />
                  <span className="hidden sm:inline">New Workflow</span>
                  <span className="inline sm:hidden">Workflow</span>
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="gap-1"
                  onClick={handleNewArtifact}
                >
                  <Plus size={16} />
                  <span className="hidden sm:inline">New Artifact</span>
                  <span className="inline sm:hidden">Artifact</span>
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="gap-1"
                  onClick={toggleGeneration}
                >
                  {isGenerating ? (
                    <>
                      <Pause size={16} />
                      <span className="hidden sm:inline">Pause</span>
                    </>
                  ) : (
                    <>
                      <Play size={16} />
                      <span className="hidden sm:inline">Activate</span>
                    </>
                  )}
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {artifactsGenerated.map((artifact) => (
                <ArtifactCard
                  key={artifact.id}
                  title={artifact.title}
                  description={artifact.description}
                  type={artifact.type}
                  date={artifact.date}
                  onClick={() => setSelectedArtifact(artifact.id)}
                />
              ))}
            </div>
          </div>
          
          <div className="mt-10 bg-white dark:bg-gray-800 rounded-lg border p-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Need Help?</h3>
                <p className="text-muted-foreground">
                  Our 24/7 support team is ready to assist you with any questions.
                </p>
              </div>
              <Button>Contact Support</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
