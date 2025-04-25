
import React, { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { cn } from "@/lib/utils";

interface MessageInputProps {
  onSendMessage: (content: string) => void;
  isLoading: boolean;
  placeholder?: string;
}

const MessageInput = ({ onSendMessage, isLoading, placeholder = "Type your message..." }: MessageInputProps) => {
  const [input, setInput] = useState("");
  
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    onSendMessage(input);
    setInput("");
  };
  
  return (
    <form 
      onSubmit={handleSubmit}
      className="flex gap-2 items-center max-w-5xl mx-auto w-full"
    >
      <Input
        placeholder={placeholder}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="flex-1"
      />
      <Button 
        type="submit" 
        disabled={isLoading || !input.trim()}
        size="icon"
        className="shrink-0"
      >
        <Send size={18} className={cn(
          "text-white transition-colors",
          !input.trim() && "text-gray-400"
        )} />
      </Button>
    </form>
  );
};

export default MessageInput;
