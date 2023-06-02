import { transformDateTime } from "../../utils/timeAgo";

const Message = (props) => {
  return (
    <div
      className={`${props.className} flex items-center ${
        props.isMine ? "flex-row-reverse" : "flex-row"
      }`}>
      <img
        className="w-10 h-10 rounded-full object-cover"
        src={props.user.avatar.publicUrl}
        alt={props.user.name}
      />
      <div
        className={`${
          props.isMine ? "bg-green-300" : "bg-gray-200"
        } px-5 py-2 rounded-3xl mx-3`}>
        <p>{props.message.text}</p>
        <p
          className={`text-xs font-semibold ${
            props.isMine ? "text-right" : "text-left"
          }`}>
          {transformDateTime(props.message.createdAt)}
        </p>
      </div>
    </div>
  );
};

export default Message;
