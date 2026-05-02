import { useState } from "react";
import {
  Activity, Brain, LayoutDashboard, Monitor, Shield, Calendar,
  ChevronLeft, ChevronRight, Mic, TrendingUp, Siren, FileText,
  Users, Building2, LogOut, Landmark, Menu, X, Stethoscope,
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

type NavItem = { icon: React.ElementType; label: string; id: string };

const navItems: NavItem[] = [
  { icon: LayoutDashboard, label: "Dashboard", id: "dashboard" },
  { icon: Brain, label: "AI Diagnostics", id: "diagnostics" },
  { icon: Stethoscope, label: "AI Triage", id: "triage" },
  { icon: Mic, label: "Voice Assistant", id: "voice" },
  { icon: TrendingUp, label: "Predictive Risk", id: "predictive" },
  { icon: Monitor, label: "Patient Monitoring", id: "monitoring" },
  { icon: Siren, label: "Emergency Alerts", id: "emergency" },
  { icon: FileText, label: "Report Generator", id: "reports" },
  { icon: Calendar, label: "Workflow", id: "workflow" },
  { icon: Users, label: "Community Health", id: "community" },
  { icon: Shield, label: "Privacy & Security", id: "privacy" },
];

interface HospitalSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onSwitchPortal: () => void;
}

const HospitalSidebar = ({ activeTab, onTabChange, onSwitchPortal }: HospitalSidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useIsMobile();

  const handleTabChange = (id: string) => {
    onTabChange(id);
    if (isMobile) setMobileOpen(false);
  };

  const sidebarContent = (
    <>
      {/* Tricolor strip */}
      <div className="h-0.5 w-full flex shrink-0">
        <div className="flex-1 bg-govt-saffron" />
        <div className="flex-1 bg-card" />
        <div className="flex-1 bg-govt-green" />
      </div>

      <div className="flex items-center gap-2 px-4 py-4 border-b border-sidebar-border">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg gradient-primary shrink-0">
          <Landmark className="w-4 h-4 text-primary-foreground" />
        </div>
        {(!collapsed || isMobile) && (
          <div className="overflow-hidden">
            <h1 className="text-sm font-semibold text-sidebar-primary">Hospital Portal</h1>
            <p className="text-[9px] text-sidebar-foreground opacity-60">Digital Health Mission</p>
          </div>
        )}
        {isMobile && (
          <button onClick={() => setMobileOpen(false)} className="ml-auto text-sidebar-foreground hover:text-sidebar-primary p-1">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <nav className="flex-1 py-3 space-y-0.5 px-2 overflow-y-auto" role="navigation" aria-label="Hospital portal navigation">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleTabChange(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-xs transition-all ${
                isActive
                  ? "bg-sidebar-accent text-sidebar-primary font-medium"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-primary"
              }`}
            >
              <item.icon className="w-4 h-4 shrink-0" />
              {(!collapsed || isMobile) && <span>{item.label}</span>}
              {isActive && (!collapsed || isMobile) && (
                <Activity className="w-3 h-3 ml-auto animate-pulse-glow text-sidebar-primary" />
              )}
            </button>
          );
        })}
      </nav>

      <div className="px-2 pb-2">
        <button
          onClick={onSwitchPortal}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-xs text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-primary transition-all"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          {(!collapsed || isMobile) && <span>Switch Portal</span>}
        </button>
      </div>

      {!isMobile && (
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center justify-center py-3 border-t border-sidebar-border text-sidebar-foreground hover:text-sidebar-primary transition-colors"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      )}
    </>
  );

  // Mobile: overlay drawer
  if (isMobile) {
    return (
      <>
        {/* Mobile trigger in header area */}
        <button
          onClick={() => setMobileOpen(true)}
          className="fixed top-[calc(2rem+4px)] left-2 z-50 p-2 rounded-md bg-card border border-border shadow-card text-muted-foreground hover:text-primary"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Overlay */}
        {mobileOpen && (
          <>
            <div className="fixed inset-0 bg-black/50 z-50" onClick={() => setMobileOpen(false)} />
            <aside className="fixed left-0 top-0 bottom-0 w-64 z-50 gradient-hero flex flex-col shadow-xl" role="navigation" aria-label="Hospital portal sidebar">
              {sidebarContent}
            </aside>
          </>
        )}
      </>
    );
  }

  // Desktop: standard sidebar
  return (
    <aside className={`gradient-hero flex flex-col transition-all duration-300 ${collapsed ? "w-16" : "w-60"}`} role="navigation" aria-label="Hospital portal sidebar">
      {sidebarContent}
    </aside>
  );
};

export default HospitalSidebar;
