import Cart from "#models/CartModel.js";
import Product from "#models/ProductModel.js"; // Local product model
import EventBus from "../../shared/eventBus/EventBus.js";
import { CART_EVENTS } from "../../shared/events/EventTypes.js";

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
  
  try {
    // Use local product data instead of calling product service
    const product = await Product.findOne({ productId: product_id });
    
    if (!product) {
      return res.status(400).send({ message: "Product does not exist in local cache." });
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
      
      // Publish cart created event
      await EventBus.publish(CART_EVENTS.CART_CREATED, {
        cartId: cartDetails._id,
        userId,
        totalPrice
      });
      
      // Publish product added to cart event
      await EventBus.publish(CART_EVENTS.PRODUCT_ADDED_TO_CART, {
        cartId: cartDetails._id,
        productId: product_id,
        quantity,
        userId
      });
      
      return res.status(200).send({ message: "Successfully added to cart", cart: cartDetails });
    }
    
    const productIndexInCart = cart.productInfo.findIndex((e) => e.product_id.toString() === product_id);

    if (productIndexInCart !== -1) {
      const updatedCart = await updateCartProductQuantity(cart, productIndexInCart, quantity, totalPrice);
      
      // Publish cart updated event
      await EventBus.publish(CART_EVENTS.CART_UPDATED, {
        cartId: updatedCart._id,
        userId,
        totalPrice
      });
      
      return res.status(200).send({ message: "cart Updated", cart: updatedCart });
    }
    
    const updatedCart = await addNewProductToCart(cart, product_id, quantity, totalPrice);
    
    // Publish product added to cart event
    await EventBus.publish(CART_EVENTS.PRODUCT_ADDED_TO_CART, {
      cartId: updatedCart._id,
      productId: product_id,
      quantity,
      userId
    });
    
    return res.status(200).send({ message: "cart Updated", cart: updatedCart });
  } catch (error) {
    console.log("Error", error);
    return res.status(500).send({ message: "Internal server error" });
  }
};
