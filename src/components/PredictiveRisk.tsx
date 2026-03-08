import { useState } from "react";
import { TrendingUp, Heart, Droplets, Weight, Activity, AlertTriangle, CheckCircle, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadialBarChart, RadialBar, ResponsiveContainer, PolarAngleAxis } from "recharts";

interface RiskResult {
  overall: number;
  diabetes: { risk: number; timeline: string; factors: string[] };
  cardiac: { risk: number; timeline: string; factors: string[] };
  hypertension: { risk: number; timeline: string; factors: string[] };
  recommendations: string[];
}

const calculateRisk = (age: number, bmi: number, bp: number, glucose: number, smoking: boolean): RiskResult => {
  let diabetesRisk = 10;
  let cardiacRisk = 10;
  let hyperRisk = 10;

  if (age > 45) { diabetesRisk += 15; cardiacRisk += 20; hyperRisk += 15; }
  if (age > 60) { diabetesRisk += 10; cardiacRisk += 15; hyperRisk += 10; }
  if (bmi > 25) { diabetesRisk += 20; cardiacRisk += 15; hyperRisk += 10; }
  if (bmi > 30) { diabetesRisk += 15; cardiacRisk += 10; }
  if (bp > 130) { cardiacRisk += 20; hyperRisk += 25; }
  if (bp > 140) { cardiacRisk += 10; hyperRisk += 15; }
  if (glucose > 100) diabetesRisk += 20;
  if (glucose > 126) diabetesRisk += 20;
  if (smoking) { cardiacRisk += 20; hyperRisk += 10; }

  diabetesRisk = Math.min(95, diabetesRisk);
  cardiacRisk = Math.min(95, cardiacRisk);
  hyperRisk = Math.min(95, hyperRisk);
  const overall = Math.round((diabetesRisk + cardiacRisk + hyperRisk) / 3);

  const timeline = (r: number) => r > 60 ? "1-2 years" : r > 40 ? "3-5 years" : "5+ years";

  const recs: string[] = [];
  if (bmi > 25) recs.push("Reduce BMI through regular exercise and balanced diet");
  if (bp > 130) recs.push("Monitor blood pressure daily; consider low-sodium diet");
  if (glucose > 100) recs.push("Regular glucose monitoring; reduce sugar intake");
  if (smoking) recs.push("Smoking cessation program recommended");
  if (age > 50) recs.push("Annual comprehensive health checkup recommended");
  if (recs.length === 0) recs.push("Maintain current healthy lifestyle", "Annual health screening recommended");

  return {
    overall,
    diabetes: { risk: diabetesRisk, timeline: timeline(diabetesRisk), factors: bmi > 25 || glucose > 100 ? ["BMI", "Glucose"] : ["Age"] },
    cardiac: { risk: cardiacRisk, timeline: timeline(cardiacRisk), factors: bp > 130 || smoking ? ["BP", "Smoking"] : ["Age"] },
    hypertension: { risk: hyperRisk, timeline: timeline(hyperRisk), factors: bp > 130 ? ["Systolic BP"] : ["Age"] },
    recommendations: recs,
  };
};

const riskColor = (r: number) => r >= 70 ? "text-destructive" : r >= 40 ? "text-warning" : "text-success";
const riskBg = (r: number) => r >= 70 ? "hsl(0, 72%, 55%)" : r >= 40 ? "hsl(38, 92%, 50%)" : "hsl(152, 60%, 40%)";

const PredictiveRisk = () => {
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bp, setBp] = useState("");
  const [glucose, setGlucose] = useState("");
  const [smoking, setSmoking] = useState(false);
  const [result, setResult] = useState<RiskResult | null>(null);

  const handleCalculate = () => {
    const a = parseInt(age) || 30;
    const w = parseFloat(weight) || 70;
    const h = parseFloat(height) || 170;
    const bmi = w / ((h / 100) ** 2);
    const b = parseInt(bp) || 120;
    const g = parseInt(glucose) || 90;
    setResult(calculateRisk(a, bmi, b, g, smoking));
  };

  const gaugeData = result ? [{ name: "Risk", value: result.overall, fill: riskBg(result.overall) }] : [];

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg gradient-primary shadow-glow">
          <TrendingUp className="w-5 h-5 text-primary-foreground" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground">Predictive Health Risk Engine</h2>
          <p className="text-xs text-muted-foreground">AI-powered preventive healthcare — predict risks before symptoms appear</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input */}
        <div className="bg-card rounded-xl p-6 shadow-card border border-border space-y-4">
          <h3 className="text-sm font-semibold text-card-foreground">Patient Health Parameters</h3>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] text-muted-foreground uppercase tracking-wider">Age</label>
              <Input placeholder="e.g. 45" value={age} onChange={(e) => setAge(e.target.value)} />
            </div>
            <div>
              <label className="text-[10px] text-muted-foreground uppercase tracking-wider">Weight (kg)</label>
              <Input placeholder="e.g. 75" value={weight} onChange={(e) => setWeight(e.target.value)} />
            </div>
            <div>
              <label className="text-[10px] text-muted-foreground uppercase tracking-wider">Height (cm)</label>
              <Input placeholder="e.g. 170" value={height} onChange={(e) => setHeight(e.target.value)} />
            </div>
            <div>
              <label className="text-[10px] text-muted-foreground uppercase tracking-wider">Systolic BP</label>
              <Input placeholder="e.g. 130" value={bp} onChange={(e) => setBp(e.target.value)} />
            </div>
            <div>
              <label className="text-[10px] text-muted-foreground uppercase tracking-wider">Fasting Glucose</label>
              <Input placeholder="e.g. 100 mg/dL" value={glucose} onChange={(e) => setGlucose(e.target.value)} />
            </div>
            <div className="flex items-end">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={smoking} onChange={(e) => setSmoking(e.target.checked)} className="rounded border-border" />
                <span className="text-xs text-card-foreground">Smoker</span>
              </label>
            </div>
          </div>
          <Button onClick={handleCalculate} className="w-full gradient-primary text-primary-foreground shadow-glow">
            <Brain className="w-4 h-4 mr-2" /> Calculate Risk Profile
          </Button>
        </div>

        {/* Result */}
        <div className="bg-card rounded-xl p-6 shadow-card border border-border">
          {!result ? (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground py-12">
              <Activity className="w-12 h-12 mb-3 opacity-30" />
              <p className="text-sm">Enter patient parameters</p>
              <p className="text-xs mt-1">AI will predict future health risks</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-28 h-28">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadialBarChart cx="50%" cy="50%" innerRadius="70%" outerRadius="100%" data={gaugeData} startAngle={180} endAngle={0}>
                      <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                      <RadialBar dataKey="value" cornerRadius={10} />
                    </RadialBarChart>
                  </ResponsiveContainer>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Overall Risk</p>
                  <p className={`text-3xl font-bold ${riskColor(result.overall)}`}>{result.overall}%</p>
                  <p className="text-[11px] text-muted-foreground">
                    {result.overall >= 70 ? "High Risk — Immediate intervention" : result.overall >= 40 ? "Moderate Risk — Monitoring needed" : "Low Risk — Maintain lifestyle"}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: "Diabetes", icon: Droplets, data: result.diabetes },
                  { label: "Cardiac", icon: Heart, data: result.cardiac },
                  { label: "Hypertension", icon: Activity, data: result.hypertension },
                ].map((item) => (
                  <div key={item.label} className="p-3 rounded-lg bg-muted/50 text-center">
                    <item.icon className={`w-4 h-4 mx-auto mb-1 ${riskColor(item.data.risk)}`} />
                    <p className={`text-lg font-bold ${riskColor(item.data.risk)}`}>{item.data.risk}%</p>
                    <p className="text-[10px] font-medium text-card-foreground">{item.label}</p>
                    <p className="text-[9px] text-muted-foreground">~{item.data.timeline}</p>
                  </div>
                ))}
              </div>

              <div>
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  <CheckCircle className="w-3 h-3 inline mr-1" />Recommendations
                </h4>
                <ul className="space-y-1.5">
                  {result.recommendations.map((r, i) => (
                    <li key={i} className="text-xs text-card-foreground flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PredictiveRisk;
