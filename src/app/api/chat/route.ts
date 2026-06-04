import { toggleThemeDef } from "@/tools/client/toggleTheme";
import { createTaskTool } from "@/tools/server/createTaskTool";
import { deleteTaskTool } from "@/tools/server/deleteTaskTool";
import { moveTaskTool } from "@/tools/server/moveTaskTool";
import { updateTaskTool } from "@/tools/server/updateTaskTool";
import { chat, toServerSentEventsResponse } from "@tanstack/ai";
import { groqText } from "@tanstack/ai-groq";

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
      adapter: groqText("llama-3.3-70b-versatile"),
      messages: body.messages,
      tools: [
        createTaskTool,
        moveTaskTool,
        updateTaskTool,
        deleteTaskTool,
        toggleThemeDef,
      ],
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
