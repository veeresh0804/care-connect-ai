import { useState } from "react";
import { Calendar, Clock, User, MapPin, Video, Phone, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const upcomingAppointments = [
  { id: "A-001", doctor: "Dr. Anita Sharma", specialty: "Cardiology", date: "12 Mar 2026", time: "10:00 AM", type: "In-Person", location: "City Hospital, Room 205", status: "confirmed" },
  { id: "A-002", doctor: "Dr. Ramesh Patel", specialty: "General Physician", date: "18 Mar 2026", time: "02:30 PM", type: "Telehealth", location: "Video Call", status: "confirmed" },
];

const pastAppointments = [
  { id: "A-003", doctor: "Dr. Ramesh Patel", specialty: "General Physician", date: "05 Mar 2026", time: "11:00 AM", type: "In-Person", notes: "Blood tests ordered. Follow-up in 2 weeks." },
  { id: "A-004", doctor: "Dr. Priya Nair", specialty: "Dermatology", date: "20 Feb 2026", time: "03:00 PM", type: "Telehealth", notes: "Prescribed topical cream. Review in 1 month." },
];

const availableSlots = [
  { time: "10:00 AM", available: true },
  { time: "10:30 AM", available: false },
  { time: "11:00 AM", available: true },
  { time: "11:30 AM", available: true },
  { time: "02:00 PM", available: true },
  { time: "02:30 PM", available: false },
  { time: "03:00 PM", available: true },
];

const PatientAppointments = () => {
  const [showBooking, setShowBooking] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">Appointment Management</h2>
        <Button onClick={() => setShowBooking(!showBooking)} className="gradient-primary text-primary-foreground shadow-glow text-xs">
          <Calendar className="w-3.5 h-3.5 mr-1" /> Book Appointment
        </Button>
      </div>

      {showBooking && (
        <div className="bg-card rounded-xl p-5 shadow-card border-2 border-primary/20">
          <h3 className="text-sm font-semibold text-card-foreground mb-3">Book New Appointment</h3>
          <p className="text-xs text-muted-foreground mb-3">Dr. Anita Sharma — Cardiology · Available slots for 20 Mar 2026:</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {availableSlots.map((slot) => (
              <button
                key={slot.time}
                disabled={!slot.available}
                onClick={() => setSelectedSlot(slot.time)}
                className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                  !slot.available
                    ? "bg-muted text-muted-foreground line-through opacity-50 cursor-not-allowed"
                    : selectedSlot === slot.time
                    ? "gradient-primary text-primary-foreground shadow-glow"
                    : "bg-muted text-card-foreground hover:bg-accent"
                }`}
              >
                {slot.time}
              </button>
            ))}
          </div>
          {selectedSlot && (
            <div className="flex items-center gap-3">
              <Button size="sm" className="gradient-primary text-primary-foreground text-xs">Confirm {selectedSlot}</Button>
              <Button size="sm" variant="outline" className="text-xs" onClick={() => { setShowBooking(false); setSelectedSlot(null); }}>Cancel</Button>
            </div>
          )}
        </div>
      )}

      {/* Upcoming */}
      <div>
        <h3 className="text-sm font-semibold text-card-foreground mb-3">Upcoming Appointments</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {upcomingAppointments.map((apt) => (
            <div key={apt.id} className="bg-card rounded-xl p-5 shadow-card border border-border">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center">
                    <User className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-card-foreground">{apt.doctor}</p>
                    <p className="text-[10px] text-muted-foreground">{apt.specialty}</p>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[9px] font-medium bg-success/10 text-success border border-success/20">
                  {apt.status}
                </span>
              </div>
              <div className="space-y-1.5 text-[11px] text-muted-foreground">
                <div className="flex items-center gap-2"><Calendar className="w-3 h-3" /> {apt.date}</div>
                <div className="flex items-center gap-2"><Clock className="w-3 h-3" /> {apt.time}</div>
                <div className="flex items-center gap-2">
                  {apt.type === "Telehealth" ? <Video className="w-3 h-3 text-primary" /> : <MapPin className="w-3 h-3" />}
                  {apt.location}
                </div>
              </div>
              <div className="flex gap-2 mt-3">
                {apt.type === "Telehealth" && (
                  <Button size="sm" className="gradient-primary text-primary-foreground text-[10px] h-7"><Video className="w-3 h-3 mr-1" /> Join Call</Button>
                )}
                <Button size="sm" variant="outline" className="text-[10px] h-7">Reschedule</Button>
                <Button size="sm" variant="outline" className="text-[10px] h-7 text-destructive">Cancel</Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Past */}
      <div>
        <h3 className="text-sm font-semibold text-card-foreground mb-3">Past Appointments</h3>
        <div className="space-y-2">
          {pastAppointments.map((apt) => (
            <div key={apt.id} className="bg-card rounded-xl p-4 shadow-card border border-border flex items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-xs font-medium text-card-foreground">{apt.doctor}</p>
                  <span className="text-[9px] text-muted-foreground">{apt.specialty}</span>
                  <span className="flex items-center gap-1 text-[9px] text-muted-foreground">
                    {apt.type === "Telehealth" ? <Video className="w-2.5 h-2.5" /> : <MapPin className="w-2.5 h-2.5" />} {apt.type}
                  </span>
                </div>
                <p className="text-[10px] text-muted-foreground mt-0.5">{apt.date} · {apt.time}</p>
                <p className="text-[10px] text-muted-foreground mt-1 italic">{apt.notes}</p>
              </div>
              <CheckCircle className="w-4 h-4 text-success shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PatientAppointments;
