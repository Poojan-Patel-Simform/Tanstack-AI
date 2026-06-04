import { createTask } from "@/tools/server/createTaskTool";
import { deleteTask } from "@/tools/server/deleteTaskTool";
import { moveTask } from "@/tools/server/moveTaskTool";
import { updateTask } from "@/tools/server/updateTaskTool";
import { chat, toServerSentEventsResponse } from "@tanstack/ai";
import { geminiText } from "@tanstack/ai-gemini";

export const POST = async (request: Request) => {
  // Check for API key
  if (!process.env.GROQ_API_KEY) {
    return new Response(
      JSON.stringify({
        error: "GROQ_API_KEY not configured",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  const body = await request.json();

  try {
    const stream = chat({
      adapter: geminiText("gemini-2.5-flash"),
      messages: body.messages,
      tools: [createTask, moveTask, updateTask, deleteTask],
    });

    // Convert stream to HTTP response
    return toServerSentEventsResponse(stream);
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "An error occurred",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
};
