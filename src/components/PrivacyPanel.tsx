import { Shield, Lock, Eye, FileCheck, Server, CheckCircle, AlertTriangle } from "lucide-react";

const complianceItems = [
  { label: "HIPAA Compliance", status: "active", icon: Shield },
  { label: "End-to-End Encryption", status: "active", icon: Lock },
  { label: "Data Anonymization", status: "active", icon: Eye },
  { label: "Audit Logging", status: "active", icon: FileCheck },
  { label: "Decentralized Storage", status: "pending", icon: Server },
];

const auditLog = [
  { time: "14:23", action: "Patient record accessed", user: "Dr. Sharma", type: "read" },
  { time: "14:18", action: "Diagnosis report generated", user: "AI Engine", type: "system" },
  { time: "14:12", action: "Vitals data encrypted & stored", user: "IoT Gateway", type: "write" },
  { time: "14:05", action: "User authentication verified", user: "Dr. Chen", type: "auth" },
  { time: "13:58", action: "Anonymized dataset exported", user: "Research Dept.", type: "export" },
];

const PrivacyPanel = () => {
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg gradient-primary shadow-glow">
          <Shield className="w-5 h-5 text-primary-foreground" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground">Privacy & Security Layer</h2>
          <p className="text-xs text-muted-foreground">End-to-end data protection & compliance monitoring</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Compliance Status */}
        <div className="bg-card rounded-xl p-5 shadow-card border border-border">
          <h3 className="text-sm font-semibold text-card-foreground mb-4">Compliance Status</h3>
          <div className="space-y-3">
            {complianceItems.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                  <Icon className="w-4 h-4 text-primary" />
                  <span className="text-sm text-card-foreground flex-1">{item.label}</span>
                  {item.status === "active" ? (
                    <span className="flex items-center gap-1 text-[10px] font-medium text-success">
                      <CheckCircle className="w-3 h-3" /> Active
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-[10px] font-medium text-warning">
                      <AlertTriangle className="w-3 h-3" /> Pending
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Audit Log */}
        <div className="bg-card rounded-xl p-5 shadow-card border border-border">
          <h3 className="text-sm font-semibold text-card-foreground mb-4">Recent Audit Trail</h3>
          <div className="space-y-1">
            {auditLog.map((log, i) => (
              <div key={i} className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-muted/30 transition-colors">
                <span className="text-[10px] font-mono text-muted-foreground mt-0.5 shrink-0">{log.time}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-card-foreground font-medium">{log.action}</p>
                  <p className="text-[10px] text-muted-foreground">{log.user}</p>
                </div>
                <span className={`text-[9px] font-medium px-1.5 py-0.5 rounded ${
                  log.type === "auth" ? "bg-info/10 text-info" :
                  log.type === "write" ? "bg-success/10 text-success" :
                  log.type === "system" ? "bg-primary/10 text-primary" :
                  log.type === "export" ? "bg-warning/10 text-warning" :
                  "bg-muted text-muted-foreground"
                }`}>
                  {log.type}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Encryption Info */}
      <div className="bg-card rounded-xl p-5 shadow-card border border-border">
        <h3 className="text-sm font-semibold text-card-foreground mb-3">Data Security Architecture</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: "At Rest", desc: "AES-256 encryption for all stored patient data", icon: Lock },
            { title: "In Transit", desc: "TLS 1.3 for all API communications & data transfers", icon: Shield },
            { title: "Access Control", desc: "Role-based access with multi-factor authentication", icon: Eye },
          ].map((item) => (
            <div key={item.title} className="p-4 rounded-lg bg-accent/50 border border-accent">
              <item.icon className="w-5 h-5 text-accent-foreground mb-2" />
              <h4 className="text-xs font-semibold text-card-foreground mb-1">{item.title}</h4>
              <p className="text-[11px] text-muted-foreground leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PrivacyPanel;
