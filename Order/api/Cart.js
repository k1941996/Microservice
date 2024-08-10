import CartService from "#services/CartService.js";
import axios from "axios";

const getCartInfo = async ({ headers }) => {
  try {
    const cartInfo = await axios.get("http://localhost:4000/", { headers });
    return cartInfo;
  } catch (error) {
    console.log(error);
  }
};

export { getCartInfo };
