import { useLoaderData } from "react-router-dom";
import ProductCard from "../../components/Product/ProductCard";

import styles from "./Home.module.scss";

const Home = () => {
  const { products } = useLoaderData();

  return (
    <section className="container mx-auto px-4 mb-20">
      <div
        className={`h-80 overflow-hidden w-full bg-gradient-to-r from-green-400 to-teal-900 flex items-center ${styles.Baner}`}>
        <h1 className="text-9xl font-black text-white whitespace-nowrap">
          <span className="mr-36">Перетворюй непотріб на скарби!</span>
          <span>Перетворюй непотріб на скарби!</span>
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
                  : "https://www.apple.com/v/apple-watch-se/k/images/overview/hero/hero__w8w7dclctnmi_large.jpg"
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

export default Home;
