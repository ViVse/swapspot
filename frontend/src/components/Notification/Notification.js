import { useNavigate } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";

const Notification = (props) => {
  const navigate = useNavigate();

  const clickHandler = () => {
    if (props.link) navigate(props.link);
  };

  const deleteHandler = (e) => {
    e.stopPropagation();
    props.onDelete();
  };

  return (
    <div
      className={`${props.className} ${
        props.link ? "hover:bg-gray-100 cursor-pointer" : ""
      } border border-solid border-gray-200 py-2 px-4 rounded flex justify-between items-center`}
      onClick={clickHandler}>
      <div>
        <h3 className="font-semibold">{props.title}</h3>
        <p>{props.text}</p>
      </div>
      <AiFillDelete
        className="scale-125 fill-red-600"
        onClick={deleteHandler}
      />
    </div>
  );
};

export default Notification;
