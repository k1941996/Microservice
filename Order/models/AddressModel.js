import mongoose, { Schema } from "mongoose";

const AddressSchema = new Schema({
  addressId: { type: Schema.Types.ObjectId, required: true, unique: true }, // Reference to original address
  userId: { type: Schema.Types.ObjectId, required: true },
  address: { type: Object, required: true },
  lastUpdated: { type: Date, default: Date.now }
}, { timestamps: true });

const Address = mongoose.model("Address", AddressSchema);
export default Address; 