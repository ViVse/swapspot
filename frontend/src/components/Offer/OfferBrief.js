import { Badge } from "flowbite-react";
import { useNavigate } from "react-router-dom";

const OfferBrief = (props) => {
  const navigate = useNavigate();
  let color;

  switch (props.offer.status) {
    case "Відправлено":
      color = "light";
      break;
    case "Прийнято":
      color = "green";
      break;
    case "Відхилено":
      color = "red";
      break;
    default:
      color = "blue";
      break;
  }

  const onClick = () => {
    navigate(`/offer/${props.offer._id}`);
  };

  return (
    <div
      className={`${props.className} hover:bg-gray-50 cursor-pointer flex rounded py-2 px-4 justify-between items-center border border-solid border-gray-100`}
      onClick={onClick}>
      <div>
        <h1>Id: {props.offer._id}</h1>
        <h3 className="font-medium text-lg">
          Бажані товари:{" "}
          {props.offer.to.products.map((prod) => prod.name).join(", ")}
        </h3>
      </div>
      <Badge color={color} className="w-fit mt-2">
        {props.offer.status}
      </Badge>
    </div>
  );
};

export default OfferBrief;
