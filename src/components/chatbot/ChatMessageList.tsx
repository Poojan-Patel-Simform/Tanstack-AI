import { Bot, Sparkles } from "lucide-react";
import TypingDots from "./TypingDots";
import { useEffect, useRef } from "react";
import { UIMessage } from "@tanstack/ai-react";
import ChatMessage from "./ChatMessage";

type PropsType = {
  messages: UIMessage<any, unknown>[];
  isMessagesLoading: boolean;
  isError: boolean;
  errorMessage: string | null;
  addToolApprovalResponse: (response: {
    id: string;
    approved: boolean;
  }) => Promise<void>;
};

const ChatMessageList = ({
  messages,
  isMessagesLoading,
  isError,
  errorMessage,
  addToolApprovalResponse,
}: PropsType) => {
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, isMessagesLoading]);

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="mx-auto flex max-w-4xl flex-col gap-6 px-6 py-8">
        {messages.length === 0 && (
          <div className="mt-24 flex flex-col items-center text-center">
            <div className="mb-6 flex size-20 items-center justify-center rounded-3xl bg-primary/10">
              <Sparkles className="size-10 text-primary" />
            </div>

            <h2 className="text-2xl font-semibold">How can I help today?</h2>

            <p className="mt-2 max-w-md text-muted-foreground">
              Ask questions, generate content, debug code, or brainstorm ideas.
            </p>
          </div>
        )}

        {messages.map((message) => {
          return (
            <ChatMessage
              key={message.id}
              message={message}
              addToolApprovalResponse={addToolApprovalResponse}
            />
          );
        })}

        {isMessagesLoading && (
          <div className="flex gap-3">
            <div className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Bot className="size-4" />
            </div>

            <div className="rounded-3xl border bg-card">
              <TypingDots />
            </div>
          </div>
        )}

        {isError && (
          <div className="flex gap-3">
            <div className="mt-1 flex size-9 shrink-0 items-center justify-center rounded-xl bg-destructive text-destructive-foreground">
              <Bot className="size-4" />
            </div>

            <div className="max-w-[80%] rounded-3xl border border-destructive/30 bg-destructive/10 px-5 py-4 text-destructive">
              {errorMessage || "Something went wrong."}
            </div>
          </div>
        )}

        <div ref={endRef} />
      </div>
    </div>
  );
};

export default ChatMessageList;
