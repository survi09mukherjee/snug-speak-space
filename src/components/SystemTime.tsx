import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";

const SystemTime = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <Card className="p-6 border-border/30 bg-card/80 backdrop-blur-sm">
      <div className="space-y-2">
        <h3 className="text-xs text-muted-foreground uppercase tracking-widest">
          System Time
        </h3>
        <div className="text-4xl font-bold text-primary text-glow tabular-nums">
          {formatTime(time)}
        </div>
        <p className="text-sm text-foreground/70">
          {formatDate(time)}
        </p>
      </div>
    </Card>
  );
};

export default SystemTime;
