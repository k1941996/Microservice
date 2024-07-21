import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, unique: true },
  password: { type: String, required: true, trim: true },
  password_id: { type: String },
  userName: { type: String, required: true, trim: true, unique: true },
  address: { type: String, required: true, trim: true },
  termsAndConditions: { type: Boolean, required: true, trim: true },
});

const userModel = mongoose.model('User', userSchema);

export default userModel;
