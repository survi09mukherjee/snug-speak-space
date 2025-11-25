import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Cloud, CloudRain } from "lucide-react";

const SystemOverview = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Card className="p-6 border-border/30 bg-card/60 backdrop-blur-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* System Time */}
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground uppercase tracking-widest">System Time</p>
          <div className="space-y-1">
            <p className="text-4xl font-bold text-primary font-mono tracking-wider glow-text">
              {formatTime(currentTime)}
            </p>
            <p className="text-sm text-muted-foreground">{formatDate(currentTime)}</p>
          </div>
        </div>

        {/* Weather Conditions */}
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground uppercase tracking-widest">Weather Conditions</p>
          <div className="grid grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <Cloud className="w-5 h-5 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Temp</p>
                <p className="text-lg font-bold text-foreground">22°C</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <CloudRain className="w-5 h-5 text-info" />
              <div>
                <p className="text-xs text-muted-foreground">Humidity</p>
                <p className="text-lg font-bold text-foreground">65%</p>
              </div>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Wind</p>
              <p className="text-lg font-bold text-foreground">12 km/h</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default SystemOverview;
