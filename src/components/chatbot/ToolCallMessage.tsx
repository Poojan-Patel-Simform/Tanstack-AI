import { ToolCallPart } from "@tanstack/ai";

type PropsType = {
  part: ToolCallPart;
};

const ToolCallMessage = ({ part }: PropsType) => {
  return (
    <div className="rounded-xl border bg-muted p-3">
      <div className="flex items-center gap-2">
        <span>🔧</span>
        <span className="font-medium">{part.name}</span>
      </div>

      <div className="mt-1 text-xs text-muted-foreground">
        {part.state === "complete" ? "Completed" : "Running..."}
      </div>
    </div>
  );
};

export default ToolCallMessage;
