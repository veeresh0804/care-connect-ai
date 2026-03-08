import { useState } from "react";
import { Users, Plus, Heart, Syringe, Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface FamilyMember {
  id: string;
  name: string;
  relation: string;
  age: number;
  gender: string;
  conditions: string[];
  nextCheckup: string;
  vaccinesDue: number;
}

const familyMembers: FamilyMember[] = [
  { id: "F-001", name: "Sunita Devi", relation: "Mother", age: 62, gender: "F", conditions: ["Hypertension", "Arthritis"], nextCheckup: "20 Mar 2026", vaccinesDue: 1 },
  { id: "F-002", name: "Rajesh Kumar", relation: "Father", age: 67, gender: "M", conditions: ["Diabetes", "Heart Disease"], nextCheckup: "15 Mar 2026", vaccinesDue: 0 },
  { id: "F-003", name: "Priya Kumar", relation: "Daughter", age: 8, gender: "F", conditions: [], nextCheckup: "25 Mar 2026", vaccinesDue: 2 },
  { id: "F-004", name: "Arjun Kumar", relation: "Son", age: 5, gender: "M", conditions: [], nextCheckup: "25 Mar 2026", vaccinesDue: 3 },
];

const PatientFamilyManager = () => {
  const [showAdd, setShowAdd] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">Family Health Management</h2>
        <Button onClick={() => setShowAdd(!showAdd)} className="gradient-primary text-primary-foreground shadow-glow text-xs">
          <Plus className="w-3.5 h-3.5 mr-1" /> Add Member
        </Button>
      </div>

      {showAdd && (
        <div className="bg-card rounded-xl p-5 shadow-card border-2 border-primary/20">
          <h3 className="text-sm font-semibold text-card-foreground mb-3">Add Family Member</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Input placeholder="Full Name" />
            <Input placeholder="Relation" />
            <Input placeholder="Age" />
            <Input placeholder="Gender" />
          </div>
          <div className="flex gap-2 mt-3">
            <Button size="sm" className="gradient-primary text-primary-foreground text-xs">Save</Button>
            <Button size="sm" variant="outline" className="text-xs" onClick={() => setShowAdd(false)}>Cancel</Button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {familyMembers.map((member) => (
          <div key={member.id} className="bg-card rounded-xl p-5 shadow-card border border-border hover:shadow-elevated transition-shadow">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center shrink-0">
                <User className="w-5 h-5 text-primary-foreground" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-card-foreground">{member.name}</h3>
                <p className="text-[10px] text-muted-foreground">{member.relation} · Age {member.age} · {member.gender}</p>
              </div>
            </div>

            {member.conditions.length > 0 && (
              <div className="flex items-center gap-2 mb-3">
                <Heart className="w-3 h-3 text-destructive shrink-0" />
                <div className="flex gap-1 flex-wrap">
                  {member.conditions.map((c) => (
                    <span key={c} className="px-2 py-0.5 rounded-full text-[9px] font-medium bg-destructive/10 text-destructive">{c}</span>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-2">
              <div className="p-2 rounded-lg bg-muted/50 text-center">
                <Calendar className="w-3 h-3 mx-auto mb-1 text-primary" />
                <p className="text-[10px] font-medium text-card-foreground">Next Checkup</p>
                <p className="text-[9px] text-muted-foreground">{member.nextCheckup}</p>
              </div>
              <div className={`p-2 rounded-lg text-center ${member.vaccinesDue > 0 ? "bg-warning/10" : "bg-success/10"}`}>
                <Syringe className={`w-3 h-3 mx-auto mb-1 ${member.vaccinesDue > 0 ? "text-warning" : "text-success"}`} />
                <p className="text-[10px] font-medium text-card-foreground">Vaccines Due</p>
                <p className={`text-[9px] font-semibold ${member.vaccinesDue > 0 ? "text-warning" : "text-success"}`}>
                  {member.vaccinesDue > 0 ? `${member.vaccinesDue} pending` : "Up to date"}
                </p>
              </div>
            </div>

            <div className="flex gap-2 mt-3">
              <Button size="sm" variant="outline" className="text-[10px] h-7 flex-1">View Records</Button>
              <Button size="sm" variant="outline" className="text-[10px] h-7 flex-1">Book Appointment</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientFamilyManager;
