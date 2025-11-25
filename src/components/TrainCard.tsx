import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Train } from "lucide-react";

interface TrainCardProps {
  trainNumber: string;
  destination: string;
  status: "ON-TIME" | "DELAYED";
  eta: string;
  platform: string;
  distance: string;
}

const TrainCard = ({
  trainNumber,
  destination,
  status,
  eta,
  platform,
  distance,
}: TrainCardProps) => {
  return (
    <Card className="p-4 border-border/30 bg-card/60 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 group">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <Train className="w-4 h-4 text-primary group-hover:text-glow transition-colors" />
          <span className="text-sm font-bold text-foreground">{trainNumber}</span>
        </div>
        <Badge 
          variant={status === "ON-TIME" ? "default" : "destructive"}
          className={
            status === "ON-TIME" 
              ? "bg-success/20 text-success border-success/50" 
              : "bg-secondary/20 text-secondary border-secondary/50"
          }
        >
          {status}
        </Badge>
      </div>
      <p className="text-xs text-muted-foreground mb-3">{destination}</p>
      <div className="grid grid-cols-3 gap-3 text-xs">
        <div>
          <p className="text-muted-foreground uppercase mb-1">ETA</p>
          <p className="font-semibold text-foreground">{eta}</p>
        </div>
        <div>
          <p className="text-muted-foreground uppercase mb-1">Platform</p>
          <p className="font-semibold text-foreground">{platform}</p>
        </div>
        <div>
          <p className="text-muted-foreground uppercase mb-1">Distance</p>
          <p className="font-semibold text-foreground">{distance}</p>
        </div>
      </div>
    </Card>
  );
};

export default TrainCard;
