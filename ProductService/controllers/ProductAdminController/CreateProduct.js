import Product from "#models/productModel.js";
import EventBus from "../../../shared/eventBus/EventBus.js";
import { PRODUCT_EVENTS } from "../../../shared/events/EventTypes.js";

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
    
    // Publish product created event
    await EventBus.publish(PRODUCT_EVENTS.PRODUCT_CREATED, {
      productId: newProductDetails._id,
      productData: newProductDetails,
      adminId: req.adminDetails.adminId
    });

    res.status(200).send({ message: "Product Created", newProductDetails });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Something went wrong while creating a product" });
  }
};
