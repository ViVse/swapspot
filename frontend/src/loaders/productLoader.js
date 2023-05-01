import axios from "../config/axios";

export async function loadAllProducts() {
  const res = await axios.get("api/products");
  return { products: res.data };
}
