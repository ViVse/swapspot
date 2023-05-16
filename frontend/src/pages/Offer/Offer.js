import { useCallback, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button, Badge } from "flowbite-react";
import Spinner from "../../components/UI/Spinner";
import axios from "../../config/axios";
import { getCookie } from "../../utils/cookie";
import ProductBrief from "../../components/Product/ProductBrief";
import UserBrief from "../../components/User/UserBrief";
import { useSelector } from "react-redux";

const Offer = () => {
  const currentUserId = useSelector((state) => state.auth.user._id);
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [offer, setOffer] = useState();

  const getOffer = useCallback(() => {
    setIsLoading(true);
    axios
      .get(`/api/offers/${id}`, {
        headers: {
          "x-auth-token": getCookie("x-auth-token"),
        },
      })
      .then((res) => setOffer(res.data))
      .finally(() => setIsLoading(false));
  }, [id]);

  useEffect(() => {
    getOffer();
  }, [getOffer]);

  const changeStatusHandler = (status) => {
    axios
      .patch(
        `/api/offers/${offer._id}`,
        {
          status,
        },
        {
          headers: {
            "x-auth-token": getCookie("x-auth-token"),
          },
        }
      )
      .then(() => getOffer());
  };

  if (isLoading) {
    return (
      <section className="container mx-auto px-4 mb-20 pt-14 flex flex-col items-center">
        <h1 className="font-bold text-xl mb-3">Завантаження...</h1>
        <Spinner />
      </section>
    );
  }

  if (!offer) {
    return (
      <section className="container mx-auto px-4 mb-20 flex flex-col items-center">
        <h1 className="font-bold text-2xl mt-5 mb-3">
          Не можемо знайти цю пропозицію
        </h1>
        <Link to="/">
          <Button color="success">На головну</Button>
        </Link>
      </section>
    );
  }

  let color;

  switch (offer.status) {
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

  return (
    <section className="container mx-auto px-4 mb-20">
      <h1 className="font-bold text-3xl mt-1">
        Пропозиція <span className="text-green-400">{id}</span>
      </h1>
      <Badge color={color} className="w-fit mt-3 !text-base">
        {offer.status}
      </Badge>
      <h3 className="text-green-400 mt-4 font-bold text-2xl mb-2">
        Бажані товари
      </h3>
      <div className="flex flex-wrap">
        {offer.to.products.map((prod) => (
          <Link key={prod._id} to={`/product/${prod._id}`}>
            <ProductBrief
              className="w-fit pr-3 mr-2 mt-1 cursor-pointer"
              product={prod}
            />
          </Link>
        ))}
      </div>
      <h4 className="font-semibold text-lg mt-3">Власник</h4>
      <UserBrief className="mt-1" user={offer.to.user} />

      <h3 className="text-green-400 mt-4 font-bold text-2xl mb-2">
        Запропоновані товари
      </h3>
      <div className="flex flex-wrap">
        {offer.from.products.map((prod) => (
          <Link key={prod._id} to={`/product/${prod._id}`}>
            <ProductBrief
              className="w-fit pr-3 mr-2 mt-1 cursor-pointer"
              key={prod._id}
              product={prod}
            />
          </Link>
        ))}
      </div>
      <h4 className="font-semibold text-lg mt-3">Власник</h4>
      <UserBrief className="mt-1" user={offer.from.user} />
      {offer.to.user._id === currentUserId &&
        offer.status === "Відправлено" && (
          <div className="flex mt-5">
            <Button
              color="success"
              className="mr-2"
              onClick={changeStatusHandler.bind(null, "Прийнято")}>
              Прийняти
            </Button>
            <Button
              color="failure"
              onClick={changeStatusHandler.bind(null, "Відхилено")}>
              Відхилити
            </Button>
          </div>
        )}
    </section>
  );
};

export default Offer;
