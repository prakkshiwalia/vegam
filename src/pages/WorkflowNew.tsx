
import React from "react";
import Sidebar from "@/components/Sidebar";
import WorkflowBuilder from "@/components/WorkflowBuilder";

const WorkflowNew = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 md:ml-64">
        <div className="h-screen p-6">
          <header className="mb-6">
            <h1 className="text-3xl font-bold">Create New Workflow</h1>
            <p className="text-muted-foreground">
              Design your workflow using drag and drop
            </p>
          </header>
          <div className="h-[calc(100vh-10rem)] border rounded-lg overflow-hidden">
            <WorkflowBuilder />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkflowNew;
