import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  { name: "Emergency", value: 12, color: "hsl(0, 72%, 55%)" },
  { name: "Urgent", value: 34, color: "hsl(38, 92%, 50%)" },
  { name: "Routine", value: 78, color: "hsl(174, 62%, 38%)" },
];

const TriageChart = () => {
  return (
    <div className="bg-card rounded-xl p-5 shadow-card border border-border animate-slide-up">
      <h3 className="text-sm font-semibold text-card-foreground mb-4">Triage Distribution</h3>
      <div className="flex items-center gap-6">
        <div className="w-32 h-32">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={30}
                outerRadius={55}
                dataKey="value"
                strokeWidth={2}
                stroke="hsl(0, 0%, 100%)"
              >
                {data.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: "hsl(0, 0%, 100%)",
                  border: "1px solid hsl(210, 20%, 90%)",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="space-y-3">
          {data.map((item) => (
            <div key={item.name} className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-xs text-muted-foreground">{item.name}</span>
              <span className="text-xs font-semibold text-card-foreground ml-auto">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TriageChart;
