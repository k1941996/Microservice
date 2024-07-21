import Product from "#models/productModel.js";

export const updateProduct = async (req, res) => {
  const productDetails = req.body;
  const product_id = req.params.product_id;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      product_id,
      productDetails,
      { new: true }
    ).lean();
    res.status(200).send({ message: "Product Updated", updatedProduct });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Something went wrong while updating a product" });
  }
};
