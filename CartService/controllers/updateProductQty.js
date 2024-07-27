import { getProductInfo } from "#api/Product.js";
import Cart from "#models/CartModel.js";

const updateCartProductQuantity = async (cart, quantity, totalPrice, productIndexInCart) => {
  cart.productInfo[productIndexInCart].quantity = quantity;
  return await Cart.findByIdAndUpdate(
    cart.id,
    {
      $set: {
        productInfo: cart.productInfo,
        updatedDate: Date.now(),
        totalPrice,
      },
    },
    { new: true }
  );
};

export const updateProductQty = async (req, res) => {
  const { product_id, quantity } = req.body;
  const userId = req.headers.accountid;
  let cart = await Cart.findOne({ userId });
  const product = await getProductInfo(product_id);
  try {
    if (!product) {
      return res.status(400).send({ message: "Product does not exists." });
    }
    if (!cart) {
      return res.status(400).send({ message: "Please add some products to your cart." });
    }

    const productIndexInCart = cart.productInfo.findIndex((e) => e.product_id.toString() === product_id);
    if (productIndexInCart === -1) {
      return res.status(400).send({ message: "Product does not exists in cart." });
    }
    const currentPrice = cart.totalPrice;
    const priceAfterRemovingProduct = currentPrice - cart.productInfo[productIndexInCart].quantity * product.price;
    const updatedTotalPrice = priceAfterRemovingProduct + quantity * product.price;

    const updatedCart = await updateCartProductQuantity(cart, quantity, updatedTotalPrice, productIndexInCart);
    res.status(200).send({ message: "Product quantity updated", cart: updatedCart });
  } catch (error) {
    console.log("Error", error);
    return res.status(500).send({ message: "Internal server error" });
  }
};
