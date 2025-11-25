import { ArrowUp, ArrowDown } from "lucide-react";
import TrainCard from "./TrainCard";

interface TrainSectionProps {
  direction: "upline" | "downline";
}

const TrainSection = ({ direction }: TrainSectionProps) => {
  const isUpline = direction === "upline";
  
  const trains = isUpline
    ? [
        {
          trainNumber: "Train #A402",
          destination: "Central Station",
          status: "DELAYED" as const,
          eta: "3 min",
          platform: "4",
          distance: "2.5 km",
        },
        {
          trainNumber: "Train #B305",
          destination: "North Terminal",
          status: "DELAYED" as const,
          eta: "8 min",
          platform: "3",
          distance: "5 km",
        },
      ]
    : [
        {
          trainNumber: "Train #D201",
          destination: "South Harbor",
          status: "ON-TIME" as const,
          eta: "3 min",
          platform: "4",
          distance: "2.5 km",
        },
        {
          trainNumber: "Train #E504",
          destination: "West Junction",
          status: "ON-TIME" as const,
          eta: "8 min",
          platform: "3",
          distance: "5 km",
        },
      ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        {isUpline ? (
          <ArrowUp className="w-4 h-4 text-primary" />
        ) : (
          <ArrowDown className="w-4 h-4 text-primary" />
        )}
        <h3 className="text-xs text-muted-foreground uppercase tracking-widest">
          {isUpline ? "Upline" : "Downline"} Trains
        </h3>
      </div>
      <div className="space-y-3">
        {trains.map((train) => (
          <TrainCard key={train.trainNumber} {...train} />
        ))}
      </div>
    </div>
  );
};

export default TrainSection;
