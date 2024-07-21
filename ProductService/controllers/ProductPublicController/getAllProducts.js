import Product from "#models/productModel.js";

export const getAllProducts = async (_, res) => {
  try {
    const productList = await Product.find({});
    return res
      .status(200)
      .send({ message: "Product list fetched successfully", productList });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Something went wrong while creating a product" });
  }
};
