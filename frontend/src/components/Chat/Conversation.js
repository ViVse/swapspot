import { useSelector } from "react-redux";
import { BsCheckAll, BsCheck } from "react-icons/bs";
import { Link } from "react-router-dom";
import { transformDateTime } from "../../utils/timeAgo";

const Conversation = (props) => {
  const user = useSelector((state) => state.auth.user);
  const chatWith = props.conversation.members.find((u) => u._id !== user._id);
  const lastMessage = props.conversation.messages[0];
  const newCount = props.conversation.new;
  const time = props.conversation.updatedAt;

  return (
    <Link to={`/chat/${chatWith._id}`}>
      <div
        className={`${props.className} max-w-screen border-b py-2 border-solid border-gray-500 flex items-center`}>
        <img
          className="h-16 w-16 object-cover rounded-full mr-4"
          src={chatWith.avatar.publicUrl}
          alt={chatWith.name}
        />
        <div>
          <h1 className="font-semibold font-lg w-fit">{chatWith.name}</h1>
          {lastMessage && (
            <>
              <p className="truncate max-w-sm">
                {lastMessage.sender === user._id && (
                  <span className="text-green-400 mr-1">Ви:</span>
                )}
                {lastMessage.text}
              </p>
              <div></div>
            </>
          )}
          {!lastMessage && <p>Немає повідомлень</p>}
        </div>
        <div
          className={`grow h-full gridDefault ${
            newCount > 0 && lastMessage ? "grid-rows-2" : ""
          } mr-3`}>
          {newCount > 0 && (
            <div className="ml-2 justify-self-end self-center w-fit self-end px-2 py-0.5 font-bold text-sm flex justify-center items-center bg-green-400 rounded-full text-white">
              <span>{newCount}</span>
            </div>
          )}
          {lastMessage && (
            <div
              className={`"mt-3 justify-self-end flex row-2 ${
                newCount > 0 ? "self-end" : "self-center"
              }`}>
              {lastMessage.sender === user._id && (
                <span>
                  {lastMessage.read ? (
                    <BsCheckAll className="fill-green-400" />
                  ) : (
                    <BsCheck className="fill-gray-500" />
                  )}
                </span>
              )}
              <span className="text-xs font-medium text-gray-700">
                {transformDateTime(time)}
              </span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default Conversation;
