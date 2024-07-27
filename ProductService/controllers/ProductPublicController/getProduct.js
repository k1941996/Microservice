import Product from "#models/productModel.js";

export const getProduct = async (req, res) => {
  const product_id = req.params.product_id;
  try {
    const product = await Product.findById(product_id);
    if (product) {
      return res.status(200).send({ message: "Product fetched successfully", product });
    } else {
      return res.status(404).send({ message: "Product not found" });
    }
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).send({ message: "Something went wrong while fetching the product" });
  }
};
