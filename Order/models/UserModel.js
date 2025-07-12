import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, required: true, unique: true }, // Reference to original user
  name: { type: String, required: true },
  email: { type: String, required: true },
  userName: { type: String, required: true },
  role: { type: String, required: true },
  lastUpdated: { type: Date, default: Date.now }
}, { timestamps: true });

const User = mongoose.model("User", UserSchema);
export default User; 