
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, ArrowRight } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

type FieldType = "text" | "textarea" | "number" | "toggle";

interface FormField {
  id: string;
  name: string;
  type: FieldType;
  required: boolean;
  placeholder?: string;
}

const FormGenerator = () => {
  const [formName, setFormName] = useState("New Customer Onboarding");
  const [fields, setFields] = useState<FormField[]>([
    {
      id: "1",
      name: "Customer Name",
      type: "text",
      required: true,
      placeholder: "Enter customer name",
    },
    {
      id: "2",
      name: "Email Address",
      type: "text",
      required: true,
      placeholder: "Enter email address",
    },
    {
      id: "3",
      name: "Notes",
      type: "textarea",
      required: false,
      placeholder: "Additional information",
    },
    {
      id: "4",
      name: "Newsletter Subscription",
      type: "toggle",
      required: false,
    },
  ]);

  const { toast } = useToast();
  
  const handleAddField = () => {
    const newField: FormField = {
      id: Date.now().toString(),
      name: "New Field",
      type: "text",
      required: false,
      placeholder: "Enter value",
    };
    
    setFields([...fields, newField]);
  };
  
  const handleDeleteField = (id: string) => {
    setFields(fields.filter(field => field.id !== id));
  };
  
  const handleSave = () => {
    toast({
      title: "Form Saved",
      description: "Your form has been saved successfully.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Form Generator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="formName">Form Name</Label>
          <Input
            id="formName"
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
            className="mt-1"
          />
        </div>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-medium">Form Fields</h3>
            <Button 
              onClick={handleAddField} 
              variant="outline" 
              size="sm"
              className="flex items-center gap-1"
            >
              <Plus size={14} /> Add Field
            </Button>
          </div>
          
          <div className="space-y-4">
            {fields.map((field) => (
              <Card key={field.id} className="p-4">
                <div className="flex justify-between items-start gap-2">
                  <div className="flex-1 space-y-2">
                    <div className="grid gap-1.5">
                      <Label htmlFor={`field-name-${field.id}`}>Field Name</Label>
                      <Input
                        id={`field-name-${field.id}`}
                        value={field.name}
                        onChange={(e) => {
                          const updatedFields = fields.map(f =>
                            f.id === field.id ? { ...f, name: e.target.value } : f
                          );
                          setFields(updatedFields);
                        }}
                      />
                    </div>
                    
                    <div className="flex flex-wrap gap-4">
                      <div className="space-y-1.5 min-w-[120px]">
                        <Label htmlFor={`field-type-${field.id}`}>Field Type</Label>
                        <select
                          id={`field-type-${field.id}`}
                          value={field.type}
                          onChange={(e) => {
                            const updatedFields = fields.map(f =>
                              f.id === field.id ? { ...f, type: e.target.value as FieldType } : f
                            );
                            setFields(updatedFields);
                          }}
                          className="w-full px-3 py-2 border rounded-md"
                        >
                          <option value="text">Text</option>
                          <option value="textarea">Textarea</option>
                          <option value="number">Number</option>
                          <option value="toggle">Toggle</option>
                        </select>
                      </div>
                      
                      <div className="flex items-center space-x-2 pt-6">
                        <Switch
                          id={`required-${field.id}`}
                          checked={field.required}
                          onCheckedChange={(checked) => {
                            const updatedFields = fields.map(f =>
                              f.id === field.id ? { ...f, required: checked } : f
                            );
                            setFields(updatedFields);
                          }}
                        />
                        <Label htmlFor={`required-${field.id}`}>Required</Label>
                      </div>
                    </div>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteField(field.id)}
                  >
                    <Trash2 size={16} className="text-red-500" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Preview Form</Button>
        <Button onClick={handleSave} className="flex items-center gap-1">
          Save Form <ArrowRight size={16} />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FormGenerator;
