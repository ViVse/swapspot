import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Spinner from "../../components/UI/Spinner";
import { fetchChatData, sendMessage } from "../../store/chat-actions";
import { chatActions } from "../../store/chat-slice";
import Message from "../../components/Chat/Message";
import { Button } from "flowbite-react";
import useSocketIo from "../../hooks/use-socket.io";
import { getCookie } from "../../utils/cookie";
import axios from "../../config/axios";

const Chat = () => {
  const { convId } = useParams();
  const selectedConversationId = useSelector(
    (state) => state.chat.selectedConversation
  );
  const messages = useSelector((state) => state.chat.messages);
  const members = useSelector((state) => state.chat.members);
  const user = useSelector((state) => state.auth.user);
  const chatWith = members.find((u) => u._id !== user._id);
  const dispatch = useDispatch();

  const { socket } = useSocketIo();
  const inputRef = useRef();
  const chatRef = useRef();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!selectedConversationId) {
      setLoading(true);
      dispatch(fetchChatData(convId));
    } else {
      setLoading(false);
    }
  }, [convId, selectedConversationId, dispatch]);

  // read messages
  useEffect(() => {
    if (!selectedConversationId) return;
    axios
      .patch(`/api/chat/${selectedConversationId}/read`, null, {
        headers: {
          "x-auth-token": getCookie("x-auth-token"),
        },
      })
      .then((res) => {
        dispatch(chatActions.addUnread(res.data.modifiedCount * -1));
      });

    chatRef.current?.lastElementChild?.scrollIntoView();
  }, [messages, selectedConversationId, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(chatActions.exitChat());
    };
  }, [dispatch]);

  const sendMessageHandler = (e) => {
    e.preventDefault();
    dispatch(
      sendMessage(
        selectedConversationId,
        inputRef.current.value,
        chatWith._id,
        socket
      )
    );
    inputRef.current.value = "";
  };

  if (loading)
    return (
      <section className="container mx-auto px-4 mb-20 pt-14 flex flex-col items-center">
        <h1 className="font-bold text-xl mb-3">Завантаження...</h1>
        <Spinner />
      </section>
    );

  return (
    <section className="container mx-auto px-4 mb-20">
      <h1 className="font-bold text-4xl">
        Чат з <span className="text-green-400">{chatWith?.name}</span>
      </h1>
      <div
        ref={chatRef}
        className="overflow-y-scroll scroll"
        style={{ height: "55vh" }}>
        {messages.length === 0 && <p>Немає повідомлень</p>}
        {messages.map((m) => (
          <Message
            key={m._id}
            className="mt-5"
            message={m}
            user={members.find((u) => u._id === m.sender)}
            isMine={m.sender === user._id}
          />
        ))}
      </div>
      <div className="justify-center mt-5 flex">
        <input
          ref={inputRef}
          className="border border-solid border-teal-700 mr-3 rounded-lg py-1 px-2 w-1/2"
        />
        <Button
          onClick={sendMessageHandler}
          className="bg-teal-900 font-medium hover:bg-teal-700">
          Send
        </Button>
      </div>
    </section>
  );
};

export default Chat;
