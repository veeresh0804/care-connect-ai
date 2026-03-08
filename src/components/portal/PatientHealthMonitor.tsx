import { Heart, Droplets, Wind, Weight, Thermometer, TrendingUp, AlertTriangle } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid, Area, AreaChart } from "recharts";

const bpData = [
  { month: "Oct", systolic: 122, diastolic: 78 },
  { month: "Nov", systolic: 128, diastolic: 82 },
  { month: "Dec", systolic: 130, diastolic: 84 },
  { month: "Jan", systolic: 132, diastolic: 86 },
  { month: "Feb", systolic: 135, diastolic: 88 },
  { month: "Mar", systolic: 138, diastolic: 90 },
];

const glucoseData = [
  { month: "Oct", fasting: 92, pp: 128 },
  { month: "Nov", fasting: 96, pp: 135 },
  { month: "Dec", fasting: 100, pp: 140 },
  { month: "Jan", fasting: 104, pp: 148 },
  { month: "Feb", fasting: 108, pp: 152 },
  { month: "Mar", fasting: 105, pp: 145 },
];

const weightData = [
  { month: "Oct", weight: 78 },
  { month: "Nov", weight: 77.5 },
  { month: "Dec", weight: 79 },
  { month: "Jan", weight: 78.2 },
  { month: "Feb", weight: 77.8 },
  { month: "Mar", weight: 77 },
];

const currentVitals = [
  { label: "Blood Pressure", value: "138/90", unit: "mmHg", icon: Heart, status: "high", normal: "<130/85" },
  { label: "Fasting Glucose", value: "105", unit: "mg/dL", icon: Droplets, status: "borderline", normal: "<100" },
  { label: "SpO₂", value: "97", unit: "%", icon: Wind, status: "normal", normal: ">95" },
  { label: "Weight", value: "77", unit: "kg", icon: Weight, status: "normal", normal: "BMI 18.5-25" },
  { label: "Temperature", value: "36.8", unit: "°C", icon: Thermometer, status: "normal", normal: "36.1-37.2" },
  { label: "Heart Rate", value: "76", unit: "BPM", icon: Heart, status: "normal", normal: "60-100" },
];

const statusColor = (s: string) => s === "high" ? "text-destructive" : s === "borderline" ? "text-warning" : "text-success";
const statusBg = (s: string) => s === "high" ? "bg-destructive/10" : s === "borderline" ? "bg-warning/10" : "bg-muted/50";

const PatientHealthMonitor = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">Health Monitoring Dashboard</h2>
        <span className="text-[10px] text-muted-foreground">Last updated: Today, 9:15 AM</span>
      </div>

      {/* AI Insight */}
      <div className="bg-warning/10 border border-warning/20 rounded-xl p-4 flex items-start gap-3">
        <AlertTriangle className="w-4 h-4 text-warning shrink-0 mt-0.5" />
        <div>
          <p className="text-xs font-medium text-foreground">AI Health Insight</p>
          <p className="text-[11px] text-muted-foreground mt-0.5">Your blood pressure has increased by 13% over the past 3 months. Systolic readings are consistently above 130 mmHg. Consider reducing sodium intake and scheduling a cardiology review.</p>
        </div>
      </div>

      {/* Current Vitals */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {currentVitals.map((v) => (
          <div key={v.label} className={`rounded-xl p-3 text-center ${statusBg(v.status)}`}>
            <v.icon className={`w-4 h-4 mx-auto mb-1 ${statusColor(v.status)}`} />
            <p className={`text-lg font-bold ${statusColor(v.status)}`}>{v.value}</p>
            <p className="text-[9px] text-muted-foreground">{v.unit}</p>
            <p className="text-[9px] font-medium text-card-foreground mt-0.5">{v.label}</p>
            <p className="text-[8px] text-muted-foreground">Normal: {v.normal}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* BP Trend */}
        <div className="bg-card rounded-xl p-5 shadow-card border border-border">
          <div className="flex items-center gap-2 mb-4">
            <Heart className="w-4 h-4 text-destructive" />
            <h3 className="text-sm font-semibold text-card-foreground">Blood Pressure Trend</h3>
            <TrendingUp className="w-3 h-3 text-destructive ml-auto" />
          </div>
          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={bpData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 20%, 92%)" />
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: "hsl(210, 15%, 50%)" }} />
                <YAxis domain={[70, 150]} tick={{ fontSize: 10, fill: "hsl(210, 15%, 50%)" }} />
                <Tooltip contentStyle={{ background: "hsl(0,0%,100%)", border: "1px solid hsl(210,20%,90%)", borderRadius: "8px", fontSize: "11px" }} />
                <Line type="monotone" dataKey="systolic" stroke="hsl(0, 72%, 55%)" strokeWidth={2} dot={{ r: 3 }} name="Systolic" />
                <Line type="monotone" dataKey="diastolic" stroke="hsl(210, 70%, 55%)" strokeWidth={2} dot={{ r: 3 }} name="Diastolic" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Glucose Trend */}
        <div className="bg-card rounded-xl p-5 shadow-card border border-border">
          <div className="flex items-center gap-2 mb-4">
            <Droplets className="w-4 h-4 text-warning" />
            <h3 className="text-sm font-semibold text-card-foreground">Blood Glucose Trend</h3>
          </div>
          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={glucoseData}>
                <defs>
                  <linearGradient id="glucoseGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(38, 92%, 50%)" stopOpacity={0.2} />
                    <stop offset="100%" stopColor="hsl(38, 92%, 50%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 20%, 92%)" />
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: "hsl(210, 15%, 50%)" }} />
                <YAxis tick={{ fontSize: 10, fill: "hsl(210, 15%, 50%)" }} />
                <Tooltip contentStyle={{ background: "hsl(0,0%,100%)", border: "1px solid hsl(210,20%,90%)", borderRadius: "8px", fontSize: "11px" }} />
                <Area type="monotone" dataKey="fasting" stroke="hsl(38, 92%, 50%)" fill="url(#glucoseGrad)" strokeWidth={2} name="Fasting" />
                <Line type="monotone" dataKey="pp" stroke="hsl(0, 72%, 55%)" strokeWidth={2} dot={{ r: 3 }} name="Post-Prandial" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Weight */}
        <div className="bg-card rounded-xl p-5 shadow-card border border-border lg:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <Weight className="w-4 h-4 text-success" />
            <h3 className="text-sm font-semibold text-card-foreground">Weight Trend</h3>
            <span className="ml-auto text-[10px] text-success font-medium">↓ 1kg in 6 months</span>
          </div>
          <div className="h-36">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weightData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 20%, 92%)" />
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: "hsl(210, 15%, 50%)" }} />
                <YAxis domain={[75, 80]} tick={{ fontSize: 10, fill: "hsl(210, 15%, 50%)" }} />
                <Tooltip contentStyle={{ background: "hsl(0,0%,100%)", border: "1px solid hsl(210,20%,90%)", borderRadius: "8px", fontSize: "11px" }} />
                <Line type="monotone" dataKey="weight" stroke="hsl(152, 60%, 40%)" strokeWidth={2} dot={{ r: 3 }} name="Weight (kg)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientHealthMonitor;
