
import React from "react";
import { Link } from "react-router-dom";
import { MessageCircle, BarChart, Settings, FileText, Gauge, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NavItem = ({ 
  icon: Icon, 
  title, 
  to, 
  isActive = false 
}: { 
  icon: React.ElementType; 
  title: string; 
  to: string;
  isActive?: boolean;
}) => (
  <Link to={to}>
    <Button
      variant="ghost"
      className={cn(
        "w-full justify-start gap-2 mb-1 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground",
        isActive && "bg-sidebar-accent"
      )}
    >
      <Icon size={18} />
      <span>{title}</span>
    </Button>
  </Link>
);

const Sidebar = () => {
  return (
    <div className="hidden md:flex h-screen w-64 flex-col bg-sidebar fixed left-0 top-0 border-r border-sidebar-border">
      <div className="p-4 border-b border-sidebar-border flex items-center gap-2">
        <div className="h-8 w-8 rounded-md bg-gradient-to-br from-automation-primary to-automation-secondary flex items-center justify-center">
          <MessageSquare size={20} className="text-white" />
        </div>
        <h1 className="font-bold text-xl text-sidebar-foreground">AutomateNow</h1>
      </div>
      
      <div className="flex flex-col p-4 flex-1">
        <p className="text-xs font-medium text-sidebar-foreground/70 mb-2">MAIN MENU</p>
        <NavItem icon={MessageCircle} title="AI Assistant" to="/" isActive={true} />
        <NavItem icon={BarChart} title="Dashboards" to="/dashboards" />
        <NavItem icon={FileText} title="My Artifacts" to="/artifacts" />
        <NavItem icon={Gauge} title="Workflows" to="/workflows" />
        <NavItem icon={Settings} title="Settings" to="/settings" />
      </div>
      
      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-sidebar-accent flex items-center justify-center text-sidebar-foreground">
            U
          </div>
          <div>
            <p className="font-medium text-sm text-sidebar-foreground">User</p>
            <p className="text-xs text-sidebar-foreground/70">Free Plan</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
