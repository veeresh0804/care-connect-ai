import { BedDouble, Users, Clock, Calendar, TrendingUp, Zap } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from "recharts";

const bedData = [
  { ward: "ICU", total: 20, occupied: 18 },
  { ward: "General", total: 50, occupied: 35 },
  { ward: "Pediatric", total: 15, occupied: 8 },
  { ward: "Maternity", total: 12, occupied: 10 },
  { ward: "Emergency", total: 25, occupied: 22 },
];

const appointmentData = [
  { hour: "8AM", count: 12 },
  { hour: "9AM", count: 18 },
  { hour: "10AM", count: 22 },
  { hour: "11AM", count: 15 },
  { hour: "12PM", count: 8 },
  { hour: "1PM", count: 14 },
  { hour: "2PM", count: 20 },
  { hour: "3PM", count: 16 },
  { hour: "4PM", count: 10 },
];

const doctors = [
  { name: "Dr. R. Sharma", specialty: "Cardiology", patients: 8, load: 85 },
  { name: "Dr. L. Chen", specialty: "General", patients: 12, load: 95 },
  { name: "Dr. A. Mbeki", specialty: "Pediatrics", patients: 5, load: 50 },
  { name: "Dr. S. Rivera", specialty: "Emergency", patients: 10, load: 100 },
  { name: "Dr. K. Tanaka", specialty: "Pulmonology", patients: 6, load: 60 },
];

const WorkflowDashboard = () => {
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg gradient-primary shadow-glow">
          <Zap className="w-5 h-5 text-primary-foreground" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground">Workflow Automation</h2>
          <p className="text-xs text-muted-foreground">Hospital resource allocation & scheduling optimization</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Bed Allocation */}
        <div className="bg-card rounded-xl p-5 shadow-card border border-border lg:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <BedDouble className="w-4 h-4 text-primary" />
            <h3 className="text-sm font-semibold text-card-foreground">Bed Allocation</h3>
          </div>
          <div className="space-y-3">
            {bedData.map((ward) => {
              const pct = Math.round((ward.occupied / ward.total) * 100);
              return (
                <div key={ward.ward}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-card-foreground font-medium">{ward.ward}</span>
                    <span className="text-muted-foreground">
                      {ward.occupied}/{ward.total}{" "}
                      <span className={pct >= 90 ? "text-destructive font-semibold" : pct >= 70 ? "text-warning" : "text-success"}>
                        ({pct}%)
                      </span>
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        pct >= 90 ? "bg-destructive" : pct >= 70 ? "bg-warning" : "bg-success"
                      }`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Appointment Volume */}
        <div className="bg-card rounded-xl p-5 shadow-card border border-border lg:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-4 h-4 text-primary" />
            <h3 className="text-sm font-semibold text-card-foreground">Today's Appointment Volume</h3>
            <span className="ml-auto text-[10px] text-muted-foreground flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-success" /> 12% above average
            </span>
          </div>
          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={appointmentData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 20%, 92%)" />
                <XAxis dataKey="hour" tick={{ fontSize: 11, fill: "hsl(210, 15%, 50%)" }} />
                <YAxis tick={{ fontSize: 11, fill: "hsl(210, 15%, 50%)" }} />
                <Tooltip
                  contentStyle={{
                    background: "hsl(0, 0%, 100%)",
                    border: "1px solid hsl(210, 20%, 90%)",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />
                <Bar dataKey="count" fill="hsl(174, 62%, 38%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Doctor Load */}
      <div className="bg-card rounded-xl p-5 shadow-card border border-border">
        <div className="flex items-center gap-2 mb-4">
          <Users className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-semibold text-card-foreground">Doctor Load Distribution</h3>
          <span className="ml-auto flex items-center gap-1 text-[10px] text-muted-foreground">
            <Clock className="w-3 h-3" /> Auto-optimized every 30 min
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 text-muted-foreground font-medium">Doctor</th>
                <th className="text-left py-2 text-muted-foreground font-medium">Specialty</th>
                <th className="text-center py-2 text-muted-foreground font-medium">Patients</th>
                <th className="text-left py-2 text-muted-foreground font-medium">Load</th>
              </tr>
            </thead>
            <tbody>
              {doctors.map((doc) => (
                <tr key={doc.name} className="border-b border-border/50">
                  <td className="py-2.5 font-medium text-card-foreground">{doc.name}</td>
                  <td className="py-2.5 text-muted-foreground">{doc.specialty}</td>
                  <td className="py-2.5 text-center text-card-foreground">{doc.patients}</td>
                  <td className="py-2.5">
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 rounded-full bg-muted overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            doc.load >= 90 ? "bg-destructive" : doc.load >= 70 ? "bg-warning" : "bg-success"
                          }`}
                          style={{ width: `${doc.load}%` }}
                        />
                      </div>
                      <span className={`font-semibold ${
                        doc.load >= 90 ? "text-destructive" : doc.load >= 70 ? "text-warning" : "text-success"
                      }`}>
                        {doc.load}%
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default WorkflowDashboard;
