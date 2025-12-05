import { Card } from "@/components/ui/card";

const TrainAnimation = () => {
  // Train data
  const trainA = {
    name: "Express 101",
    location: "KM 45.2",
    nearbyStation: "Central Junction",
  };

  const trainB = {
    name: "Local 204",
    location: "KM 78.6",
    nearbyStation: "East Terminal",
  };

  const distanceBetween = "33.4 KM";

  return (
    <Card className="p-6 border-border/30 bg-card/60 backdrop-blur-sm">
      <div className="space-y-4">
        <h3 className="text-xs text-muted-foreground uppercase tracking-widest">
          Track Overview
        </h3>

        <div className="relative w-full h-[400px] bg-background/50 rounded-lg overflow-hidden border border-border/20">
          <svg
            className="w-full h-full"
            viewBox="0 0 1000 600"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Main straight line (middle) */}
            <path
              id="mainLine"
              d="M 50 300 L 950 300"
              className="fill-none stroke-[4] stroke-primary"
              style={{
                filter: "drop-shadow(0 0 8px hsl(var(--glow-primary) / 0.6))",
              }}
            />

            {/* Top loop line */}
            <path
              id="topLoop"
              d="M 50 300 Q 250 100, 500 100 Q 750 100, 950 300"
              className="fill-none stroke-[3] stroke-accent"
              strokeDasharray="10 5"
              style={{
                filter: "drop-shadow(0 0 6px hsl(var(--glow-accent) / 0.5))",
              }}
            />

            {/* Bottom loop line */}
            <path
              id="bottomLoop"
              d="M 50 300 Q 250 500, 500 500 Q 750 500, 950 300"
              className="fill-none stroke-[3] stroke-accent"
              strokeDasharray="10 5"
              style={{
                filter: "drop-shadow(0 0 6px hsl(var(--glow-accent) / 0.5))",
              }}
            />

            {/* Distance line between trains */}
            <line
              x1="200"
              y1="300"
              x2="800"
              y2="300"
              className="stroke-muted-foreground/50 stroke-[2]"
              strokeDasharray="5 5"
            />

            {/* Arrow pointing right (Train A direction) */}
            <polygon
              points="280,290 300,300 280,310"
              className="fill-primary"
            />

            {/* Arrow pointing left (Train B direction) */}
            <polygon
              points="720,290 700,300 720,310"
              className="fill-accent"
            />
          </svg>

          {/* Train A - Left side */}
          <div
            className="absolute flex flex-col items-center gap-1 z-10"
            style={{ left: "15%", top: "50%", transform: "translate(-50%, -50%)" }}
          >
            <div className="text-3xl filter drop-shadow-lg">🚂</div>
            <div className="text-center mt-2 space-y-1">
              <div className="text-xs font-bold px-3 py-1 bg-primary/20 backdrop-blur-sm rounded border border-primary/30 text-primary">
                {trainA.name}
              </div>
              <div className="text-[10px] text-muted-foreground">
                {trainA.location}
              </div>
              <div className="text-[10px] text-muted-foreground">
                Near: {trainA.nearbyStation}
              </div>
            </div>
          </div>

          {/* Train B - Right side */}
          <div
            className="absolute flex flex-col items-center gap-1 z-10"
            style={{ left: "85%", top: "50%", transform: "translate(-50%, -50%)" }}
          >
            <div className="text-3xl filter drop-shadow-lg transform scale-x-[-1]">🚂</div>
            <div className="text-center mt-2 space-y-1">
              <div className="text-xs font-bold px-3 py-1 bg-accent/20 backdrop-blur-sm rounded border border-accent/30 text-accent">
                {trainB.name}
              </div>
              <div className="text-[10px] text-muted-foreground">
                {trainB.location}
              </div>
              <div className="text-[10px] text-muted-foreground">
                Near: {trainB.nearbyStation}
              </div>
            </div>
          </div>

          {/* Distance indicator in center */}
          <div
            className="absolute z-10"
            style={{ left: "50%", top: "50%", transform: "translate(-50%, -100%)" }}
          >
            <div className="text-sm font-bold px-4 py-2 bg-destructive/20 backdrop-blur-sm rounded-lg border border-destructive/30 text-destructive">
              Distance: {distanceBetween}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TrainAnimation;
