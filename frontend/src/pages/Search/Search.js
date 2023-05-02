import { useEffect, useState } from "react";
import ProductCard from "../../components/Product/ProductCard";
import axios from "../../config/axios";
import Pagination from "../../components/UI/Pagination";
import { useSearchParams } from "react-router-dom";
import { CATEGORIES } from "../../const/categories";
import cities from "../../const/cities";
import updateSearchParams from "../../utils/updateSearchParams";

const Search = () => {
  const [products, setProducts] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [totalPages, setTotalPages] = useState(1);
  const curPage = searchParams.get("page") || 1;
  const limit = 2;
  const name = searchParams.get("name");
  const category = searchParams.get("category");
  const location = searchParams.get("location");
  const sortBy = searchParams.get("sortBy") || "createdAt_desc";

  useEffect(() => {
    let params = `?page=${curPage}&sortBy=${sortBy}`;
    if (name) {
      params += `&name=${name}`;
    }
    if (category && category !== "Всі") {
      params += `&category=${category}`;
    }
    if (location && location !== "Всі") {
      params += `&location=${location}`;
    }
    axios
      .get(`api/products?page=${curPage - 1}&limit=${limit}${params}`)
      .then((res) => {
        setProducts(res.data.products);
        setTotalPages(Math.ceil(res.data.total / limit));
      });
  }, [curPage, name, category, location, sortBy]);

  const pageChangeHandler = (page) => {
    setSearchParams(updateSearchParams(searchParams, { page }));
  };

  const onCategorySelect = (e) => {
    setSearchParams(
      updateSearchParams(searchParams, { category: e.target.value })
    );
  };

  const onLocationSelect = (e) => {
    setSearchParams(
      updateSearchParams(searchParams, { location: e.target.value })
    );
  };

  const onSortBySelect = (e) => {
    setSearchParams(
      updateSearchParams(searchParams, { sortBy: e.target.value })
    );
  };

  return (
    <section className="container mx-auto px-4 mb-20">
      <div className="mt-5">
        <h1 className="font-bold text-3xl">Пошук</h1>
        <h2 className="font-semibold text-2xl">Фільтри та сортування</h2>
        <div className="flex">
          <div className="flex flex-col mt-2 text-xl text-gray-500 mr-5">
            <label>Категорія</label>
            <select
              className="rounded-lg"
              value={category || "Всі"}
              onChange={onCategorySelect}>
              <option>Всі</option>
              {CATEGORIES.getCategoriesArr().map((cat) => (
                <option key={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col mt-2 text-xl text-gray-500 mr-5">
            <label>Місто</label>
            <select
              className="rounded-lg"
              value={location || "Всі"}
              onChange={onLocationSelect}>
              <option>Всі</option>
              {cities.map((city) => (
                <option key={city}>{city}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col mt-2 text-xl text-gray-500 mr-5">
            <label>Сортувати за</label>
            <select
              className="rounded-lg"
              value={sortBy}
              onChange={onSortBySelect}>
              <option value="createdAt_desc">Найновіші</option>
              <option value="createdAt_asc">Найстаріші</option>
            </select>
          </div>
        </div>
        <div className={`mt-7 grid`}>
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

export default Search;
