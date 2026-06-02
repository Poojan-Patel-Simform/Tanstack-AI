import ChatBot from "@/components/chatbot/Chatbot";
import KanbanBoard from "@/components/kanban/KanbanBoard";

const Page = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <KanbanBoard />
      <ChatBot />
    </div>
  );
};

export default Page;
