import { UIMessage } from "@tanstack/ai-react";
import { Bot, User } from "lucide-react";
import TextMessage from "./TextMessage";
import ToolCallMessage from "./ToolCallMessage";
import ToolResultMessage from "./ToolResultMessage";
import ApprovalPrompt from "./ApprovalPrompt";

type PropsType = {
  message: UIMessage<any, unknown>;
  addToolApprovalResponse: (response: {
    id: string;
    approved: boolean;
  }) => Promise<void>;
};

const ChatMessage = ({ message, addToolApprovalResponse }: PropsType) => {
  const isAssistant = message.role === "assistant";

  const filteredMessageList = message.parts.filter(
    (part) => part.type !== "thinking",
  );

  if (filteredMessageList.length === 0) {
    return null;
  }

  return (
    <div
      key={message.id}
      className={`flex gap-3 ${isAssistant ? "justify-start" : "justify-end"}`}
    >
      {isAssistant && (
        <div className="mt-1 flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
          <Bot className="size-4" />
        </div>
      )}

      <div
        className={`max-w-[80%] rounded-3xl px-5 py-4 shadow-sm ${
          isAssistant
            ? "border bg-card text-card-foreground"
            : "bg-primary text-primary-foreground"
        }`}
      >
        <div className="space-y-3">
          {filteredMessageList.map((part, idx) => {
            if (part.type === "text") {
              return <TextMessage key={part.content + idx} part={part} />;
            }

            if (part.type === "tool-call") {
              const approval =
                part.state === "approval-requested" ? part.approval : undefined;

              return (
                <div key={part.id + idx} className="space-y-2">
                  <ToolCallMessage part={part} />

                  {approval && (
                    <ApprovalPrompt
                      part={part}
                      onApprove={() =>
                        addToolApprovalResponse({
                          id: approval.id,
                          approved: true,
                        })
                      }
                      onDeny={() =>
                        addToolApprovalResponse({
                          id: approval.id,
                          approved: false,
                        })
                      }
                    />
                  )}
                </div>
              );
            }

            if (part.type === "tool-result") {
              return (
                <ToolResultMessage key={part.toolCallId + idx} part={part} />
              );
            }

            return null;
          })}
        </div>
      </div>

      {!isAssistant && (
        <div className="mt-1 flex size-9 shrink-0 items-center justify-center rounded-xl bg-muted">
          <User className="size-4" />
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
