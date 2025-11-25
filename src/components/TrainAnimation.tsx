import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Train } from "lucide-react";

type Phase = "A-crossing" | "B-crossing";
type LoopState = "idle" | "top-loop" | "bottom-loop";

const TrainAnimation = () => {
  const [phase, setPhase] = useState<Phase>("A-crossing");
  const [trainAProgress, setTrainAProgress] = useState(0);
  const [trainBProgress, setTrainBProgress] = useState(0);
  const [trainALoop, setTrainALoop] = useState<LoopState>("idle");
  const [trainBLoop, setTrainBLoop] = useState<LoopState>("idle");
  const [trainBLoopCount, setTrainBLoopCount] = useState(0);
  const [trainALoopCount, setTrainALoopCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (phase === "A-crossing") {
        // Train A moves left to right on middle line
        setTrainAProgress((prev) => {
          if (prev >= 100) {
            // A finished crossing, switch phase
            setPhase("B-crossing");
            setTrainBLoopCount(0);
            return 100;
          }
          return prev + 0.4;
        });

        // Train B does loops
        setTrainBProgress((prev) => {
          const newProgress = prev + 0.8;
          
          if (newProgress >= 100) {
            // Completed one loop
            if (trainBLoopCount === 0) {
              // First loop done, start second loop
              setTrainBLoop("bottom-loop");
              setTrainBLoopCount(1);
              return 0;
            } else {
              // Both loops done
              setTrainBLoop("idle");
              return 0;
            }
          }
          
          if (trainBLoopCount === 0 && trainBLoop === "idle") {
            setTrainBLoop("top-loop");
          }
          
          return newProgress;
        });
      } else {
        // Train B moves right to left on middle line
        setTrainBProgress((prev) => {
          if (prev >= 100) {
            // B finished crossing, switch phase
            setPhase("A-crossing");
            setTrainALoopCount(0);
            return 100;
          }
          return prev + 0.4;
        });

        // Train A does loops
        setTrainAProgress((prev) => {
          const newProgress = prev + 0.8;
          
          if (newProgress >= 100) {
            // Completed one loop
            if (trainALoopCount === 0) {
              // First loop done, start second loop
              setTrainALoop("bottom-loop");
              setTrainALoopCount(1);
              return 0;
            } else {
              // Both loops done
              setTrainALoop("idle");
              return 0;
            }
          }
          
          if (trainALoopCount === 0 && trainALoop === "idle") {
            setTrainALoop("top-loop");
          }
          
          return newProgress;
        });
      }
    }, 20);

    return () => clearInterval(interval);
  }, [phase, trainBLoop, trainALoop, trainBLoopCount, trainALoopCount]);

  // Calculate positions
  const getTrainAPosition = () => {
    if (phase === "A-crossing") {
      // Moving on middle line left to right
      return { x: 10 + (trainAProgress * 0.8), y: 50 };
    } else {
      // Doing loops
      if (trainALoop === "top-loop") {
        const loopX = 10 + (trainAProgress * 0.8);
        const loopY = 25 + Math.sin((trainAProgress / 100) * Math.PI) * 5;
        return { x: loopX, y: loopY };
      } else if (trainALoop === "bottom-loop") {
        const loopX = 10 + (trainAProgress * 0.8);
        const loopY = 75 - Math.sin((trainAProgress / 100) * Math.PI) * 5;
        return { x: loopX, y: loopY };
      }
      return { x: 10, y: 50 };
    }
  };

  const getTrainBPosition = () => {
    if (phase === "B-crossing") {
      // Moving on middle line right to left
      return { x: 90 - (trainBProgress * 0.8), y: 50 };
    } else {
      // Doing loops
      if (trainBLoop === "top-loop") {
        const loopX = 90 - (trainBProgress * 0.8);
        const loopY = 25 + Math.sin((trainBProgress / 100) * Math.PI) * 5;
        return { x: loopX, y: loopY };
      } else if (trainBLoop === "bottom-loop") {
        const loopX = 90 - (trainBProgress * 0.8);
        const loopY = 75 - Math.sin((trainBProgress / 100) * Math.PI) * 5;
        return { x: loopX, y: loopY };
      }
      return { x: 90, y: 50 };
    }
  };

  const trainAPos = getTrainAPosition();
  const trainBPos = getTrainBPosition();

  const trainAOnMiddle = phase === "A-crossing";
  const trainBOnMiddle = phase === "B-crossing";

  return (
    <Card className="p-6 border-border/30 bg-card/60 backdrop-blur-sm">
      <div className="space-y-4">
        <p className="text-xs text-muted-foreground uppercase tracking-widest">Train Movement Visualization</p>
        
        <div className="relative w-full h-[300px] bg-background/30 rounded-lg border border-border/20 overflow-hidden">
          {/* Closed Circuit Track Lines */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
            {/* Left vertical connectors */}
            <line x1="10" y1="25" x2="10" y2="50" stroke="hsl(var(--primary))" strokeWidth="0.3" opacity="0.6" />
            <line x1="10" y1="50" x2="10" y2="75" stroke="hsl(var(--primary))" strokeWidth="0.3" opacity="0.6" />
            
            {/* Right vertical connectors */}
            <line x1="90" y1="25" x2="90" y2="50" stroke="hsl(var(--primary))" strokeWidth="0.3" opacity="0.6" />
            <line x1="90" y1="50" x2="90" y2="75" stroke="hsl(var(--primary))" strokeWidth="0.3" opacity="0.6" />
            
            {/* Top Loop Line */}
            <path
              d="M 10 25 Q 30 18, 50 18 Q 70 18, 90 25"
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="0.4"
              opacity="0.7"
            />
            
            {/* Middle Through Line */}
            <line
              x1="10" y1="50" x2="90" y2="50"
              stroke="hsl(var(--success))"
              strokeWidth="0.5"
              opacity="0.9"
            />
            
            {/* Bottom Loop Line */}
            <path
              d="M 10 75 Q 30 82, 50 82 Q 70 82, 90 75"
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="0.4"
              opacity="0.7"
            />
          </svg>

          {/* Train A (Left side - Green) */}
          <div
            className="absolute transition-all duration-75 ease-linear"
            style={{
              left: `${trainAPos.x}%`,
              top: `${trainAPos.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div className={`flex items-center gap-1 px-2 py-1 rounded backdrop-blur-sm ${
              trainAOnMiddle
                ? "bg-success/50 border border-success shadow-lg shadow-success/50" 
                : "bg-primary/50 border border-primary shadow-md shadow-primary/40"
            }`}>
              <Train className={`w-4 h-4 ${trainAOnMiddle ? "text-success" : "text-primary"} animate-pulse`} />
              <span className={`text-xs font-mono font-bold ${trainAOnMiddle ? "text-success" : "text-primary"}`}>A402</span>
            </div>
          </div>

          {/* Train B (Right side - Blue) */}
          <div
            className="absolute transition-all duration-75 ease-linear"
            style={{
              left: `${trainBPos.x}%`,
              top: `${trainBPos.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div className={`flex items-center gap-1 px-2 py-1 rounded backdrop-blur-sm ${
              trainBOnMiddle
                ? "bg-info/50 border border-info shadow-lg shadow-info/50" 
                : "bg-primary/50 border border-primary shadow-md shadow-primary/40"
            }`}>
              <Train className={`w-4 h-4 ${trainBOnMiddle ? "text-info" : "text-primary"} animate-pulse`} />
              <span className={`text-xs font-mono font-bold ${trainBOnMiddle ? "text-info" : "text-primary"}`}>D201</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-xs">
          <div className="space-y-1">
            <p className="text-muted-foreground uppercase">Train A402 Status</p>
            <p className="font-semibold text-success">
              {trainAOnMiddle ? "THROUGH LINE (L→R)" : trainALoop === "top-loop" ? "TOP LOOP" : trainALoop === "bottom-loop" ? "BOTTOM LOOP" : "STANDBY"}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-muted-foreground uppercase">Train D201 Status</p>
            <p className="font-semibold text-info">
              {trainBOnMiddle ? "THROUGH LINE (R→L)" : trainBLoop === "top-loop" ? "TOP LOOP" : trainBLoop === "bottom-loop" ? "BOTTOM LOOP" : "STANDBY"}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TrainAnimation;
