import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Train } from "lucide-react";

const TrainAnimation = () => {
  const [leftTrainPos, setLeftTrainPos] = useState({ x: 10, y: 50, moving: false });
  const [rightTrainPos, setRightTrainPos] = useState({ x: 90, y: 50, moving: false });
  const [phase, setPhase] = useState<"leftToRight" | "rightToLeft">("leftToRight");
  const [rightTrainLoop, setRightTrainLoop] = useState<"top" | "bottom">("top");
  const [leftTrainLoop, setLeftTrainLoop] = useState<"top" | "bottom">("top");

  useEffect(() => {
    const interval = setInterval(() => {
      if (phase === "leftToRight") {
        // Left train moves through middle line (left to right)
        setLeftTrainPos((prev) => {
          if (prev.x >= 90) {
            // Reached right end, switch phase
            setTimeout(() => setPhase("rightToLeft"), 1000);
            return { x: 90, y: 50, moving: false };
          }
          return { x: prev.x + 0.3, y: 50, moving: true };
        });

        // Right train moves in loops
        setRightTrainPos((prev) => {
          const loopY = rightTrainLoop === "top" ? 25 : 75;
          const progress = ((prev.x - 90) % 80);
          
          if (progress <= -79) {
            // Completed one loop, switch to other loop
            setRightTrainLoop(current => current === "top" ? "bottom" : "top");
            return { x: 90, y: loopY, moving: true };
          }
          
          return { x: prev.x - 0.3, y: loopY, moving: true };
        });
      } else {
        // Right train moves through middle line (right to left)
        setRightTrainPos((prev) => {
          if (prev.x <= 10) {
            // Reached left end, switch phase
            setTimeout(() => setPhase("leftToRight"), 1000);
            return { x: 10, y: 50, moving: false };
          }
          return { x: prev.x - 0.3, y: 50, moving: true };
        });

        // Left train moves in loops
        setLeftTrainPos((prev) => {
          const loopY = leftTrainLoop === "top" ? 25 : 75;
          const progress = ((prev.x - 10) % 80);
          
          if (progress >= 79) {
            // Completed one loop, switch to other loop
            setLeftTrainLoop(current => current === "top" ? "bottom" : "top");
            return { x: 10, y: loopY, moving: true };
          }
          
          return { x: prev.x + 0.3, y: loopY, moving: true };
        });
      }
    }, 30);

    return () => clearInterval(interval);
  }, [phase, rightTrainLoop, leftTrainLoop]);

  return (
    <Card className="p-6 border-border/30 bg-card/60 backdrop-blur-sm h-full">
      <div className="space-y-4 h-full flex flex-col">
        <p className="text-xs text-muted-foreground uppercase tracking-widest">Train Movement Visualization</p>
        
        <div className="relative flex-1 min-h-[400px] bg-background/30 rounded-lg border border-border/20 overflow-hidden">
          {/* Track Lines using SVG */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {/* Top Loop Line */}
            <path
              d="M 10 25 Q 30 20, 50 20 Q 70 20, 90 25"
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="0.3"
              opacity="0.6"
            />
            
            {/* Middle Through Line */}
            <line
              x1="10"
              y1="50"
              x2="90"
              y2="50"
              stroke="hsl(var(--success))"
              strokeWidth="0.4"
              opacity="0.8"
            />
            
            {/* Bottom Loop Line */}
            <path
              d="M 10 75 Q 30 80, 50 80 Q 70 80, 90 75"
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="0.3"
              opacity="0.6"
            />
          </svg>

          {/* Left Train */}
          <div
            className="absolute transition-all duration-100 ease-linear"
            style={{
              left: `${leftTrainPos.x}%`,
              top: `${leftTrainPos.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div className={`flex items-center gap-1 px-2 py-1 rounded backdrop-blur-sm ${
              leftTrainPos.y === 50 
                ? "bg-success/40 border border-success shadow-lg shadow-success/50" 
                : "bg-primary/40 border border-primary shadow-lg shadow-primary/50"
            }`}>
              <Train className={`w-4 h-4 ${leftTrainPos.y === 50 ? "text-success" : "text-primary"} ${leftTrainPos.moving ? "animate-pulse" : ""}`} />
              <span className={`text-xs font-mono font-bold ${leftTrainPos.y === 50 ? "text-success" : "text-primary"}`}>A402</span>
            </div>
          </div>

          {/* Right Train */}
          <div
            className="absolute transition-all duration-100 ease-linear"
            style={{
              left: `${rightTrainPos.x}%`,
              top: `${rightTrainPos.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div className={`flex items-center gap-1 px-2 py-1 rounded backdrop-blur-sm ${
              rightTrainPos.y === 50 
                ? "bg-info/40 border border-info shadow-lg shadow-info/50" 
                : "bg-primary/40 border border-primary shadow-lg shadow-primary/50"
            }`}>
              <Train className={`w-4 h-4 ${rightTrainPos.y === 50 ? "text-info" : "text-primary"} ${rightTrainPos.moving ? "animate-pulse" : ""}`} />
              <span className={`text-xs font-mono font-bold ${rightTrainPos.y === 50 ? "text-info" : "text-primary"}`}>D201</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-xs">
          <div>
            <p className="text-muted-foreground uppercase mb-1">Train A402 Status</p>
            <p className="font-semibold text-success">
              {leftTrainPos.y === 50 ? "THROUGH LINE" : leftTrainLoop === "top" ? "TOP LOOP" : "BOTTOM LOOP"}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground uppercase mb-1">Train D201 Status</p>
            <p className="font-semibold text-info">
              {rightTrainPos.y === 50 ? "THROUGH LINE" : rightTrainLoop === "top" ? "TOP LOOP" : "BOTTOM LOOP"}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TrainAnimation;
