import { useState } from "react";
import {
  Activity,
  Brain,
  LayoutDashboard,
  Monitor,
  Shield,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Heart,
  Mic,
  TrendingUp,
  Siren,
  FileText,
  Users,
  Building2,
  LogOut,
} from "lucide-react";

type NavItem = { icon: React.ElementType; label: string; id: string };

const navItems: NavItem[] = [
  { icon: LayoutDashboard, label: "Dashboard", id: "dashboard" },
  { icon: Brain, label: "AI Diagnostics", id: "diagnostics" },
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

  return (
    <aside className={`gradient-hero flex flex-col transition-all duration-300 ${collapsed ? "w-16" : "w-60"}`}>
      <div className="flex items-center gap-2 px-4 py-5 border-b border-sidebar-border">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg gradient-hero border border-sidebar-border shrink-0">
          <Building2 className="w-4 h-4 text-sidebar-primary" />
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <h1 className="text-sm font-semibold text-sidebar-primary">Hospital Portal</h1>
            <p className="text-[10px] text-sidebar-foreground opacity-60">MedAI Admin</p>
          </div>
        )}
      </div>

      <nav className="flex-1 py-3 space-y-0.5 px-2 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs transition-all ${
                isActive
                  ? "bg-sidebar-accent text-sidebar-primary font-medium"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-primary"
              }`}
            >
              <item.icon className="w-4 h-4 shrink-0" />
              {!collapsed && <span>{item.label}</span>}
              {isActive && !collapsed && (
                <Activity className="w-3 h-3 ml-auto animate-pulse-glow text-sidebar-primary" />
              )}
            </button>
          );
        })}
      </nav>

      <div className="px-2 pb-2">
        <button
          onClick={onSwitchPortal}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-primary transition-all"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          {!collapsed && <span>Switch Portal</span>}
        </button>
      </div>

      <button
        onClick={() => setCollapsed(!collapsed)}
        className="flex items-center justify-center py-3 border-t border-sidebar-border text-sidebar-foreground hover:text-sidebar-primary transition-colors"
      >
        {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
      </button>
    </aside>
  );
};

export default HospitalSidebar;
