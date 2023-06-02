import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchConversations } from "../../store/chat-actions";
import Conversation from "../../components/Chat/Conversation";

const AllChats = () => {
  const dispatch = useDispatch();
  const conversations = useSelector((state) => state.chat.conversations);

  useEffect(() => {
    dispatch(fetchConversations());
  }, [dispatch]);

  return (
    <section className="container mx-auto px-4 mb-20">
      <h1 className="text-3xl font-bold mt-2 mb-4">Чати</h1>
      <div>
        <div>
          {conversations.map((conv) => (
            <Conversation
              key={conv._id}
              className="mt-2 hover:bg-green-100 p-1"
              conversation={conv}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AllChats;
