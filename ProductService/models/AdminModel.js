import mongoose, { Schema } from "mongoose";

const AdminSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, required: true, unique: true },
    roleType: {
        type: String,
        required: true,
        enum: ['admin', 'customer']
    }
}, { timestamps: true });

const Admin = mongoose.model("Admin", AdminSchema);
export default Admin; 