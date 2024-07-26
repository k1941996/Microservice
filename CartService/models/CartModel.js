import mongoose, { Schema } from "mongoose";

const ProductSchema = new Schema({
  product_id: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, default: 1 },
});

const CartSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  totalPrice: { type: Number },
  productInfo: [ProductSchema],
  createdDate: { type: Date, default: Date.now },
  updatedDate: { type: Date, default: Date.now },
});

const Cart = mongoose.model("Cart", CartSchema);

export default Cart;
