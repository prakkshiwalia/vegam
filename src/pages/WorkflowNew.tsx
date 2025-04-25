
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, ChevronRight, Plus, Save, Trash } from "lucide-react";
import { WorkflowDiagram } from "@/components/WorkflowDiagram";
import { useToast } from "@/hooks/use-toast";

interface WorkflowStep {
  id: string;
  title: string;
  description: string;
}

const WorkflowNew = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [workflowTitle, setWorkflowTitle] = useState("");
  const [workflowDescription, setWorkflowDescription] = useState("");
  const [workflowCategory, setWorkflowCategory] = useState("");
  const [activeTab, setActiveTab] = useState("details");
  const [steps, setSteps] = useState<WorkflowStep[]>([
    { id: "step1", title: "Start", description: "Initial step of the workflow" }
  ]);
  
  const handleAddStep = () => {
    const newId = `step${steps.length + 1}`;
    setSteps([...steps, { id: newId, title: "New Step", description: "Description for this step" }]);
  };
  
  const handleStepTitleChange = (id: string, title: string) => {
    setSteps(steps.map(step => step.id === id ? { ...step, title } : step));
  };
  
  const handleStepDescriptionChange = (id: string, description: string) => {
    setSteps(steps.map(step => step.id === id ? { ...step, description } : step));
  };
  
  const handleDeleteStep = (id: string) => {
    if (steps.length <= 1) {
      toast({
        title: "Cannot delete step",
        description: "A workflow must have at least one step.",
        variant: "destructive"
      });
      return;
    }
    setSteps(steps.filter(step => step.id !== id));
  };
  
  const handleSaveWorkflow = () => {
    if (!workflowTitle) {
      toast({
        title: "Workflow title required",
        description: "Please provide a title for your workflow.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Workflow saved successfully",
      description: "Your workflow has been created and is now available."
    });
    
    navigate("/workflows");
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      
      <div className="flex-1 md:ml-64">
        <div className="container mx-auto py-6 px-4 md:px-6">
          <div className="flex items-center gap-2 mb-6">
            <Button variant="ghost" size="icon" onClick={() => navigate("/workflows")}>
              <ArrowLeft size={18} />
            </Button>
            <h1 className="text-2xl font-bold">Create New Workflow</h1>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="details">Workflow Details</TabsTrigger>
              <TabsTrigger value="steps">Workflow Steps</TabsTrigger>
            </TabsList>
            
            <TabsContent value="details" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                  <CardDescription>Provide the essential details for your workflow</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="title" className="text-sm font-medium">Workflow Title</label>
                    <Input
                      id="title"
                      value={workflowTitle}
                      onChange={(e) => setWorkflowTitle(e.target.value)}
                      placeholder="Enter workflow title"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="description" className="text-sm font-medium">Description</label>
                    <Textarea
                      id="description"
                      value={workflowDescription}
                      onChange={(e) => setWorkflowDescription(e.target.value)}
                      placeholder="Describe what this workflow does"
                      rows={4}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="category" className="text-sm font-medium">Category</label>
                    <Select value={workflowCategory} onValueChange={setWorkflowCategory}>
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hr">Human Resources</SelectItem>
                        <SelectItem value="finance">Finance</SelectItem>
                        <SelectItem value="sales">Sales</SelectItem>
                        <SelectItem value="operations">Operations</SelectItem>
                        <SelectItem value="customer_service">Customer Service</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={() => navigate("/workflows")}>Cancel</Button>
                  <Button onClick={() => setActiveTab("steps")}>
                    Next <ChevronRight size={16} className="ml-1" />
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="steps">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="lg:order-2">
                  <CardHeader>
                    <CardTitle>Workflow Preview</CardTitle>
                    <CardDescription>Visual representation of your workflow</CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="p-4">
                      <WorkflowDiagram title={workflowTitle || "New Workflow"} steps={steps} />
                    </div>
                  </CardContent>
                </Card>
                
                <div className="space-y-4 lg:order-1">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle>Workflow Steps</CardTitle>
                        <CardDescription>Configure each step of your workflow</CardDescription>
                      </div>
                      <Button variant="outline" size="sm" onClick={handleAddStep} className="gap-1">
                        <Plus size={14} />
                        <span>Add Step</span>
                      </Button>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {steps.map((step, index) => (
                        <div key={step.id} className="border rounded-lg p-4">
                          <div className="flex justify-between items-center mb-3">
                            <h3 className="font-medium">Step {index + 1}</h3>
                            <Button variant="ghost" size="sm" onClick={() => handleDeleteStep(step.id)}>
                              <Trash size={14} />
                            </Button>
                          </div>
                          
                          <div className="space-y-3">
                            <div className="space-y-2">
                              <label htmlFor={`step-title-${step.id}`} className="text-sm font-medium">Title</label>
                              <Input
                                id={`step-title-${step.id}`}
                                value={step.title}
                                onChange={(e) => handleStepTitleChange(step.id, e.target.value)}
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <label htmlFor={`step-desc-${step.id}`} className="text-sm font-medium">Description</label>
                              <Textarea
                                id={`step-desc-${step.id}`}
                                value={step.description}
                                onChange={(e) => handleStepDescriptionChange(step.id, e.target.value)}
                                rows={2}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                  
                  <div className="flex justify-between">
                    <Button variant="outline" onClick={() => setActiveTab("details")}>
                      <ArrowLeft size={16} className="mr-1" /> Back
                    </Button>
                    <Button onClick={handleSaveWorkflow} className="gap-1">
                      <Save size={16} />
                      <span>Save Workflow</span>
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default WorkflowNew;
