import { useState } from "react";
import {
  Activity,
  Heart,
  Video,
  FileText,
  Pill,
  Calendar,
  TrendingUp,
  Shield,
  Users,
  User,
  ChevronLeft,
  ChevronRight,
  Mic,
  LogOut,
  LayoutDashboard,
  Siren,
  MessageSquare,
} from "lucide-react";

type NavItem = { icon: React.ElementType; label: string; id: string };

const navItems: NavItem[] = [
  { icon: LayoutDashboard, label: "My Dashboard", id: "overview" },
  { icon: FileText, label: "Medical Reports", id: "reports" },
  { icon: Pill, label: "Prescriptions", id: "prescriptions" },
  { icon: Calendar, label: "Appointments", id: "appointments" },
  { icon: TrendingUp, label: "Health Monitor", id: "health" },
  { icon: Shield, label: "Health Records", id: "records" },
  { icon: Users, label: "Family", id: "family" },
  { icon: MessageSquare, label: "Messages", id: "chat" },
  { icon: Video, label: "Video Consult", id: "video" },
  { icon: Mic, label: "Voice Assistant", id: "voice" },
  { icon: Siren, label: "Emergency", id: "emergency" },
];

interface PatientSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onSwitchPortal: () => void;
}

const PatientSidebar = ({ activeTab, onTabChange, onSwitchPortal }: PatientSidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className={`gradient-hero flex flex-col transition-all duration-300 ${collapsed ? "w-16" : "w-60"}`}>
      <div className="flex items-center gap-2 px-4 py-5 border-b border-sidebar-border">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg gradient-primary shadow-glow shrink-0">
          <Heart className="w-4 h-4 text-primary-foreground" />
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <h1 className="text-sm font-semibold text-sidebar-primary">Patient Portal</h1>
            <p className="text-[10px] text-sidebar-foreground opacity-60">MedAI Health</p>
          </div>
        )}
      </div>

      {/* Patient Info */}
      {!collapsed && (
        <div className="px-4 py-3 border-b border-sidebar-border">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center shrink-0">
              <User className="w-4 h-4 text-primary-foreground" />
            </div>
            <div>
              <p className="text-xs font-medium text-sidebar-foreground">Ravi Kumar</p>
              <p className="text-[9px] text-sidebar-foreground opacity-50">ABHA-1234-5678</p>
            </div>
          </div>
        </div>
      )}

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

export default PatientSidebar;
