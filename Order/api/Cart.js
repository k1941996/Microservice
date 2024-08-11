import CartService from "#services/CartService.js";

const getCartInfo = async ({ headers }) => {
  try {
    return await CartService.get("/", {
      headers,
    });
  } catch (error) {
    console.log(error);
    return null;
  }
};

const emptyCart = async ({ headers }) => {
  try {
    return await CartService.delete("/deleteCart", {
      headers,
    });
  } catch (err) {
    console.log(err);
    return null;
  }
};

export { getCartInfo, emptyCart };
