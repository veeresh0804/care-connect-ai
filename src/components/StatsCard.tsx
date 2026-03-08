import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  iconColor?: string;
}

const StatsCard = ({ title, value, change, changeType = "neutral", icon: Icon, iconColor }: StatsCardProps) => {
  const changeColorClass =
    changeType === "positive"
      ? "text-success"
      : changeType === "negative"
      ? "text-destructive"
      : "text-muted-foreground";

  return (
    <div className="bg-card rounded-xl p-5 shadow-card border border-border hover:shadow-elevated transition-shadow animate-slide-up">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{title}</p>
          <p className="text-2xl font-bold mt-1 text-card-foreground">{value}</p>
          {change && (
            <p className={`text-xs mt-1 font-medium ${changeColorClass}`}>{change}</p>
          )}
        </div>
        <div className={`p-2.5 rounded-lg ${iconColor || "bg-accent"}`}>
          <Icon className="w-5 h-5 text-accent-foreground" />
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
