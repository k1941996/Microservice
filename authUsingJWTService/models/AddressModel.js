import mongoose, { Schema } from 'mongoose';

const AddressSchema = mongoose.Schema({
  name: { type: String, required: true },
  streetAddress: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  pinCode: { type: String, required: true },
  country: { type: String, required: true },
  mobile_no: { type: String, required: true },
  specialInstructions: { type: String },
});
const AddressesSchema = mongoose.Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  addresses: [AddressSchema],
});

const AddressesModel = mongoose.model('Addresses', AddressesSchema);

export default AddressesModel;
