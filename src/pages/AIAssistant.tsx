
import React from "react";
import Sidebar from "@/components/Sidebar";
import ChatInterface from "@/components/ChatInterface";

const AIAssistantPage = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 md:ml-64">
        <div className="flex flex-col h-screen py-6 px-4 md:px-6 pt-20 md:pt-6">
          <header className="mb-6">
            <h1 className="text-3xl font-bold">AI Automation Assistant</h1>
            <p className="text-muted-foreground">
              Explore, create, and optimize your automation workflows
            </p>
          </header>
          <div className="flex-1 h-[calc(100vh-11rem)] md:h-[calc(100vh-11rem)] overflow-hidden">
            <ChatInterface />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistantPage;
