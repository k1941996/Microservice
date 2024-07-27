import Cart from "#models/CartModel.js";
import { getProductInfo } from "#api/Product.js";

export const deleteProduct = async (req, res) => {
  const { product_id } = req.body;
  const accountid = req.headers.accountid;

  const product = await getProductInfo(product_id);
  if (!product) {
    return res.status(404).send({ message: "Product not found" });
  }

  const cart = await Cart.findOne({ userId: accountid });
  const productIndex = cart.productInfo.findIndex((e) => e.product_id.toString() === product_id);

  if (productIndex === -1) {
    return res.status(404).send({ message: "Product not found in cart" });
  }
  const totalPrice = cart.totalPrice - cart.productInfo[productIndex].quantity * product.price;
  const currentCartProducts = cart.productInfo;
  currentCartProducts.splice(productIndex, 1);
  const newCart = await Cart.findByIdAndUpdate(
    cart.id,
    {
      $set: {
        productInfo: currentCartProducts,
        totalPrice,
        updatedDate: Date.now(),
      },
    },
    { new: true }
  );
  res.status(200).send({ message: "Cart updated.", cart: newCart });
};
