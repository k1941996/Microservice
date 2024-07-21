import mongoose, { Schema } from "mongoose";

const ProductSchema = new Schema({
  name: { type: String },
  description: { type: String },
  price: { type: Number },
  stock: { type: Number },
  category: { type: String },
  createdBy: { type: Schema.Types.ObjectId, ref: "Admin" },
});

const Product = mongoose.model("Product", ProductSchema);
export default Product;
