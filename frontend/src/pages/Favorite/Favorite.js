import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../../components/Product/ProductCard";
import axios from "../../config/axios";
import { getCookie } from "../../utils/cookie";
import { changeFavorites } from "../../store/auth-actions";

const Favorite = () => {
  const favs = useSelector((state) => state.auth.user.favorites);
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);

  const getFavs = useCallback(
    () =>
      axios
        .get(`api/users/favorite`, {
          headers: {
            "x-auth-token": getCookie("x-auth-token"),
          },
        })
        .then((res) => {
          setProducts(res.data.favorites);
        }),
    []
  );

  useEffect(() => {
    getFavs();
  }, [getFavs, favs]);

  const likeHandler = (id) => {
    dispatch(changeFavorites(id));
  };

  return (
    <section className="container mx-auto px-4 mb-20">
      <div className="font-bold text-3xl">
        <h1>Бажане</h1>
        <div className={`mt-2.5 grid`}>
          {products.map((product) => (
            <ProductCard
              key={product._id}
              like={true}
              onLike={likeHandler}
              isFavorite={true}
              id={product._id}
              img={
                product.imgs?.length > 0
                  ? product.imgs[0].publicUrl
                  : "https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg"
              }
              name={product.name}
              tags={product.tags}
              location={product.location}
              createdAt={product.createdAt}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Favorite;
