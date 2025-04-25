
import React from "react";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

const WorkflowNew = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 md:ml-64">
        <div className="container mx-auto py-6 px-4 md:px-6">
          <header className="mb-6">
            <h1 className="text-3xl font-bold">Create New Workflow</h1>
            <p className="text-muted-foreground">
              Start with a template or create a custom workflow
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow h-full">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Support Request</CardTitle>
                <CardDescription>
                  Streamline customer support ticket handling and resolution process
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                  <li>Ticket creation and assignment</li>
                  <li>Priority-based routing</li>
                  <li>SLA tracking</li>
                  <li>Resolution workflow</li>
                  <li>Customer feedback collection</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-secondary hover:bg-secondary/90">
                  Use Template <ArrowRight size={16} className="ml-2" />
                </Button>
              </CardFooter>
            </Card>

            <Card className="hover:shadow-lg transition-shadow h-full">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Employee Onboarding</CardTitle>
                <CardDescription>
                  Automate the new employee onboarding process end-to-end
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                  <li>Documentation collection</li>
                  <li>System access setup</li>
                  <li>Training assignments</li>
                  <li>Equipment requests</li>
                  <li>Orientation scheduling</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-secondary hover:bg-secondary/90">
                  Use Template <ArrowRight size={16} className="ml-2" />
                </Button>
              </CardFooter>
            </Card>

            <Card className="hover:shadow-lg transition-shadow h-full">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Custom Workflow</CardTitle>
                <CardDescription>
                  Create a custom workflow tailored to your specific needs
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                  <li>Start from scratch</li>
                  <li>Full customization</li>
                  <li>AI-assisted design</li>
                  <li>Integration options</li>
                  <li>Advanced automation</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-secondary hover:bg-secondary/90">
                  Start Building <ArrowRight size={16} className="ml-2" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkflowNew;
