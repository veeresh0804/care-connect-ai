import { FileText, Download, Sparkles, Calendar, CheckCircle } from "lucide-react";

const reports = [
  {
    id: "R-001", name: "Complete Blood Count (CBC)", date: "02 Mar 2026", category: "Blood Test",
    aiSummary: "Hemoglobin is slightly low at 11.2 g/dL (normal: 12-16). Consider iron-rich foods like spinach, lentils, and dates. White blood cell count and platelets are within normal range.",
    results: [
      { test: "Hemoglobin", value: "11.2 g/dL", normal: "12-16", flag: "low" },
      { test: "WBC Count", value: "7,200 /μL", normal: "4,500-11,000", flag: "normal" },
      { test: "Platelet Count", value: "2.5 lakh/μL", normal: "1.5-4.0 lakh", flag: "normal" },
      { test: "RBC Count", value: "4.1 M/μL", normal: "4.0-5.5", flag: "normal" },
    ],
  },
  {
    id: "R-002", name: "Lipid Profile", date: "28 Feb 2026", category: "Blood Test",
    aiSummary: "Total cholesterol is borderline high. LDL cholesterol is elevated — lifestyle changes recommended. HDL is good. Consider reducing fried food intake and increasing physical activity.",
    results: [
      { test: "Total Cholesterol", value: "215 mg/dL", normal: "<200", flag: "high" },
      { test: "LDL", value: "142 mg/dL", normal: "<100", flag: "high" },
      { test: "HDL", value: "52 mg/dL", normal: ">40", flag: "normal" },
      { test: "Triglycerides", value: "148 mg/dL", normal: "<150", flag: "normal" },
    ],
  },
  {
    id: "R-003", name: "Chest X-Ray", date: "20 Feb 2026", category: "Radiology",
    aiSummary: "Chest X-ray shows clear lung fields with no active disease. Heart size is within normal limits. No abnormalities detected.",
    results: [
      { test: "Lung Fields", value: "Clear", normal: "Clear", flag: "normal" },
      { test: "Heart Size", value: "Normal", normal: "Normal", flag: "normal" },
      { test: "Costophrenic Angles", value: "Clear", normal: "Clear", flag: "normal" },
    ],
  },
];

const PatientReports = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">Medical Reports</h2>
        <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
          <Calendar className="w-3 h-3" /> Last 6 months
        </div>
      </div>

      <div className="space-y-4">
        {reports.map((report) => (
          <div key={report.id} className="bg-card rounded-xl shadow-card border border-border overflow-hidden">
            <div className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-primary" />
                    <h3 className="text-sm font-semibold text-card-foreground">{report.name}</h3>
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{report.category} · {report.date} · {report.id}</p>
                </div>
                <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-[10px] font-medium bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                  <Download className="w-3 h-3" /> PDF
                </button>
              </div>

              {/* AI Summary */}
              <div className="bg-accent/50 rounded-lg p-3 mb-4">
                <div className="flex items-center gap-1 text-[10px] font-semibold text-accent-foreground mb-1">
                  <Sparkles className="w-3 h-3" /> AI Summary
                </div>
                <p className="text-xs text-accent-foreground leading-relaxed">{report.aiSummary}</p>
              </div>

              {/* Results Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 text-muted-foreground font-medium">Test</th>
                      <th className="text-left py-2 text-muted-foreground font-medium">Result</th>
                      <th className="text-left py-2 text-muted-foreground font-medium">Normal Range</th>
                      <th className="text-center py-2 text-muted-foreground font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {report.results.map((r) => (
                      <tr key={r.test} className="border-b border-border/50">
                        <td className="py-2.5 font-medium text-card-foreground">{r.test}</td>
                        <td className={`py-2.5 font-semibold ${r.flag !== "normal" ? "text-destructive" : "text-card-foreground"}`}>{r.value}</td>
                        <td className="py-2.5 text-muted-foreground">{r.normal}</td>
                        <td className="py-2.5 text-center">
                          {r.flag === "normal" ? (
                            <span className="inline-flex items-center gap-1 text-[9px] font-medium text-success"><CheckCircle className="w-3 h-3" /> Normal</span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[9px] font-bold text-destructive px-2 py-0.5 rounded-full bg-destructive/10">{r.flag === "high" ? "↑ High" : "↓ Low"}</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientReports;
