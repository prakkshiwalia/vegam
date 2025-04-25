import React from "react";
import Sidebar from "@/components/Sidebar";
import WorkflowDiagram from "@/components/WorkflowDiagram";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Plus, Play, Pause, Import } from "lucide-react";

const supportWorkflowSteps = [
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

const onboardingWorkflowSteps = [
  {
    id: "step1",
    title: "Employee Information Collection",
    description: "HR collects new employee information via an automated form."
  },
  {
    id: "step2",
    title: "Account Creation",
    description: "IT automatically creates necessary accounts and access permissions."
  },
  {
    id: "step3",
    title: "Training Assignment",
    description: "Required training courses are automatically assigned based on role."
  },
  {
    id: "step4",
    title: "Equipment Setup",
    description: "IT prepares and assigns equipment based on role requirements."
  },
  {
    id: "step5",
    title: "Onboarding Check-in",
    description: "Automated check-in with manager and HR after first week."
  }
];

const approvalWorkflowSteps = [
  {
    id: "step1",
    title: "Request Submission",
    description: "Employee submits expense report through digital form."
  },
  {
    id: "step2",
    title: "Manager Review",
    description: "Direct manager receives notification and reviews the submission."
  },
  {
    id: "step3",
    title: "Finance Verification",
    description: "Finance department verifies expenses and documentation."
  },
  {
    id: "step4",
    title: "Payment Processing",
    description: "Approved expenses are automatically processed for payment."
  },
  {
    id: "step5",
    title: "Employee Notification",
    description: "Employee is notified of approval and payment status."
  }
];

const WorkflowCard = ({ 
  title, 
  description, 
  status, 
  runs 
}: { 
  title: string; 
  description: string; 
  status: "active" | "paused" | "draft"; 
  runs: number;
}) => (
  <Card>
    <CardHeader className="pb-3">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <CardTitle className="text-lg">{title}</CardTitle>
          <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
        </div>
        <Badge 
          variant={status === "active" ? "default" : status === "paused" ? "outline" : "secondary"}
          className={`${status === "active" ? "bg-green-500" : ""} ml-2`}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      </div>
    </CardHeader>
    <CardContent>
      <div className="flex flex-col space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Total runs:</span>
            <span className="text-sm font-medium">{runs}</span>
          </div>
          <div className="flex items-center gap-2">
            {status === "active" ? (
              <Button size="sm" variant="outline" className="w-24">
                <Pause size={14} className="mr-1" /> Pause
              </Button>
            ) : (
              <Button size="sm" variant="outline" className="w-24">
                <Play size={14} className="mr-1" /> Activate
              </Button>
            )}
          </div>
        </div>
        <Button size="sm" className="w-full">View Details</Button>
      </div>
    </CardContent>
  </Card>
);

const WorkflowsPage = () => {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      
      <div className="flex-1 md:ml-64">
        <div className="container mx-auto py-6 px-4 md:px-6">
          <header className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold">Workflows</h1>
              <p className="text-muted-foreground">
                Create and manage your automated business processes.
              </p>
            </div>
            
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                className="bg-automation-primary/10 hover:bg-automation-primary/20 flex items-center gap-1"
              >
                <Import size={16} /> Import Workflow
              </Button>
              <Button className="bg-automation-primary hover:bg-automation-primary/90 flex items-center gap-1">
                <Plus size={16} /> New Workflow
              </Button>
            </div>
          </header>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <WorkflowCard 
              title="Support Request Process" 
              description="Handle customer support requests from submission to resolution."
              status="active"
              runs={278}
            />
            <WorkflowCard 
              title="Employee Onboarding" 
              description="Streamline the process of bringing new employees into the organization."
              status="active"
              runs={42}
            />
            <WorkflowCard 
              title="Expense Approval" 
              description="Manage the approval process for employee expenses."
              status="paused"
              runs={156}
            />
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg border p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Workflow Details</h2>
            
            <Tabs defaultValue="support">
              <TabsList className="mb-4">
                <TabsTrigger value="support">Support Request</TabsTrigger>
                <TabsTrigger value="onboarding">Employee Onboarding</TabsTrigger>
                <TabsTrigger value="approval">Expense Approval</TabsTrigger>
              </TabsList>
              
              <TabsContent value="support" className="pt-2">
                <WorkflowDiagram 
                  title="Support Request Workflow" 
                  steps={supportWorkflowSteps} 
                />
              </TabsContent>
              
              <TabsContent value="onboarding" className="pt-2">
                <WorkflowDiagram 
                  title="Employee Onboarding Workflow" 
                  steps={onboardingWorkflowSteps} 
                />
              </TabsContent>
              
              <TabsContent value="approval" className="pt-2">
                <WorkflowDiagram 
                  title="Expense Approval Workflow" 
                  steps={approvalWorkflowSteps} 
                />
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg border p-6">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-2">Need a Custom Workflow?</h3>
                <p className="text-muted-foreground mb-4 md:mb-0">
                  Let our AI build a tailored workflow for your specific business process.
                </p>
              </div>
              <Button>Create with AI</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkflowsPage;
