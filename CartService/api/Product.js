import productService from "#services/ProductService.js";

export const getProductInfo = async (product_id) => {
  try {
    const product = await productService.get(`/id/${product_id}`);
    return product?.product;
  } catch (err) {
    console.log("Error ", err.response.data.message);
    return null;
  }
};
