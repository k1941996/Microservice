import Cart from "#models/CartModel.js";
import { getProductInfo } from "#api/Product.js";


const addNewProductToCart = async (cart, product_id, quantity, totalPrice) => {
  const updatedProductInfo = [...cart.productInfo, { product_id, quantity: quantity }];

  return await Cart.findByIdAndUpdate(
    cart.id,
    {
      $set: {
        productInfo: updatedProductInfo,
        updatedDate: Date.now(),
        totalPrice,
      },
    },
    { new: true }
  );
};

const updateCartProductQuantity = async (cart, productIndexInCart, quantity, totalPrice) => {
  cart.productInfo[productIndexInCart].quantity += quantity || 1;

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

const CreateNewCart = async (userId, totalPrice, product_id, quantity) => {
  const newCart = new Cart({
    userId,
    totalPrice,
    createdDate: Date.now(),
    updatedDate: Date.now(),
    productInfo: [{ product_id, quantity }],
  });
  return await newCart.save();
};

export const addProductToCart = async (req, res) => {
  const { product_id, quantity } = req.body;
  const userId = req.headers.accountid;
  const product = await getProductInfo(product_id);
  try {
    if (!product) {
      return res.status(400).send({ message: "Product does not exists." });
    }
    if (product?.stock <= 0) {
      return res.status(410).send({ message: "Product out of stock" });
    }
    if (quantity > product.stock) {
      return res.status(410).send({ message: "Product stock is less than the quantity " });
    }
    let cart = await Cart.findOne({ userId });
    const totalPrice = (cart?.totalPrice || 0) + product.price * quantity;

    if (!cart) {
      const cartDetails = await CreateNewCart(userId, totalPrice, product_id, quantity);
      return res.status(200).send({ message: "Successfully added to cart", cart: cartDetails });
    }
    const productIndexInCart = cart.productInfo.findIndex((e) => e.product_id.toString() === product_id);

    if (productIndexInCart !== -1) {
      const updatedCart = await updateCartProductQuantity(cart, productIndexInCart, quantity, totalPrice);
      return res.status(200).send({ message: "cart Updated", cart: updatedCart });
    }
    const updatedCart = await addNewProductToCart(cart, product_id, quantity, totalPrice);
    return res.status(200).send({ message: "cart Updated", cart: updatedCart });
  } catch (error) {
    console.log("Error", error);
    return res.status(500).send({ message: "Internal server error" });
  }
};
