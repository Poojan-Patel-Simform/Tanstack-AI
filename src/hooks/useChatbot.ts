import { fetchServerSentEvents, useChat } from "@tanstack/ai-react";
import { SubmitEvent, useEffect, useMemo, useRef, useState } from "react";

const useChatbot = () => {
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);

  const {
    messages,
    sendMessage,
    isLoading: isMessagesLoading,
  } = useChat({
    connection: fetchServerSentEvents("/api/chat"),
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
  };
};

export default useChatbot;
