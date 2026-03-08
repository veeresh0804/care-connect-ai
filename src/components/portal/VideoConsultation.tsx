import { useState, useEffect } from "react";
import { 
  Video, VideoOff, Mic, MicOff, Phone, PhoneOff, 
  MessageSquare, Users, Settings, Maximize2, Minimize2,
  Clock, Shield, FileText, Send, X, User, Stethoscope
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type CallState = "idle" | "connecting" | "connected" | "ended";

interface ChatMessage {
  id: string;
  sender: "patient" | "doctor";
  text: string;
  time: string;
}

const upcomingConsultations = [
  { id: "C-001", doctor: "Dr. Anita Sharma", specialty: "Cardiology", date: "Today", time: "10:00 AM", status: "ready" },
  { id: "C-002", doctor: "Dr. Ramesh Patel", specialty: "General Physician", date: "18 Mar", time: "02:30 PM", status: "scheduled" },
];

const VideoConsultation = () => {
  const [callState, setCallState] = useState<CallState>("idle");
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [activeConsultation, setActiveConsultation] = useState<typeof upcomingConsultations[0] | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { id: "1", sender: "doctor", text: "Hello! I can see your reports. How are you feeling today?", time: "10:01 AM" },
  ]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (callState === "connected") {
      interval = setInterval(() => setCallDuration((d) => d + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [callState]);

  const formatDuration = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const startCall = (consultation: typeof upcomingConsultations[0]) => {
    setActiveConsultation(consultation);
    setCallState("connecting");
    setTimeout(() => setCallState("connected"), 2000);
  };

  const endCall = () => {
    setCallState("ended");
    setTimeout(() => {
      setCallState("idle");
      setActiveConsultation(null);
      setCallDuration(0);
    }, 2000);
  };

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    setChatMessages((prev) => [...prev, {
      id: Date.now().toString(),
      sender: "patient",
      text: newMessage,
      time: new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }),
    }]);
    setNewMessage("");
    // Mock doctor response
    setTimeout(() => {
      setChatMessages((prev) => [...prev, {
        id: (Date.now() + 1).toString(),
        sender: "doctor",
        text: "I understand. Let me check your vitals history from the system.",
        time: new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }),
      }]);
    }, 2000);
  };

  // Idle state - show upcoming consultations
  if (callState === "idle") {
    return (
      <div className="space-y-6 animate-slide-up">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg gradient-primary shadow-glow">
            <Video className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Video Consultation</h2>
            <p className="text-xs text-muted-foreground">Connect with doctors via secure telemedicine video call</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Upcoming Consultations */}
          <div className="bg-card rounded-xl p-5 shadow-card border border-border">
            <h3 className="text-sm font-semibold text-card-foreground mb-4">Scheduled Consultations</h3>
            <div className="space-y-3">
              {upcomingConsultations.map((c) => (
                <div key={c.id} className="p-4 rounded-lg bg-muted/50 border border-border">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center">
                        <Stethoscope className="w-5 h-5 text-primary-foreground" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-card-foreground">{c.doctor}</p>
                        <p className="text-[10px] text-muted-foreground">{c.specialty}</p>
                      </div>
                    </div>
                    {c.status === "ready" && (
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-success/10 text-success border border-success/20 animate-pulse">
                        Ready to Join
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-[11px] text-muted-foreground mb-3">
                    <Clock className="w-3 h-3" /> {c.date} · {c.time}
                  </div>
                  {c.status === "ready" ? (
                    <Button onClick={() => startCall(c)} className="w-full gradient-primary text-primary-foreground shadow-glow text-xs">
                      <Video className="w-3.5 h-3.5 mr-1" /> Join Video Call
                    </Button>
                  ) : (
                    <Button variant="outline" className="w-full text-xs" disabled>
                      Starts {c.date} · {c.time}
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Pre-call Checklist */}
          <div className="bg-card rounded-xl p-5 shadow-card border border-border">
            <h3 className="text-sm font-semibold text-card-foreground mb-4">Before Your Call</h3>
            <div className="space-y-3">
              {[
                { icon: Video, label: "Camera working", desc: "Ensure good lighting" },
                { icon: Mic, label: "Microphone ready", desc: "Test audio before call" },
                { icon: FileText, label: "Reports uploaded", desc: "Doctor can view your records" },
                { icon: Shield, label: "Secure connection", desc: "End-to-end encrypted" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3 p-3 rounded-lg bg-success/5 border border-success/10">
                  <div className="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center">
                    <item.icon className="w-4 h-4 text-success" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-card-foreground">{item.label}</p>
                    <p className="text-[10px] text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Active call UI
  return (
    <div className={`animate-slide-up ${isFullscreen ? "fixed inset-0 z-50 bg-background p-4" : ""}`}>
      <div className={`grid ${showChat ? "grid-cols-1 lg:grid-cols-3" : "grid-cols-1"} gap-4 h-full`}>
        {/* Video Area */}
        <div className={`${showChat ? "lg:col-span-2" : ""} flex flex-col`}>
          <div className="relative bg-slate-900 rounded-2xl overflow-hidden flex-1" style={{ minHeight: isFullscreen ? "calc(100vh - 120px)" : "480px" }}>
            {/* Main Video (Doctor) */}
            <div className="absolute inset-0 flex items-center justify-center">
              {callState === "connecting" ? (
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center mx-auto mb-4 animate-pulse">
                    <Stethoscope className="w-10 h-10 text-primary-foreground" />
                  </div>
                  <p className="text-white text-sm font-medium">Connecting to {activeConsultation?.doctor}...</p>
                  <p className="text-white/60 text-xs mt-1">Please wait</p>
                </div>
              ) : callState === "ended" ? (
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                    <PhoneOff className="w-10 h-10 text-muted-foreground" />
                  </div>
                  <p className="text-white text-sm font-medium">Call Ended</p>
                  <p className="text-white/60 text-xs mt-1">Duration: {formatDuration(callDuration)}</p>
                </div>
              ) : (
                <>
                  {/* Mock doctor video placeholder */}
                  <div className="w-32 h-32 rounded-full gradient-hero flex items-center justify-center">
                    <Stethoscope className="w-16 h-16 text-sidebar-primary" />
                  </div>
                </>
              )}
            </div>

            {/* Patient Video (PiP) */}
            {callState === "connected" && (
              <div className="absolute bottom-4 right-4 w-36 h-28 rounded-xl bg-slate-800 border-2 border-white/20 overflow-hidden shadow-elevated">
                {isVideoOn ? (
                  <div className="w-full h-full flex items-center justify-center bg-slate-700">
                    <User className="w-10 h-10 text-white/50" />
                  </div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-slate-800">
                    <VideoOff className="w-8 h-8 text-white/40" />
                  </div>
                )}
              </div>
            )}

            {/* Top Bar */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur">
                <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                <span className="text-white text-[11px] font-medium">
                  {callState === "connected" ? formatDuration(callDuration) : callState === "connecting" ? "Connecting..." : ""}
                </span>
              </div>
              {callState === "connected" && (
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur">
                  <Shield className="w-3 h-3 text-success" />
                  <span className="text-white/80 text-[10px]">Encrypted</span>
                </div>
              )}
            </div>

            {/* Doctor Info */}
            {callState === "connected" && activeConsultation && (
              <div className="absolute top-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-xl bg-black/40 backdrop-blur">
                <p className="text-white text-xs font-medium text-center">{activeConsultation.doctor}</p>
                <p className="text-white/60 text-[10px] text-center">{activeConsultation.specialty}</p>
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-3 py-4">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                isMuted ? "bg-destructive text-destructive-foreground" : "bg-muted text-foreground hover:bg-accent"
              }`}
            >
              {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setIsVideoOn(!isVideoOn)}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                !isVideoOn ? "bg-destructive text-destructive-foreground" : "bg-muted text-foreground hover:bg-accent"
              }`}
            >
              {isVideoOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
            </button>
            <button
              onClick={endCall}
              className="w-14 h-14 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center hover:opacity-90 transition-opacity"
            >
              <Phone className="w-6 h-6 rotate-[135deg]" />
            </button>
            <button
              onClick={() => setShowChat(!showChat)}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                showChat ? "gradient-primary text-primary-foreground" : "bg-muted text-foreground hover:bg-accent"
              }`}
            >
              <MessageSquare className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="w-12 h-12 rounded-full bg-muted text-foreground hover:bg-accent flex items-center justify-center transition-all"
            >
              {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Chat Panel */}
        {showChat && callState === "connected" && (
          <div className="bg-card rounded-xl shadow-card border border-border flex flex-col" style={{ height: isFullscreen ? "calc(100vh - 32px)" : "540px" }}>
            <div className="p-4 border-b border-border flex items-center justify-between">
              <h3 className="text-sm font-semibold text-card-foreground flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-primary" /> Chat
              </h3>
              <button onClick={() => setShowChat(false)} className="p-1 rounded hover:bg-muted">
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {chatMessages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === "patient" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] rounded-xl px-3 py-2 ${
                    msg.sender === "patient"
                      ? "gradient-primary text-primary-foreground rounded-br-sm"
                      : "bg-muted text-foreground rounded-bl-sm"
                  }`}>
                    <p className="text-xs">{msg.text}</p>
                    <p className={`text-[9px] mt-1 ${msg.sender === "patient" ? "text-primary-foreground/60" : "text-muted-foreground"}`}>{msg.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-3 border-t border-border flex gap-2">
              <Input
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                className="text-xs"
              />
              <Button size="sm" onClick={sendMessage} className="gradient-primary text-primary-foreground">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoConsultation;
