
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ArrowLeft, FileText, Database, List, Save, Form as FormIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const artifactTypes = [
  {
    id: "form",
    name: "Form",
    icon: FormIcon,
    description: "Create an interactive form for data collection"
  },
  {
    id: "report",
    name: "Report",
    icon: FileText,
    description: "Generate structured reports from your data"
  },
  {
    id: "dashboard",
    name: "Dashboard",
    icon: Database,
    description: "Build a visual dashboard with key metrics"
  },
  {
    id: "checklist",
    name: "Checklist",
    icon: List,
    description: "Create a structured checklist for processes"
  }
];

const ArtifactNew = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [artifactType, setArtifactType] = useState<string>("");
  const [artifactName, setArtifactName] = useState("");
  const [artifactDescription, setArtifactDescription] = useState("");
  const [artifactCategory, setArtifactCategory] = useState("");
  
  const handleSaveArtifact = () => {
    if (!artifactName) {
      toast({
        title: "Artifact name required",
        description: "Please provide a name for your artifact.",
        variant: "destructive"
      });
      return;
    }
    
    if (!artifactType) {
      toast({
        title: "Artifact type required",
        description: "Please select a type for your artifact.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Artifact created successfully",
      description: "Your new artifact has been created and is now available."
    });
    
    navigate("/artifacts");
  };

  const ArtifactTypeIcon = ({ type }: { type: typeof artifactTypes[0] }) => {
    const Icon = type.icon;
    return <Icon size={24} />;
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      
      <div className="flex-1 md:ml-64">
        <div className="container mx-auto py-6 px-4 md:px-6">
          <div className="flex items-center gap-2 mb-6">
            <Button variant="ghost" size="icon" onClick={() => navigate("/artifacts")}>
              <ArrowLeft size={18} />
            </Button>
            <h1 className="text-2xl font-bold">Create New Artifact</h1>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Artifact Type</CardTitle>
                <CardDescription>Choose the type of artifact you want to create</CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup value={artifactType} onValueChange={setArtifactType} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {artifactTypes.map((type) => (
                    <div key={type.id} className="relative">
                      <RadioGroupItem 
                        value={type.id} 
                        id={type.id} 
                        className="sr-only peer"
                      />
                      <label
                        htmlFor={type.id}
                        className="flex flex-col items-center justify-center h-full p-4 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 peer-checked:border-primary peer-checked:bg-primary/5"
                      >
                        <div className="mb-2">
                          <ArtifactTypeIcon type={type} />
                        </div>
                        <p className="font-medium mb-1">{type.name}</p>
                        <p className="text-xs text-center text-muted-foreground">{type.description}</p>
                      </label>
                    </div>
                  ))}
                </RadioGroup>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Artifact Details</CardTitle>
                <CardDescription>Provide the basic information for your artifact</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">Name</label>
                  <Input
                    id="name"
                    value={artifactName}
                    onChange={(e) => setArtifactName(e.target.value)}
                    placeholder="Enter artifact name"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="description" className="text-sm font-medium">Description</label>
                  <Textarea
                    id="description"
                    value={artifactDescription}
                    onChange={(e) => setArtifactDescription(e.target.value)}
                    placeholder="Describe what this artifact is for"
                    rows={4}
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="category" className="text-sm font-medium">Category</label>
                  <Select value={artifactCategory} onValueChange={setArtifactCategory}>
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
              <CardFooter>
                <div className="flex justify-end w-full">
                  <Button variant="outline" className="mr-2" onClick={() => navigate("/artifacts")}>
                    Cancel
                  </Button>
                  <Button onClick={handleSaveArtifact} className="gap-1">
                    <Save size={16} />
                    <span>Create Artifact</span>
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtifactNew;
