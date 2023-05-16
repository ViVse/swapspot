import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { changeFavorites } from "../../store/auth-actions.js";
import axios from "../../config/axios";
import Spinner from "../../components/UI/Spinner";
import { Badge, Button } from "flowbite-react";
import { Gallery } from "../../components/UI/Gallery/Gallery";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import OfferForm from "../../components/Offer/OfferFrom.js";

const Product = (props) => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [product, setProduct] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isFavorite, setIsFavorite] = useState(
    user?.favorites.includes(id) || false
  );
  const [showOfferModal, setShowOfferModal] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`/api/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch(() => setProduct(null))
      .finally(() => setIsLoading(false));
  }, [id]);

  const likeHandler = () => {
    dispatch(changeFavorites(id));
    setIsFavorite((prev) => !prev);
  };

  const showModalHandler = () => {
    setShowOfferModal(true);
  };

  const hideModalHandler = () => {
    setShowOfferModal(false);
  };

  if (isLoading) {
    return (
      <section className="container mx-auto px-4 mb-20 pt-14 flex flex-col items-center">
        <h1 className="font-bold text-xl mb-3">Завантаження...</h1>
        <Spinner />
      </section>
    );
  }

  if (!product) {
    return (
      <section className="container mx-auto px-4 mb-20 flex flex-col items-center">
        <h1 className="font-bold text-2xl mt-5 mb-3">
          Не можемо знайти ваш продукт
        </h1>
        <Link to="/">
          <Button color="success">На головну</Button>
        </Link>
      </section>
    );
  }

  return (
    <>
      {showModalHandler && user && (
        <OfferForm
          show={showOfferModal}
          onClose={hideModalHandler}
          item={product}
          ownerId={product.owner._id}
        />
      )}
      <section className="container mx-auto px-4 mb-20">
        <div className="flex">
          <Gallery
            className="w-1/2"
            imgs={product.imgs.map((img) => img.publicUrl)}
          />
          <div className="w-1/2 ml-5 mt-3">
            <h1 className="font-bold text-4xl">{product.name}</h1>
            <div className="flex flex-wrap">
              {product.tags.map((tag) => (
                <Badge key={tag} color="success" className="mr-3 mt-4">
                  <span className="text-sm font-bold px-3">{tag}</span>
                </Badge>
              ))}
            </div>
            <div className="flex mt-6 items-center">
              <img
                className="w-16 h-16 rounded-full object-cover mr-2"
                src={product.owner.avatar.publicUrl}
                alt={product.owner.name}
              />
              <div>
                <h3 className="text-lg font-medium">{product.owner.name}</h3>
                <span className="text-base text-gray-500">
                  На SwapSpot з{" "}
                  {new Date(product.owner.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
            <div className="mt-2">
              <Link
                className="underline text-gray-500 font-medium"
                to={`/products/user/${product.owner._id}`}>
                Усі оголошення користувача
              </Link>
            </div>
            {user && product.owner._id !== user._id && (
              <div className="flex items-center mt-5">
                {isFavorite ? (
                  <AiFillHeart
                    className="fill-red-500 w-8 h-8 mr-4 cursor-pointer"
                    onClick={likeHandler}
                  />
                ) : (
                  <AiOutlineHeart
                    className="fill-red-500 w-8 h-8 mr-4 cursor-pointer"
                    onClick={likeHandler}
                  />
                )}
                <Button className="!border !border-solid !border-teal-900 bg-transparent !text-teal-900 !font-semibold hover:bg-green-300 mr-4">
                  Повідомлення
                </Button>
                <Button
                  className="bg-teal-900 font-medium hover:bg-teal-700 mr-4"
                  onClick={showModalHandler}>
                  Запропонувати обмін
                </Button>
              </div>
            )}
            <div className="mt-5">
              <h3 className="inline font-semibold text-xl mr-2">
                Місцезнаходження
              </h3>
              <span className="text-lg">{product.location}</span>
            </div>
          </div>
        </div>
        <div>
          <h2 className="font-semibold text-2xl">Опис</h2>
          <p className="mt-2">{product.description}</p>
          <p className="mt-2 text-sm text-gray-500">
            Опубліковано: {new Date(product.createdAt).toLocaleDateString()}{" "}
            {new Date(product.createdAt).toLocaleTimeString()}
          </p>
        </div>
      </section>
    </>
  );
};

export default Product;
