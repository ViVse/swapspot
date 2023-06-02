import { useEffect, useState } from "react";
import ProductCard from "../../components/Product/ProductCard";
import axios from "../../config/axios";
import Pagination from "../../components/UI/Pagination";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";

import styles from "./Home.module.scss";

const Home = () => {
  const user = useSelector((state) => state.auth.user);
  const [products, setProducts] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [totalPages, setTotalPages] = useState(1);
  const curPage = searchParams.get("page") || 1;
  const limit = 4;

  useEffect(() => {
    axios
      .get(
        `api/products?page=${curPage - 1}&limit=${limit}&sortBy=createdAt_desc${
          user ? `&notOwner=${user._id}` : ""
        }`
      )
      .then((res) => {
        setProducts(res.data.products);
        setTotalPages(Math.ceil(res.data.total / limit));
      });
  }, [curPage, user]);

  const pageChangeHandler = (page) => {
    setSearchParams({ page });
  };

  return (
    <section className="container mx-auto px-4 mb-20">
      <div
        className={`h-80 overflow-hidden w-full bg-gradient-to-r from-green-400 to-teal-900 flex items-center ${styles.Baner}`}>
        <h1 className="text-9xl font-black text-white whitespace-nowrap">
          <span className="mr-36">Перетворюй непотріб на скарби!</span>
          <span className="mr-36">Перетворюй непотріб на скарби!</span>
        </h1>
      </div>
      <div className="mt-10 font-bold text-3xl">
        <h1>Нові оголошення</h1>
        <div className={`mt-2.5 ${styles.grid}`}>
          {products.map((product) => (
            <ProductCard
              key={product._id}
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
        {totalPages > 1 && (
          <Pagination
            currentPage={curPage}
            totalPages={totalPages}
            onPageChange={pageChangeHandler}
          />
        )}
      </div>
    </section>
  );
};

export default Home;
