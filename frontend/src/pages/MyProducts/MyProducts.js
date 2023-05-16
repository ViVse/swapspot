import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProductCard from "../../components/Product/ProductCard";
import axios from "../../config/axios";
import Pagination from "../../components/UI/Pagination";
import { useSearchParams } from "react-router-dom";
import { getCookie } from "../../utils/cookie";

import styles from "./MyProducts.module.scss";

const MyProducts = () => {
  const user = useSelector((state) => state.auth.user);
  const [products, setProducts] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [totalPages, setTotalPages] = useState(1);
  const curPage = searchParams.get("page") || 1;
  const limit = 2;

  useEffect(() => {
    axios
      .get(
        `api/products?page=${curPage - 1}&limit=${limit}&owner=${user._id}`,
        {
          headers: {
            "x-auth-token": getCookie("x-auth-token"),
          },
        }
      )
      .then((res) => {
        setProducts(res.data.products);
        setTotalPages(Math.ceil(res.data.total / limit));
      });
  }, [curPage, user._id]);

  const pageChangeHandler = (page) => {
    setSearchParams({ page });
  };

  const deleteHandler = (id) => {
    axios
      .delete(`api/products/${id}`)
      .then((res) =>
        setProducts((prev) =>
          prev.filter((product) => product._id !== res.data._id)
        )
      );
  };

  return (
    <section className="container mx-auto px-4 mb-20">
      <div className="font-bold text-3xl">
        <h1>Мої оголошення</h1>
        <div className={`mt-2.5 ${styles.grid}`}>
          {products.map((product) => (
            <ProductCard
              key={product._id}
              id={product._id}
              delete={true}
              onDelete={deleteHandler}
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

export default MyProducts;
