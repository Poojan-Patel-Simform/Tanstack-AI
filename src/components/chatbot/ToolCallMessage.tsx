import { ToolCallPart } from "@tanstack/ai";

type PropsType = {
  part: ToolCallPart;
};

const ToolCallMessage = ({ part }: PropsType) => {
  const getToolCallMessage = () => {
    switch (part.state) {
      case "approval-requested":
        return "Awaiting approval...";
      case "approval-responded":
        return "Completed";
      case "complete":
        return "Completed";
      default:
        return "Running...";
    }
  };

  return (
    <div className="rounded-xl border bg-muted p-3">
      <div className="flex items-center gap-2">
        <span>🔧</span>
        <span className="font-medium">{part.name}</span>
      </div>

      <div className="mt-1 text-xs text-muted-foreground">
        {getToolCallMessage()}
      </div>
    </div>
  );
};

export default ToolCallMessage;
