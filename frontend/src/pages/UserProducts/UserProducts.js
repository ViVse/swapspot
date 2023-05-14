import { useEffect, useState } from "react";
import ProductCard from "../../components/Product/ProductCard";
import axios from "../../config/axios";
import Pagination from "../../components/UI/Pagination";
import { useParams, useSearchParams } from "react-router-dom";
import { getCookie } from "../../utils/cookie";

import styles from "./UserProducts.module.scss";

const UserProducts = () => {
  const { id } = useParams();
  const [userName, setUsername] = useState();
  const [products, setProducts] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [totalPages, setTotalPages] = useState(1);
  const curPage = searchParams.get("page") || 1;
  const limit = 2;

  useEffect(() => {
    axios
      .get(`api/products?page=${curPage - 1}&limit=${limit}&owner=${id}`, {
        headers: {
          "x-auth-token": getCookie("x-auth-token"),
        },
      })
      .then((res) => {
        setProducts(res.data.products);
        setTotalPages(Math.ceil(res.data.total / limit));
      });
  }, [curPage, id]);

  useEffect(() => {
    axios
      .get(`api/users/${id}`, {
        headers: {
          "x-auth-token": getCookie("x-auth-token"),
        },
      })
      .then((res) => {
        setUsername(res.data.name);
      });
  });

  const pageChangeHandler = (page) => {
    setSearchParams({ page });
  };

  return (
    <section className="container mx-auto px-4 mb-20 mt-1">
      <div className="font-bold text-3xl">
        <h1>
          Оголошення користувача{" "}
          <span className="text-green-400">{userName}</span>
        </h1>
        <div className={`mt-5 ${styles.grid}`}>
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
            className={styles.pagination}
            currentPage={curPage}
            totalPages={totalPages}
            onPageChange={pageChangeHandler}
          />
        )}
      </div>
    </section>
  );
};

export default UserProducts;
