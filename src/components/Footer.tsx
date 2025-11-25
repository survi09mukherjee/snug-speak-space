import { useEffect, useState } from "react";

const Footer = () => {
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <footer className="border-t border-border/30 bg-card/50 backdrop-blur-sm mt-auto">
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
          <span>
            System Status: <span className="text-success">OPERATIONAL</span>
          </span>
          <span className="text-border">•</span>
          <span>
            Last Update: {formatTime(lastUpdate)}
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
