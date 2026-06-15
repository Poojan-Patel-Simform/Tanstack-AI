import { ToolResultPart } from "@tanstack/ai";

type PropsType = {
  part: ToolResultPart;
};

const ToolResultMessage = ({ part }: PropsType) => {
  let result = part.content;

  try {
    if (typeof part.content === "string") {
      result = JSON.parse(part.content);
    }
  } catch {}

  return (
    <div className="rounded-xl border border-accent/20 bg-accent/10 p-3 text-sm dark:border-accent/30 dark:bg-accent/20">
      <div className="font-medium">✅ Tool Result</div>

      <pre className="mt-2 overflow-x-auto whitespace-pre-wrap text-xs">
        {JSON.stringify(result, null, 2)}
      </pre>
    </div>
  );
};

export default ToolResultMessage;
