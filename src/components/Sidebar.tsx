
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { MessageCircle, BarChart, Settings, FileText, Gauge, Users, LifeBuoy, History, Wand, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";

const NavItem = ({ 
  icon: Icon, 
  title, 
  to, 
  isActive = false,
  onClick = () => {},
}: { 
  icon: React.ElementType; 
  title: string; 
  to: string;
  isActive?: boolean;
  onClick?: () => void;
}) => (
  <Link to={to} onClick={onClick}>
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
  const location = useLocation();
  const currentPath = location.pathname;
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
  const closeDrawer = () => setIsDrawerOpen(false);

  const renderNavItems = (onClick = () => {}) => (
    <>
      <NavItem icon={Wand} title="AI Automation Assistant" to="/ai-assistant" isActive={currentPath.startsWith('/ai-assistant')} onClick={onClick} />
      <NavItem icon={BarChart} title="Dashboards" to="/dashboards" isActive={currentPath.startsWith('/dashboards')} onClick={onClick} />
      <NavItem icon={Gauge} title="Workflows" to="/workflows" isActive={currentPath.startsWith('/workflows')} onClick={onClick} />
      <NavItem icon={FileText} title="My Artifacts" to="/artifacts" isActive={currentPath.startsWith('/artifacts')} onClick={onClick} />
      <NavItem icon={History} title="History" to="/history" isActive={currentPath.startsWith('/history')} onClick={onClick} />
      <NavItem icon={Settings} title="Settings" to="/settings" isActive={currentPath.startsWith('/settings')} onClick={onClick} />
    </>
  );

  const renderCommunityItems = (onClick = () => {}) => (
    <>
      <NavItem icon={Users} title="Community Forum" to="/community" isActive={currentPath.startsWith('/community')} onClick={onClick} />
      <NavItem icon={LifeBuoy} title="Help & Support" to="/support" isActive={currentPath.startsWith('/support')} onClick={onClick} />
    </>
  );

  return (
    <>
      {/* Mobile Hamburger Menu */}
      <div className="md:hidden fixed top-0 left-0 right-0 p-4 bg-sidebar border-b border-sidebar-border z-10 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-md bg-gradient-to-br from-automation-primary to-automation-secondary flex items-center justify-center">
            <MessageCircle size={20} className="text-white" />
          </div>
          <h1 className="font-bold text-xl text-sidebar-foreground">VegamAI</h1>
        </div>
        
        <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
          <DrawerTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu size={24} />
              <span className="sr-only">Menu</span>
            </Button>
          </DrawerTrigger>
          <DrawerContent className="h-[80vh]">
            <div className="p-4 flex flex-col">
              <p className="text-xs font-medium text-sidebar-foreground/70 mb-2">MAIN MENU</p>
              {renderNavItems(closeDrawer)}
              
              <p className="text-xs font-medium text-sidebar-foreground/70 my-2">COMMUNITY</p>
              {renderCommunityItems(closeDrawer)}
              
              <div className="mt-6 flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-sidebar-accent flex items-center justify-center text-sidebar-foreground">
                  U
                </div>
                <div>
                  <p className="font-medium text-sm text-sidebar-foreground">User</p>
                  <p className="text-xs text-sidebar-foreground/70">Free Plan</p>
                </div>
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
      
      {/* Desktop Sidebar */}
      <div className="hidden md:flex h-screen w-64 flex-col bg-sidebar fixed left-0 top-0 border-r border-sidebar-border">
        <div className="p-4 border-b border-sidebar-border flex items-center gap-2">
          <div className="h-8 w-8 rounded-md bg-gradient-to-br from-automation-primary to-automation-secondary flex items-center justify-center">
            <MessageCircle size={20} className="text-white" />
          </div>
          <h1 className="font-bold text-xl text-sidebar-foreground">VegamAI</h1>
        </div>
        
        <div className="flex flex-col p-4 flex-1">
          <p className="text-xs font-medium text-sidebar-foreground/70 mb-2">MAIN MENU</p>
          {renderNavItems()}
        </div>
        
        <div className="p-4 border-t border-sidebar-border">
          <p className="text-xs font-medium text-sidebar-foreground/70 mb-2">COMMUNITY</p>
          {renderCommunityItems()}
          
          <div className="mt-6 flex items-center gap-3">
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
    </>
  );
};

export default Sidebar;
