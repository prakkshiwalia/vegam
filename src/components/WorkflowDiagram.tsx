
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface WorkflowStep {
  id: string;
  title: string;
  description: string;
}

interface WorkflowDiagramProps {
  title: string;
  steps: WorkflowStep[];
}

const WorkflowDiagram: React.FC<WorkflowDiagramProps> = ({ title, steps }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-start mb-8 relative">
              <div className="flex flex-col items-center mr-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-automation-primary text-white font-bold">
                  {index + 1}
                </div>
                {index < steps.length - 1 && (
                  <div className="h-full border-l-2 border-dashed border-gray-300 absolute top-10 left-5" />
                )}
              </div>
              <div className="flex-1 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                <h3 className="font-medium mb-1">{step.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkflowDiagram;
