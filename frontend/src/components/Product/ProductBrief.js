import { Badge } from "flowbite-react";
import { GrClose } from "react-icons/gr";

const ProductBrief = (props) => {
  return (
    <div
      className={`${props.className} bg-white flex rounded shadow-md border border-solid border-gray-100 overflow-hidden`}
      onClick={props.onClick ? props.onClick : () => {}}>
      <img
        className="w-16 object-cover mr-5"
        src={
          props.product.imgs.length > 0
            ? props.product.imgs[0].publicUrl
            : "https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg"
        }
        alt={props.product.name}
      />
      <div className="py-2 pb-3 grow">
        <h1 className="font-bold text-lg">{props.product.name}</h1>
        <div className="flex">
          {props.product.tags.map((tag) => (
            <Badge key={tag} color="success" className="mr-3 mt-2">
              <span className="text-sm font-bold px-3">{tag}</span>
            </Badge>
          ))}
        </div>
      </div>
      {props.onClose && (
        <GrClose
          className="self-center cursor-pointer justify-self-end mr-5 stroke-red-700"
          onClick={props.onClose}
        />
      )}
    </div>
  );
};

export default ProductBrief;
