import mongoose, { Schema } from "mongoose";

const ProductSchema = new Schema({
  product_id: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, default: 1 },
});
const OrderSchema = mongoose.Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  totalPrice: { type: Number },
  products: [ProductSchema],
  orderDate: { type: Date, default: Date.now },
  status: { type: String, required: true },
  shippingAddress: { type: Object, required: true },
});

const Order = mongoose.model("Order", OrderSchema);

export default Order;
