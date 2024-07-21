import Product from "#models/productModel.js";

export const createProduct = async (req, res) => {
  const { name, description, price, stock, category } = req.body;
  try {
    const newProduct = new Product({
      name,
      description,
      price,
      stock,
      category,
      createdBy: req.adminDetails.adminId,
    });

    const newProductDetails = await newProduct.save();
    res.status(200).send({ message: "Product Created", newProductDetails });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Something went wrong while creating a product" });
  }
};
