import { Users, Brain, Activity, Shield, AlertTriangle, TrendingUp } from "lucide-react";
import StatsCard from "./StatsCard";
import TriageChart from "./TriageChart";
import { AreaChart, Area, ResponsiveContainer, Tooltip, XAxis } from "recharts";

const riskTrend = [
  { day: "Mon", avg: 42 },
  { day: "Tue", avg: 45 },
  { day: "Wed", avg: 38 },
  { day: "Thu", avg: 52 },
  { day: "Fri", avg: 48 },
  { day: "Sat", avg: 35 },
  { day: "Sun", avg: 40 },
];

const recentAlerts = [
  { message: "Patient P-2847 risk score elevated to 82", level: "critical", time: "2 min ago" },
  { message: "ICU bed occupancy above 90%", level: "warning", time: "15 min ago" },
  { message: "AI model retrained on 1,240 new records", level: "info", time: "1 hr ago" },
  { message: "Dr. Rivera load at 100% — redistribution recommended", level: "warning", time: "2 hr ago" },
];

const alertStyles = {
  critical: "border-l-destructive bg-destructive/5",
  warning: "border-l-warning bg-warning/5",
  info: "border-l-info bg-info/5",
};

const DashboardOverview = () => {
  return (
    <div className="space-y-6 animate-slide-up">
      <div>
        <h2 className="text-lg font-semibold text-foreground">Platform Overview</h2>
        <p className="text-xs text-muted-foreground">Real-time healthcare intelligence for underserved communities</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Active Patients" value="124" change="+12 this week" changeType="positive" icon={Users} />
        <StatsCard title="AI Diagnoses Today" value="47" change="+23% accuracy" changeType="positive" icon={Brain} />
        <StatsCard title="Critical Alerts" value="3" change="2 resolved" changeType="negative" icon={AlertTriangle} iconColor="bg-destructive/10" />
        <StatsCard title="Data Encrypted" value="100%" change="HIPAA compliant" changeType="neutral" icon={Shield} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <TriageChart />

        {/* Risk Trend */}
        <div className="bg-card rounded-xl p-5 shadow-card border border-border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-card-foreground">Avg Risk Score Trend</h3>
            <TrendingUp className="w-4 h-4 text-muted-foreground" />
          </div>
          <div className="h-32">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={riskTrend}>
                <defs>
                  <linearGradient id="riskGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(174, 62%, 38%)" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="hsl(174, 62%, 38%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" tick={{ fontSize: 10, fill: "hsl(210, 15%, 50%)" }} />
                <Tooltip
                  contentStyle={{
                    background: "hsl(0, 0%, 100%)",
                    border: "1px solid hsl(210, 20%, 90%)",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />
                <Area type="monotone" dataKey="avg" stroke="hsl(174, 62%, 38%)" fill="url(#riskGrad)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Alerts */}
        <div className="bg-card rounded-xl p-5 shadow-card border border-border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-card-foreground">Recent Alerts</h3>
            <Activity className="w-4 h-4 text-muted-foreground" />
          </div>
          <div className="space-y-2">
            {recentAlerts.map((alert, i) => (
              <div key={i} className={`border-l-2 rounded-r-lg p-2.5 ${alertStyles[alert.level as keyof typeof alertStyles]}`}>
                <p className="text-xs text-card-foreground">{alert.message}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">{alert.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
