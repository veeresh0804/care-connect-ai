import { useState, useRef, useEffect } from "react";
import {
  MessageSquare,
  Send,
  Shield,
  Lock,
  User,
  Stethoscope,
  Paperclip,
  Search,
  MoreVertical,
  Phone,
  Video,
  Check,
  CheckCheck,
  Clock,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: "patient" | "doctor";
  content: string;
  timestamp: Date;
  status: "sent" | "delivered" | "read";
  encrypted: boolean;
}

interface Conversation {
  id: string;
  doctorName: string;
  specialty: string;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  online: boolean;
}

const mockConversations: Conversation[] = [
  {
    id: "1",
    doctorName: "Dr. Anita Sharma",
    specialty: "Cardiologist",
    lastMessage: "Your ECG results look normal. Continue with the prescribed medication.",
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 30),
    unreadCount: 2,
    online: true,
  },
  {
    id: "2",
    doctorName: "Dr. Ramesh Patel",
    specialty: "General Physician",
    lastMessage: "Please schedule a follow-up appointment next week.",
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 3),
    unreadCount: 0,
    online: false,
  },
  {
    id: "3",
    doctorName: "Dr. Priya Menon",
    specialty: "Dermatologist",
    lastMessage: "The rash should clear up within 5-7 days with the cream I prescribed.",
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 24),
    unreadCount: 0,
    online: true,
  },
];

const mockMessages: Record<string, Message[]> = {
  "1": [
    {
      id: "m1",
      senderId: "patient",
      senderName: "Ravi Kumar",
      senderRole: "patient",
      content: "Good morning, Doctor. I wanted to ask about my recent ECG report.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      status: "read",
      encrypted: true,
    },
    {
      id: "m2",
      senderId: "doctor",
      senderName: "Dr. Anita Sharma",
      senderRole: "doctor",
      content: "Good morning, Ravi. I've reviewed your ECG results and everything looks normal. Your heart rhythm is regular.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1.5),
      status: "read",
      encrypted: true,
    },
    {
      id: "m3",
      senderId: "patient",
      senderName: "Ravi Kumar",
      senderRole: "patient",
      content: "That's a relief! Should I continue with the current medication?",
      timestamp: new Date(Date.now() - 1000 * 60 * 60),
      status: "read",
      encrypted: true,
    },
    {
      id: "m4",
      senderId: "doctor",
      senderName: "Dr. Anita Sharma",
      senderRole: "doctor",
      content: "Yes, please continue with the prescribed medication. Take Amlodipine 5mg once daily as directed.",
      timestamp: new Date(Date.now() - 1000 * 60 * 45),
      status: "read",
      encrypted: true,
    },
    {
      id: "m5",
      senderId: "doctor",
      senderName: "Dr. Anita Sharma",
      senderRole: "doctor",
      content: "Your ECG results look normal. Continue with the prescribed medication.",
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      status: "delivered",
      encrypted: true,
    },
  ],
  "2": [
    {
      id: "m6",
      senderId: "doctor",
      senderName: "Dr. Ramesh Patel",
      senderRole: "doctor",
      content: "Hello Ravi, I hope you're feeling better. Please schedule a follow-up appointment next week.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3),
      status: "read",
      encrypted: true,
    },
  ],
  "3": [
    {
      id: "m7",
      senderId: "patient",
      senderName: "Ravi Kumar",
      senderRole: "patient",
      content: "Dr. Menon, the rash on my arm is still itchy. Is that normal?",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 25),
      status: "read",
      encrypted: true,
    },
    {
      id: "m8",
      senderId: "doctor",
      senderName: "Dr. Priya Menon",
      senderRole: "doctor",
      content: "The rash should clear up within 5-7 days with the cream I prescribed. Some itching is normal during healing.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
      status: "read",
      encrypted: true,
    },
  ],
};

const formatTime = (date: Date) => {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  if (days === 1) return "Yesterday";
  return date.toLocaleDateString();
};

const PatientChat = () => {
  const [selectedConversation, setSelectedConversation] = useState<string>("1");
  const [messages, setMessages] = useState<Message[]>(mockMessages["1"]);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const selectedDoctor = mockConversations.find((c) => c.id === selectedConversation);

  useEffect(() => {
    setMessages(mockMessages[selectedConversation] || []);
  }, [selectedConversation]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: `m${Date.now()}`,
      senderId: "patient",
      senderName: "Ravi Kumar",
      senderRole: "patient",
      content: newMessage,
      timestamp: new Date(),
      status: "sent",
      encrypted: true,
    };

    setMessages((prev) => [...prev, message]);
    setNewMessage("");

    // Simulate doctor reply after delay
    setTimeout(() => {
      const reply: Message = {
        id: `m${Date.now() + 1}`,
        senderId: "doctor",
        senderName: selectedDoctor?.doctorName || "Doctor",
        senderRole: "doctor",
        content: "Thank you for your message. I'll review this and get back to you shortly.",
        timestamp: new Date(),
        status: "delivered",
        encrypted: true,
      };
      setMessages((prev) => [...prev, reply]);
    }, 2000);
  };

  const filteredConversations = mockConversations.filter(
    (c) =>
      c.doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.specialty.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const MessageStatus = ({ status }: { status: string }) => {
    switch (status) {
      case "sent":
        return <Clock className="w-3 h-3 text-muted-foreground" />;
      case "delivered":
        return <Check className="w-3 h-3 text-muted-foreground" />;
      case "read":
        return <CheckCheck className="w-3 h-3 text-primary" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl gradient-primary shadow-glow flex items-center justify-center">
            <MessageSquare className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-foreground">Secure Messages</h2>
            <p className="text-xs text-muted-foreground">End-to-end encrypted doctor-patient communication</p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/50 text-accent-foreground">
          <Lock className="w-3.5 h-3.5" />
          <span className="text-[10px] font-medium">E2E Encrypted</span>
        </div>
      </div>

      {/* Chat Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[calc(100vh-220px)]">
        {/* Conversations List */}
        <div className="bg-card rounded-2xl border border-border shadow-card overflow-hidden">
          <div className="p-3 border-b border-border">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-9 text-xs bg-muted border-0"
              />
            </div>
          </div>
          <ScrollArea className="h-[calc(100%-60px)]">
            <div className="p-2 space-y-1">
              {filteredConversations.map((conv) => (
                <button
                  key={conv.id}
                  onClick={() => setSelectedConversation(conv.id)}
                  className={`w-full flex items-start gap-3 p-3 rounded-xl transition-all text-left ${
                    selectedConversation === conv.id
                      ? "bg-primary/10 border border-primary/20"
                      : "hover:bg-muted"
                  }`}
                >
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full gradient-hero flex items-center justify-center shrink-0">
                      <Stethoscope className="w-5 h-5 text-primary" />
                    </div>
                    {conv.online && (
                      <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-card" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <p className="text-xs font-semibold text-foreground truncate">{conv.doctorName}</p>
                      <span className="text-[9px] text-muted-foreground shrink-0">
                        {formatTime(conv.lastMessageTime)}
                      </span>
                    </div>
                    <p className="text-[10px] text-primary mb-1">{conv.specialty}</p>
                    <p className="text-[10px] text-muted-foreground truncate">{conv.lastMessage}</p>
                  </div>
                  {conv.unreadCount > 0 && (
                    <Badge className="shrink-0 h-5 min-w-5 flex items-center justify-center rounded-full gradient-primary text-[9px] font-bold">
                      {conv.unreadCount}
                    </Badge>
                  )}
                </button>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Chat Area */}
        <div className="lg:col-span-2 bg-card rounded-2xl border border-border shadow-card flex flex-col overflow-hidden">
          {/* Chat Header */}
          {selectedDoctor && (
            <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/30">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full gradient-hero flex items-center justify-center">
                    <Stethoscope className="w-5 h-5 text-primary" />
                  </div>
                  {selectedDoctor.online && (
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-card" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{selectedDoctor.doctorName}</p>
                  <p className="text-[10px] text-muted-foreground">
                    {selectedDoctor.online ? (
                      <span className="text-emerald-500">● Online</span>
                    ) : (
                      "Last seen 3 hours ago"
                    )}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg">
                  <Phone className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg">
                  <Video className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {/* Encryption Notice */}
              <div className="flex items-center justify-center gap-2 py-2">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent/30">
                  <Shield className="w-3 h-3 text-primary" />
                  <span className="text-[9px] text-muted-foreground">
                    Messages are end-to-end encrypted · HIPAA Compliant
                  </span>
                </div>
              </div>

              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.senderRole === "patient" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[75%] ${
                      msg.senderRole === "patient" ? "order-2" : "order-1"
                    }`}
                  >
                    <div
                      className={`px-4 py-2.5 rounded-2xl ${
                        msg.senderRole === "patient"
                          ? "gradient-primary text-primary-foreground rounded-br-md"
                          : "bg-muted text-foreground rounded-bl-md"
                      }`}
                    >
                      <p className="text-xs leading-relaxed">{msg.content}</p>
                    </div>
                    <div
                      className={`flex items-center gap-1.5 mt-1 ${
                        msg.senderRole === "patient" ? "justify-end" : "justify-start"
                      }`}
                    >
                      {msg.encrypted && <Lock className="w-2.5 h-2.5 text-muted-foreground" />}
                      <span className="text-[9px] text-muted-foreground">
                        {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </span>
                      {msg.senderRole === "patient" && <MessageStatus status={msg.status} />}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Message Input */}
          <div className="p-3 border-t border-border bg-muted/20">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg shrink-0">
                <Paperclip className="w-4 h-4" />
              </Button>
              <Input
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-1 h-9 text-xs bg-card border-border"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
                className="h-9 px-4 rounded-lg gradient-primary shadow-glow"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex items-center justify-center gap-1.5 mt-2">
              <Lock className="w-2.5 h-2.5 text-muted-foreground" />
              <span className="text-[8px] text-muted-foreground">
                Your messages are secured with end-to-end encryption
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientChat;
