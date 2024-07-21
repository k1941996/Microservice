import mongoose, { Schema } from "mongoose";

const ProductSchema = new Schema({
  productId: { type: String, unique: true },
  name: { type: String },
  description: { type: String },
  price: { type: Number },
  stock: { type: Number },
  category: { type: String },
});

const Product = mongoose.model("Product", ProductSchema);
export default Product;
