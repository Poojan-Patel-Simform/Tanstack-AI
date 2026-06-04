"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Bot, SendHorizontal, Sparkles } from "lucide-react";
import { useState } from "react";
import { Textarea } from "../ui/textarea";
import ChatMessageList from "./ChatMessageList";
import useChatbot from "@/hooks/useChatbot";

const ChatBot = () => {
  const [open, setOpen] = useState(false);
  const {
    messages,
    isLoading,
    isMessagesLoading,
    isToolRunning,
    isError,
    errorMessage,
    handleSubmit,
    chatInput,
    setChatInput,
    canSend,
  } = useChatbot();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button size="lg" className="fixed right-6 bottom-6 shadow-lg">
          <Sparkles className="size-4" />
          AI Assistant
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="w-full! max-w-4xl!">
        <SheetTitle className="sr-only">AI Assistant</SheetTitle>

        <div className="flex h-screen flex-col bg-background">
          {/* HEADER */}

          <div className="sticky top-0 z-20 border-b bg-background/90 backdrop-blur">
            <div className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <Bot className="size-5" />
                </div>

                <div>
                  <h2 className="font-semibold">AI Assistant</h2>

                  <p className="text-xs text-muted-foreground">Ask anything</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`h-2.5 w-2.5 rounded-full ${
                    isLoading ? "bg-chart-2 animate-pulse" : "bg-chart-4"
                  }`}
                />

                <span className="text-xs text-muted-foreground">
                  {isLoading ? "Thinking" : "Ready"}
                </span>
              </div>
            </div>
          </div>

          {/* MESSAGES */}

          <ChatMessageList
            messages={messages}
            isLoading={isLoading}
            isMessagesLoading={isMessagesLoading}
            isToolRunning={isToolRunning}
            isError={isError}
            errorMessage={errorMessage}
          />

          {/* INPUT */}

          <div className="sticky bottom-0 border-t bg-background">
            <form onSubmit={handleSubmit} className="mx-auto max-w-4xl p-5">
              <div className="flex items-end gap-3 rounded-3xl border bg-card p-3 shadow-sm">
                <Textarea
                  rows={1}
                  value={chatInput}
                  disabled={isLoading}
                  placeholder="Message AI Assistant..."
                  onChange={(e) => setChatInput(e.target.value)}
                  className="border-0 focus-visible:ring-0 max-h-40 flex-1 resize-none bg-transparent px-2 py-2 outline-none placeholder:text-muted-foreground"
                />

                <Button
                  size="icon"
                  type="submit"
                  disabled={!canSend}
                  className="size-11 rounded-2xl"
                >
                  <SendHorizontal className="size-4" />
                </Button>
              </div>

              <p className="mt-3 text-center text-xs text-muted-foreground">
                AI can make mistakes. Verify important information.
              </p>
            </form>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ChatBot;
