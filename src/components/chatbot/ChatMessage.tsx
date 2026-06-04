import { UIMessage } from "@tanstack/ai-react";
import { Bot, User } from "lucide-react";
import TextMessage from "./TextMessage";
import ToolCallMessage from "./ToolCallMessage";
import ToolResultMessage from "./ToolResultMessage";

type PropsType = {
  message: UIMessage<any, unknown>;
};

const ChatMessage = ({ message }: PropsType) => {
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
            switch (part.type) {
              case "text":
                return <TextMessage key={part.content + idx} part={part} />;

              case "tool-call":
                return <ToolCallMessage key={part.id + idx} part={part} />;

              case "tool-result":
                return (
                  <ToolResultMessage key={part.toolCallId + idx} part={part} />
                );

              default:
                return null;
            }
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
