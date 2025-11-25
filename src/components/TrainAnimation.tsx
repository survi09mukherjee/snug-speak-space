import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";

const TrainAnimation = () => {
  const [currentPhase, setCurrentPhase] = useState<string>("Initializing...");
  const mainLineRef = useRef<SVGPathElement>(null);
  const topLoopRef = useRef<SVGPathElement>(null);
  const bottomLoopRef = useRef<SVGPathElement>(null);
  const trainARef = useRef<HTMLDivElement>(null);
  const trainBRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<boolean>(false);

  // Helper: Get point on SVG path
  const getPointOnPath = (path: SVGPathElement, progress: number) => {
    const pathLength = path.getTotalLength();
    const point = path.getPointAtLength(progress * pathLength);
    return { x: point.x, y: point.y };
  };

  // Helper: Position train element
  const positionTrain = (train: HTMLDivElement, x: number, y: number) => {
    const xPercent = (x / 1000) * 100;
    const yPercent = (y / 600) * 100;
    train.style.left = `${xPercent}%`;
    train.style.top = `${yPercent}%`;
  };

  // Easing function
  const easeInOutCubic = (t: number): number => {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  };

  // Animate train along path
  const animateTrain = (
    train: HTMLDivElement,
    path: SVGPathElement,
    duration: number,
    startProgress: number = 0,
    endProgress: number = 1,
    delay: number = 0
  ): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const startTime = performance.now();

        const animate = (currentTime: number) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const easedProgress = easeInOutCubic(progress);

          // Interpolate between start and end progress
          const pathProgress = startProgress + (endProgress - startProgress) * easedProgress;

          const point = getPointOnPath(path, pathProgress);
          positionTrain(train, point.x, point.y);

          if (progress < 1) {
            requestAnimationFrame(animate);
          } else {
            resolve();
          }
        };

        requestAnimationFrame(animate);
      }, delay);
    });
  };

  // Phase 1: Train A on main line (10% -> 90%), Train B on loops
  const runPhase1 = async () => {
    if (!trainARef.current || !trainBRef.current || !mainLineRef.current || !topLoopRef.current || !bottomLoopRef.current) return;

    setCurrentPhase("Phase 1: Train A → Main Line | Train B → Loops");

    const trainAPromise = animateTrain(
      trainARef.current,
      mainLineRef.current,
      10000, // 10 seconds
      0.1,   // Start at 10%
      0.9    // End at 90%
    );

    const trainBPromise = (async () => {
      if (!trainBRef.current || !topLoopRef.current || !bottomLoopRef.current) return;
      // Top loop (5 seconds)
      await animateTrain(trainBRef.current, topLoopRef.current, 5000, 0, 1);
      // Bottom loop (5 seconds)
      await animateTrain(trainBRef.current, bottomLoopRef.current, 5000, 0, 1);
    })();

    await Promise.all([trainAPromise, trainBPromise]);
  };

  // Phase 2: Train B on main line (90% -> 10%), Train A on loops
  const runPhase2 = async () => {
    if (!trainARef.current || !trainBRef.current || !mainLineRef.current || !topLoopRef.current || !bottomLoopRef.current) return;

    setCurrentPhase("Phase 2: Train B → Main Line | Train A → Loops");

    const trainBPromise = animateTrain(
      trainBRef.current,
      mainLineRef.current,
      10000, // 10 seconds
      0.9,   // Start at 90%
      0.1    // End at 10%
    );

    const trainAPromise = (async () => {
      if (!trainARef.current || !topLoopRef.current || !bottomLoopRef.current) return;
      // Top loop (5 seconds)
      await animateTrain(trainARef.current, topLoopRef.current, 5000, 0, 1);
      // Bottom loop (5 seconds)
      await animateTrain(trainARef.current, bottomLoopRef.current, 5000, 0, 1);
    })();

    await Promise.all([trainBPromise, trainAPromise]);
  };

  // Initialize positions
  const initializePositions = () => {
    if (!trainARef.current || !trainBRef.current || !mainLineRef.current) return;

    // Train A starts at 10% of main line
    const pointA = getPointOnPath(mainLineRef.current, 0.1);
    positionTrain(trainARef.current, pointA.x, pointA.y);

    // Train B starts at 90% of main line
    const pointB = getPointOnPath(mainLineRef.current, 0.9);
    positionTrain(trainBRef.current, pointB.x, pointB.y);
  };

  // Main animation loop
  const startAnimation = async () => {
    if (animationRef.current) return;
    animationRef.current = true;

    // Initial idle for 1 second
    setCurrentPhase("Ready to start...");
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Continuous loop
    while (animationRef.current) {
      await runPhase1();
      await runPhase2();
    }
  };

  useEffect(() => {
    initializePositions();
    startAnimation();

    return () => {
      animationRef.current = false;
    };
  }, []);

  return (
    <Card className="p-6 border-border/30 bg-card/60 backdrop-blur-sm">
      <div className="space-y-4">
        <h3 className="text-xs text-muted-foreground uppercase tracking-widest">
          Train Movement Animation
        </h3>

        <div className="relative w-full h-[400px] bg-background/50 rounded-lg overflow-hidden border border-border/20">
          <svg
            className="w-full h-full"
            viewBox="0 0 1000 600"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Main straight line (middle) */}
            <path
              ref={mainLineRef}
              id="mainLine"
              d="M 50 300 L 950 300"
              className="fill-none stroke-[4] stroke-primary"
              style={{
                filter: "drop-shadow(0 0 8px hsl(var(--glow-primary) / 0.6))",
              }}
            />

            {/* Top loop line (organic bulging curve) */}
            <path
              ref={topLoopRef}
              id="topLoop"
              d="M 50 300 Q 250 100, 500 100 Q 750 100, 950 300"
              className="fill-none stroke-[3] stroke-accent"
              strokeDasharray="10 5"
              style={{
                filter: "drop-shadow(0 0 6px hsl(var(--glow-accent) / 0.5))",
              }}
            />

            {/* Bottom loop line (mirrored) */}
            <path
              ref={bottomLoopRef}
              id="bottomLoop"
              d="M 50 300 Q 250 500, 500 500 Q 750 500, 950 300"
              className="fill-none stroke-[3] stroke-accent"
              strokeDasharray="10 5"
              style={{
                filter: "drop-shadow(0 0 6px hsl(var(--glow-accent) / 0.5))",
              }}
            />
          </svg>

          {/* Train A */}
          <div
            ref={trainARef}
            className="absolute flex flex-col items-center gap-1 -translate-x-1/2 -translate-y-1/2 z-10 transition-transform duration-100"
          >
            <div className="text-3xl filter drop-shadow-lg">🚂</div>
            <div className="text-[10px] font-semibold px-2 py-1 bg-primary/20 backdrop-blur-sm rounded border border-primary/30 text-primary whitespace-nowrap">
              Train A
            </div>
          </div>

          {/* Train B */}
          <div
            ref={trainBRef}
            className="absolute flex flex-col items-center gap-1 -translate-x-1/2 -translate-y-1/2 z-10 transition-transform duration-100"
          >
            <div className="text-3xl filter drop-shadow-lg">🚆</div>
            <div className="text-[10px] font-semibold px-2 py-1 bg-accent/20 backdrop-blur-sm rounded border border-accent/30 text-accent whitespace-nowrap">
              Train B
            </div>
          </div>
        </div>

        {/* Phase Indicator */}
        <div className="text-center">
          <div className="inline-block text-sm font-semibold px-4 py-2 bg-primary/10 backdrop-blur-sm rounded-lg border border-primary/20 text-primary">
            {currentPhase}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TrainAnimation;
