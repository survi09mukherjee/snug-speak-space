import { Activity } from "lucide-react";

const Header = () => {
  return (
    <header className="border-b border-border/30 bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center gap-3">
          <Activity className="w-6 h-6 text-primary animate-pulse-glow" />
          <div>
            <h1 className="text-xl font-bold text-primary text-glow tracking-wider">
              CABIN SIDE CONTROL
            </h1>
            <p className="text-xs text-muted-foreground uppercase tracking-widest">
              Real-Time Transit Monitoring System
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
