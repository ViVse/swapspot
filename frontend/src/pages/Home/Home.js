import { useEffect } from "react";
import ProductCard from "../../components/Product/ProductCard";

import styles from "./Home.module.scss";

const Home = () => {
  useEffect(() => {}, []);
  return (
    <section>
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
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </div>
    </section>
  );
};

export default Home;
