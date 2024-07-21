import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const adminSchema = new Schema({
  adminId: { type: Schema.Types.ObjectId, ref: 'User' },
});

const customerSchema = new Schema({
  customerId: { type: Schema.Types.ObjectId, ref: 'User' },
});

export const Customer = mongoose.model('Customer', customerSchema);
export const Admin = mongoose.model('Admin', adminSchema);
