import Product from "#models/productModel.js";

export const deleteProduct = async (req, res) => {
  const product_id = req.params.product_id;
  try {
    await Product.findByIdAndDelete(product_id);
    res.status(200).send({message:'Product successfully deleted.'})
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({ message: "Something went wrong while deleting a product" });
  }
};
