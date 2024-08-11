import Cart from "#models/CartModel.js";

export const deleteCart = async (req, res) => {
  const accountid = req.headers.accountid;

  try {
    const deleteCart = await Cart.findOneAndDelete({ userId: accountid });
    return res.status(200).send({ message: "Cart Deleted", cart: deleteCart });
  } catch (error) {
    res.status(500).send("Internal server error");
    throw new Error(error);
  }
};
