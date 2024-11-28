import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true, trim: true },
    password_id: { type: String },
    userName: { type: String, required: true, trim: true, unique: true },
    termsAndConditions: { type: Boolean, required: true },
    role: { type: String, required: true, enum: ['admin', 'custumer'] },
  },
  { timestamps: true },
);

const userModel = mongoose.model('User', userSchema);

export default userModel;
