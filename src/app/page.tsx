import ChatBot from "@/components/chatbot/Chatbot";
import KanbanBoard from "@/components/kanban/KanbanBoard";
import { getTasks } from "./actions/task";

const Page = async () => {
  const response = await getTasks();

  return (
    <div>
      <KanbanBoard data={response.data} />
      <ChatBot />
    </div>
  );
};

export default Page;
