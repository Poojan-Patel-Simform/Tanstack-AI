"use client";

import { fetchServerSentEvents, useChat } from "@tanstack/ai-react";
import { SubmitEvent, useMemo, useState } from "react";
import { useClientTools } from "./useClientTools";
import { ToolNameEnum } from "@/types/tool";
import { refreshAPIs } from "@/actions/refresh";

const useChatbot = () => {
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const tools = useClientTools();

  const {
    messages,
    sendMessage,
    isLoading: isMessagesLoading,
    addToolApprovalResponse,
  } = useChat({
    connection: fetchServerSentEvents("/api/chat"),
    tools,
    onFinish: (newMessage) => {
      const mutatingTools = new Set([
        ToolNameEnum.CREATE_TASK,
        ToolNameEnum.MOVE_TASK,
        ToolNameEnum.UPDATE_TASK,
        ToolNameEnum.DELETE_TASK,
      ]);
      const hasMutation = newMessage.parts.some(
        (part) => part.type === "tool-call" && mutatingTools.has(part.name),
      );

      if (hasMutation) {
        refreshAPIs("/");
      }
    },
    onError: (err) => {
      setError(err.message);
    },
  });

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canSend) return;

    setError(null);
    const text = input.trim();
    setInput("");

    try {
      await sendMessage(text);
    } catch {
      setError("Failed to send message. Please try again.");
    }
  };

  const isToolRunning = useMemo(() => {
    const lastMessage = messages.at(-1);
    if (lastMessage?.role !== "assistant") return false;

    return lastMessage.parts.some(
      (p) =>
        p.type === "tool-call" &&
        (p.state === "awaiting-input" || p.state === "input-streaming"),
    );
  }, [messages]);

  const isLoading = isMessagesLoading || isToolRunning;

  const canSend = input.trim().length > 0 && !isLoading;

  return {
    messages,
    isLoading,
    isMessagesLoading,
    isToolRunning,
    handleSubmit,
    isError: !!error,
    errorMessage: error,
    chatInput: input,
    setChatInput: setInput,
    canSend,
    addToolApprovalResponse,
  };
};

export default useChatbot;
