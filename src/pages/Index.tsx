
import React from "react";
import Sidebar from "@/components/Sidebar";
import ChatInterface from "@/components/ChatInterface";

const Index = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 md:ml-64">
        <div className="container mx-auto flex flex-col h-[calc(100vh-2rem)] py-6 px-4 md:px-6">
          <header className="mb-6">
            <h1 className="text-3xl font-bold">AI Automation Assistant</h1>
            <p className="text-muted-foreground">
              Get help with creating and optimizing your automation workflows
            </p>
          </header>
          <div className="flex-1">
            <ChatInterface />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
