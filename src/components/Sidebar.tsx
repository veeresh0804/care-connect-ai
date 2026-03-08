import { useState } from "react";
import {
  Activity,
  Clipboard,
  Brain,
  LayoutDashboard,
  Monitor,
  Settings,
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
} from "lucide-react";

type NavItem = {
  icon: React.ElementType;
  label: string;
  id: string;
};

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
  { icon: Clipboard, label: "Patient Portal", id: "portal" },
  { icon: Shield, label: "Privacy & Security", id: "privacy" },
];

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Sidebar = ({ activeTab, onTabChange }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`gradient-hero flex flex-col transition-all duration-300 ${
        collapsed ? "w-16" : "w-60"
      }`}
    >
      <div className="flex items-center gap-2 px-4 py-5 border-b border-sidebar-border">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg gradient-primary shadow-glow shrink-0">
          <Heart className="w-4 h-4 text-primary-foreground" />
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <h1 className="text-sm font-semibold text-sidebar-primary">MedAI</h1>
            <p className="text-[10px] text-sidebar-foreground opacity-60">Rural HealthTech</p>
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

      <button
        onClick={() => setCollapsed(!collapsed)}
        className="flex items-center justify-center py-3 border-t border-sidebar-border text-sidebar-foreground hover:text-sidebar-primary transition-colors"
      >
        {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
      </button>
    </aside>
  );
};

export default Sidebar;
