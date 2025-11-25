import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import trackLayout from "@/assets/track-layout.png";
import { Train } from "lucide-react";

const TrainAnimation = () => {
  const [leftTrainPos, setLeftTrainPos] = useState({ x: 0, y: 50, path: "station" });
  const [rightTrainPos, setRightTrainPos] = useState({ x: 100, y: 50, path: "station" });
  const [animationPhase, setAnimationPhase] = useState<"leftToRight" | "rightToLeft">("leftToRight");
  const [loopCounter, setLoopCounter] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (animationPhase === "leftToRight") {
        // Left train moves through middle line (left to right)
        setLeftTrainPos((prev) => {
          if (prev.x >= 100) {
            // Reset and switch phase
            setAnimationPhase("rightToLeft");
            setLoopCounter(0);
            return { x: 100, y: 50, path: "station" };
          }
          return { x: prev.x + 0.5, y: 50, path: "middle" };
        });

        // Right train alternates between top and bottom loop
        setRightTrainPos((prev) => {
          // Determine which loop based on counter
          const isTopLoop = loopCounter % 2 === 0;
          const progress = (prev.x % 50) + 0.5;
          
          if (progress >= 50) {
            setLoopCounter((c) => c + 1);
          }
          
          return {
            x: 100,
            y: isTopLoop ? 20 + Math.sin((progress / 50) * Math.PI) * 10 : 80 + Math.sin((progress / 50) * Math.PI) * 10,
            path: isTopLoop ? "top-loop" : "bottom-loop"
          };
        });
      } else {
        // Right train moves through middle line (right to left)
        setRightTrainPos((prev) => {
          if (prev.x <= 0) {
            // Reset and switch phase
            setAnimationPhase("leftToRight");
            setLoopCounter(0);
            return { x: 0, y: 50, path: "station" };
          }
          return { x: prev.x - 0.5, y: 50, path: "middle" };
        });

        // Left train alternates between top and bottom loop
        setLeftTrainPos((prev) => {
          const isTopLoop = loopCounter % 2 === 0;
          const progress = (prev.x % 50) + 0.5;
          
          if (progress >= 50) {
            setLoopCounter((c) => c + 1);
          }
          
          return {
            x: 0,
            y: isTopLoop ? 20 + Math.sin((progress / 50) * Math.PI) * 10 : 80 + Math.sin((progress / 50) * Math.PI) * 10,
            path: isTopLoop ? "top-loop" : "bottom-loop"
          };
        });
      }
    }, 50);

    return () => clearInterval(interval);
  }, [animationPhase, loopCounter]);

  return (
    <Card className="p-6 border-border/30 bg-card/60 backdrop-blur-sm h-full">
      <div className="space-y-4 h-full flex flex-col">
        <p className="text-xs text-muted-foreground uppercase tracking-widest">Train Movement Visualization</p>
        
        <div className="relative flex-1 min-h-[400px] bg-background/30 rounded-lg border border-border/20 overflow-hidden">
          {/* Track Layout Image */}
          <img 
            src={trackLayout} 
            alt="Track Layout" 
            className="absolute inset-0 w-full h-full object-contain opacity-80"
          />
          
          {/* Left Train */}
          <div
            className="absolute transition-all duration-100 ease-linear"
            style={{
              left: `${leftTrainPos.x}%`,
              top: `${leftTrainPos.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div className={`flex items-center gap-1 px-2 py-1 rounded ${
              leftTrainPos.path === "middle" ? "bg-success/30 border border-success" : "bg-primary/30 border border-primary"
            }`}>
              <Train className="w-4 h-4 text-success animate-pulse" />
              <span className="text-xs font-mono text-success">A402</span>
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
            <div className={`flex items-center gap-1 px-2 py-1 rounded ${
              rightTrainPos.path === "middle" ? "bg-info/30 border border-info" : "bg-primary/30 border border-primary"
            }`}>
              <Train className="w-4 h-4 text-info animate-pulse" />
              <span className="text-xs font-mono text-info">D201</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-xs">
          <div>
            <p className="text-muted-foreground uppercase mb-1">Train A402</p>
            <p className="font-semibold text-success">{leftTrainPos.path.toUpperCase()}</p>
          </div>
          <div>
            <p className="text-muted-foreground uppercase mb-1">Train D201</p>
            <p className="font-semibold text-info">{rightTrainPos.path.toUpperCase()}</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TrainAnimation;
