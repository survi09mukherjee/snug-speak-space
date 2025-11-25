import { Card } from "@/components/ui/card";
import { Cloud, Wind, Droplets } from "lucide-react";

const WeatherCard = () => {
  return (
    <Card className="p-6 border-border/30 bg-card/80 backdrop-blur-sm">
      <div className="space-y-4">
        <h3 className="text-xs text-muted-foreground uppercase tracking-widest">
          Weather Conditions
        </h3>
        <div className="flex items-center justify-between">
          <div className="text-4xl font-bold text-primary text-glow">
            22°C
          </div>
          <Cloud className="w-12 h-12 text-accent" />
        </div>
        <p className="text-sm text-foreground/70">Partly Cloudy</p>
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/30">
          <div className="flex items-center gap-2">
            <Droplets className="w-4 h-4 text-info" />
            <div>
              <p className="text-xs text-muted-foreground uppercase">Humidity</p>
              <p className="text-lg font-semibold text-foreground">65%</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Wind className="w-4 h-4 text-info" />
            <div>
              <p className="text-xs text-muted-foreground uppercase">Wind</p>
              <p className="text-lg font-semibold text-foreground">12 km/h</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default WeatherCard;
