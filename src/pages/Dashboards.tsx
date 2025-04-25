
import React from "react";
import Sidebar from "@/components/Sidebar";
import DashboardWidget from "@/components/DashboardWidget";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const automationData = [
  { name: "Jan", value: 12 },
  { name: "Feb", value: 19 },
  { name: "Mar", value: 24 },
  { name: "Apr", value: 35 },
  { name: "May", value: 42 },
  { name: "Jun", value: 45 },
  { name: "Jul", value: 50 },
];

const efficiencyData = [
  { name: "Mon", value: 65 },
  { name: "Tue", value: 72 },
  { name: "Wed", value: 68 },
  { name: "Thu", value: 78 },
  { name: "Fri", value: 82 },
  { name: "Sat", value: 40 },
  { name: "Sun", value: 30 },
];

const statusData = [
  { name: "Completed", value: 45 },
  { name: "In Progress", value: 23 },
  { name: "Pending", value: 17 },
  { name: "Failed", value: 5 },
];

const processData = [
  { name: "Onboarding", value: 32 },
  { name: "Support", value: 25 },
  { name: "Approvals", value: 18 },
  { name: "Reporting", value: 14 },
  { name: "Invoicing", value: 11 },
];

const DashboardsPage = () => {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      
      <div className="flex-1 md:ml-64">
        <div className="container mx-auto py-6 px-4 md:px-6">
          <header className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold">Dashboards</h1>
              <p className="text-muted-foreground">
                Monitor your automation performance and efficiency metrics.
              </p>
            </div>
            
            <Button className="bg-automation-primary hover:bg-automation-primary/90 flex items-center gap-1">
              <Plus size={16} /> New Dashboard
            </Button>
          </header>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <DashboardWidget 
              title="Automations Created Over Time" 
              type="line" 
              data={automationData} 
            />
            
            <DashboardWidget 
              title="Daily Efficiency Score (%)" 
              type="line" 
              data={efficiencyData}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <DashboardWidget 
              title="Automation Status" 
              type="bar" 
              data={statusData} 
            />
            
            <DashboardWidget 
              title="Automated Processes" 
              type="bar" 
              data={processData} 
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center">
                  <div className="text-5xl font-bold text-automation-primary">85%</div>
                  <p className="text-muted-foreground mt-2">Time Saved</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center">
                  <div className="text-5xl font-bold text-automation-secondary">90+</div>
                  <p className="text-muted-foreground mt-2">Active Automations</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center">
                  <div className="text-5xl font-bold text-automation-accent">$10k</div>
                  <p className="text-muted-foreground mt-2">Monthly Savings</p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-10 bg-white dark:bg-gray-800 rounded-lg border p-6">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-2">Need a Custom Dashboard?</h3>
                <p className="text-muted-foreground mb-4 md:mb-0">
                  Let our AI create a customized dashboard tailored to your specific needs.
                </p>
              </div>
              <Button>Create Custom Dashboard</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardsPage;
