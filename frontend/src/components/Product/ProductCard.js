import { Card, Badge, Button } from "flowbite-react";
import styles from "./ProductCard.module.scss";
import { AiFillHeart, AiOutlineHeart, AiFillDelete } from "react-icons/ai";

const ProductCard = (props) => {
  const isFavorite = true;

  return (
    <Card className={`w-64 ${styles.ProductCard} relative`}>
      {props.like &&
        (isFavorite ? (
          <AiFillHeart className="absolute cursor-pointer top-5 fill-red-700 w-7 h-7 right-5" />
        ) : (
          <AiOutlineHeart className="absolute cursor-pointer top-5 fill-red-700 w-7 h-7 right-5" />
        ))}
      {props.delete && (
        <AiFillDelete className="absolute cursor-pointer top-5 fill-red-700 w-7 h-7 right-5" />
      )}
      <img
        src="https://www.apple.com/v/apple-watch-se/k/images/overview/hero/hero__w8w7dclctnmi_large.jpg"
        alt="name"
      />
      <h1 className="text-xl font-semibold">
        Apple Watch Series 7 GPS, Aluminium Case
      </h1>
      <div className="flex mt-2">
        <Badge color="success" className="mr-1">
          Нове
        </Badge>
        <Badge color="success">2020</Badge>
      </div>
      <div className="flex justify-between items-end mt-5">
        <Button className="bg-teal-900 font-medium hover:bg-teal-700">
          Більше
        </Button>
        <span className="text-xs text-gray-500">Чернівці, 20:23</span>
      </div>
    </Card>
  );
};

export default ProductCard;
