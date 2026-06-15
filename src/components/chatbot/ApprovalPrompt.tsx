import type { ToolCallPart } from "@tanstack/ai-client";

type PropsType = {
  part: ToolCallPart;
  onApprove: () => void;
  onDeny: () => void;
};

const ApprovalPrompt = ({ part, onApprove, onDeny }: PropsType) => {
  const args = part.input ?? JSON.parse(part.arguments);

  return (
    <div className="border border-yellow-500 rounded-lg p-4 bg-yellow-50 dark:bg-yellow-900/10 dark:border-yellow-400">
      <div className="font-semibold mb-2 text-yellow-800 dark:text-yellow-300">
        🔒 Approval Required: {part.name}
      </div>
      <div className="text-sm text-gray-600 dark:text-gray-300 mb-4">
        <pre className="bg-gray-100 dark:bg-slate-800 p-2 rounded text-xs overflow-x-auto text-slate-800 dark:text-slate-200">
          {JSON.stringify(args, null, 2)}
        </pre>
      </div>
      <div className="flex gap-2">
        <button
          onClick={onApprove}
          className="px-4 py-2 bg-green-600 dark:bg-green-500 text-white rounded-lg"
        >
          ✓ Approve
        </button>
        <button
          onClick={onDeny}
          className="px-4 py-2 bg-red-600 dark:bg-red-500 text-white rounded-lg"
        >
          ✗ Deny
        </button>
      </div>
    </div>
  );
};

export default ApprovalPrompt;
