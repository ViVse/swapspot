import { useEffect, useState } from "react";
import Spinner from "../../components/UI/Spinner";
import axios from "../../config/axios";
import { getCookie } from "../../utils/cookie";
import OfferBrief from "../../components/Offer/OfferBrief";

const MyOffers = () => {
  const [toOffers, setToOffers] = useState([]);
  const [fromOffers, setFromOffers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    axios
      .get("/api/offers", {
        headers: {
          "x-auth-token": getCookie("x-auth-token"),
        },
      })
      .then((res) => {
        setToOffers(res.data.to);
        setFromOffers(res.data.from);
      })
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return (
      <section className="container mx-auto px-4 mb-20 pt-14 flex flex-col items-center">
        <h1 className="font-bold text-xl mb-3">Завантаження...</h1>
        <Spinner />
      </section>
    );
  }

  return (
    <section className="container mx-auto px-4 mb-20 mt-3">
      <h1 className="text-2xl font-bold text-teal-900">Вхідні пропозиції</h1>
      <div className="mt-1">
        {toOffers.map((offer) => (
          <OfferBrief key={offer._id} className="mt-2" offer={offer} />
        ))}
        {toOffers.length === 0 && <p>Немає пропозицій</p>}
      </div>
      <h1 className="text-2xl font-bold text-teal-900 mt-3">
        Відправлені пропозиції
      </h1>
      <div className="mt-1">
        {fromOffers.map((offer) => (
          <OfferBrief key={offer._id} className="mt-2" offer={offer} />
        ))}
        {fromOffers.length === 0 && <p>Немає пропозицій</p>}
      </div>
    </section>
  );
};

export default MyOffers;
