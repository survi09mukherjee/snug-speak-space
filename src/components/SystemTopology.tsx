import { Card } from "@/components/ui/card";
import { CircuitBoard } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface SystemNode {
  id: string;
  name: string;
  status: "ONLINE" | "WARNING" | "OFFLINE";
  power: number;
}

const SystemTopology = () => {
  const nodes: SystemNode[] = [
    { id: "1", name: "Power Core", status: "ONLINE", power: 98 },
    { id: "2", name: "Communications", status: "ONLINE", power: 87 },
    { id: "3", name: "HVAC System", status: "ONLINE", power: 92 },
    { id: "4", name: "Sensor Array", status: "WARNING", power: 73 },
    { id: "5", name: "Control Unit", status: "ONLINE", power: 95 },
    { id: "6", name: "Security", status: "ONLINE", power: 100 },
  ];

  const getStatusColor = (status: SystemNode["status"]) => {
    switch (status) {
      case "ONLINE":
        return "bg-success";
      case "WARNING":
        return "bg-warning";
      case "OFFLINE":
        return "bg-destructive";
    }
  };

  const onlineCount = nodes.filter(n => n.status === "ONLINE").length;

  return (
    <Card className="p-6 border-border/30 bg-card/80 backdrop-blur-sm">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <CircuitBoard className="w-4 h-4 text-primary" />
          <h3 className="text-xs text-muted-foreground uppercase tracking-widest">
            Circuit Board - System Topology
          </h3>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          {nodes.map((node) => (
            <div
              key={node.id}
              className="p-4 border border-border/30 rounded bg-muted/20 hover:border-primary/50 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-2">
                <p className="text-sm font-semibold text-foreground">{node.name}</p>
                <div className={`w-2 h-2 rounded-full ${getStatusColor(node.status)} animate-pulse-glow`} />
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Status:</span>
                  <span className={
                    node.status === "ONLINE" 
                      ? "text-success" 
                      : node.status === "WARNING"
                      ? "text-warning"
                      : "text-destructive"
                  }>
                    {node.status}
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Power:</span>
                  <span className="text-foreground font-semibold">{node.power}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-border/30 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground uppercase">Node Map</span>
            <Badge variant="outline" className="border-primary/50 text-primary">
              v2.3.1
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground uppercase">SYS: {onlineCount}/6</span>
            <div className="flex items-center gap-3 text-xs">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-success" />
                <span className="text-muted-foreground">Online</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-warning" />
                <span className="text-muted-foreground">Warning</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-destructive" />
                <span className="text-muted-foreground">Offline</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default SystemTopology;
