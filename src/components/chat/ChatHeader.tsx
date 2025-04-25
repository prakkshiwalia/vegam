
import React from "react";
import { Bot } from "lucide-react";

const ChatHeader = () => {
  return (
    <div className="border-b p-4">
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
          <Bot size={18} className="text-white" />
        </div>
        <div>
          <h2 className="font-semibold text-lg">AI Automation Assistant</h2>
          <p className="text-sm text-muted-foreground">Let's build workflows and automate processes</p>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
