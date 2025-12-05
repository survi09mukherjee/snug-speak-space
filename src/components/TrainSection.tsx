import { ArrowUp, ArrowDown } from "lucide-react";
import TrainCard from "./TrainCard";

// Station data from database
const stations = {
  cbe: { name: "Coimbatore Junction", code: "CBE" },
  cbf: { name: "Coimbatore North Junction", code: "CBF" },
  ptj: { name: "Podanur Junction", code: "PTJ" },
  shi: { name: "Singanallur", code: "SHI" },
};

interface TrainSectionProps {
  direction: "upline" | "downline";
}

const TrainSection = ({ direction }: TrainSectionProps) => {
  const isUpline = direction === "upline";
  
  const train = isUpline
    ? {
        trainNumber: "12675 Kovai Express",
        destination: `${stations.cbe.name} (${stations.cbe.code})`,
        status: "ON-TIME" as const,
        eta: "5 min",
        platform: "1",
        distance: "4.2 km",
      }
    : {
        trainNumber: "56324 Coimbatore Local",
        destination: `${stations.ptj.name} (${stations.ptj.code})`,
        status: "DELAYED" as const,
        eta: "8 min",
        platform: "3",
        distance: "6.1 km",
      };

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
      <TrainCard {...train} />
    </div>
  );
};

export default TrainSection;
