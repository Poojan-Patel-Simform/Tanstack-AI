"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { fetchServerSentEvents, useChat } from "@tanstack/ai-react";
import { Bot, SendHorizontal, Sparkles, User } from "lucide-react";
import { SubmitEvent, useEffect, useMemo, useRef, useState } from "react";
import TypingDots from "./TypingDots";
import { Textarea } from "../ui/textarea";

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");

  const endRef = useRef<HTMLDivElement | null>(null);

  const { messages, sendMessage, isLoading } = useChat({
    connection: fetchServerSentEvents("/api/chat"),
  });

  useEffect(() => {
    endRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, isLoading]);

  const canSend = useMemo(
    () => input.trim().length > 0 && !isLoading,
    [input, isLoading],
  );

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!canSend) return;

    sendMessage(input.trim());
    setInput("");
  };

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

          <div className="flex-1 overflow-y-auto">
            <div className="mx-auto flex max-w-4xl flex-col gap-6 px-6 py-8">
              {messages.length === 0 && (
                <div className="mt-24 flex flex-col items-center text-center">
                  <div className="mb-6 flex size-20 items-center justify-center rounded-3xl bg-primary/10">
                    <Sparkles className="size-10 text-primary" />
                  </div>

                  <h2 className="text-2xl font-semibold">
                    How can I help today?
                  </h2>

                  <p className="mt-2 max-w-md text-muted-foreground">
                    Ask questions, generate content, debug code, or brainstorm
                    ideas.
                  </p>
                </div>
              )}

              {messages.map((message) => {
                const isAssistant = message.role === "assistant";

                return (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${
                      isAssistant ? "justify-start" : "justify-end"
                    }`}
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
                        {message.parts.map((part, idx) => {
                          if (part.type === "thinking") {
                            return (
                              <div
                                key={idx + part.content}
                                className="rounded-xl border bg-muted p-3 text-sm text-muted-foreground"
                              >
                                💭 {part.content}
                              </div>
                            );
                          }

                          if (part.type === "text") {
                            return (
                              <div
                                key={idx + part.content}
                                className="whitespace-pre-wrap leading-7"
                              >
                                {part.content}
                              </div>
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
              })}

              {isLoading && (
                <div className="flex gap-3">
                  <div className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                    <Bot className="size-4" />
                  </div>

                  <div className="rounded-3xl border bg-card">
                    <TypingDots />
                  </div>
                </div>
              )}

              <div ref={endRef} />
            </div>
          </div>

          {/* INPUT */}

          <div className="sticky bottom-0 border-t bg-background">
            <form onSubmit={handleSubmit} className="mx-auto max-w-4xl p-5">
              <div className="flex items-end gap-3 rounded-3xl border bg-card p-3 shadow-sm">
                <Textarea
                  rows={1}
                  value={input}
                  disabled={isLoading}
                  placeholder="Message AI Assistant..."
                  onChange={(e) => setInput(e.target.value)}
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
}
