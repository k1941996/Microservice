import mongoose, { Schema } from "mongoose";

const ProductSchema = new Schema({
  product_id: { type: Schema.Types.ObjectId, required: true },
  quantity: { type: Number, default: 1 },
});

const CartSchema = new Schema({
  cartId: { type: Schema.Types.ObjectId, required: true, unique: true }, // Reference to original cart
  userId: { type: Schema.Types.ObjectId, required: true },
  totalPrice: { type: Number },
  productInfo: [ProductSchema],
  lastUpdated: { type: Date, default: Date.now }
}, { timestamps: true });

const Cart = mongoose.model("Cart", CartSchema);
export default Cart; 