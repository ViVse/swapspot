import { Card, Badge, Button } from "flowbite-react";
import styles from "./ProductCard.module.scss";
import { AiFillHeart, AiOutlineHeart, AiFillDelete } from "react-icons/ai";
import timeAgo from "../../utils/timeAgo";
import { Link } from "react-router-dom";

const ProductCard = (props) => {
  const { id, name, img, tags, location, createdAt, isFavorite } = props;

  return (
    <Card className={`w-64 ${styles.ProductCard} relative`}>
      {props.like &&
        (isFavorite ? (
          <AiFillHeart
            className="absolute cursor-pointer top-5 fill-red-700 w-7 h-7 right-5"
            onClick={() => props.onLike(props.id)}
          />
        ) : (
          <AiOutlineHeart
            className="absolute cursor-pointer top-5 fill-red-700 w-7 h-7 right-5"
            onClick={() => props.onLike(props.id)}
          />
        ))}
      {props.delete && (
        <AiFillDelete
          className="absolute cursor-pointer top-5 fill-red-700 w-7 h-7 right-5"
          onClick={() => props.onDelete(props.id)}
        />
      )}
      <img className="h-52 w-full object-cover" src={img} alt="name" />
      <div className="px-7 pb-5 pt-3">
        <h1 className="text-xl font-semibold">{name}</h1>
        <div className="flex mt-2">
          {tags.map((tag, ind) => (
            <Badge key={ind} color="success" className="mr-1">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="flex justify-between items-end mt-5">
          <Link to={`/product/${id}`}>
            <Button className="bg-teal-900 font-medium hover:bg-teal-700">
              Більше
            </Button>
          </Link>
          <span className="text-xs text-gray-500">
            {location}, {timeAgo(createdAt)}
          </span>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
