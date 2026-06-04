import ChatBot from "@/components/chatbot/Chatbot";
import KanbanBoard from "@/components/kanban/KanbanBoard";

const Page = () => {
  return (
    <div>
      <KanbanBoard />
      <ChatBot />
    </div>
  );
};

export default Page;
