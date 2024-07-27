import Cart from "#models/CartModel.js";

export const getCart = async (req, res) => {
  const accountid = req.headers.accountid;
  const cart = await Cart.findOne({ userId: accountid });
  if (!cart) {
    return res.status(200).send({ message: "Cart is empty" });
  }
  return res.status(200).send({ message: "Cart fetched successfully", accountid, cart });
};
