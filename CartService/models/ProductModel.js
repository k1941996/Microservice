import mongoose, { Schema } from "mongoose";

const ProductSchema = new Schema({
  productId: { type: Schema.Types.ObjectId, required: true, unique: true }, // Reference to original product
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  category: { type: String },
  createdBy: { type: Schema.Types.ObjectId },
  lastUpdated: { type: Date, default: Date.now }
}, { timestamps: true });

const Product = mongoose.model("Product", ProductSchema);
export default Product; 