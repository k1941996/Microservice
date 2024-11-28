import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const schemaOptions = { timestamps: true };
const adminSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    roleType: {
      type: String,
      default: 'admin',
    },
    permissions: { type: [String], default: ['all'] },
  },
  schemaOptions,
);

const customerSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    roleType: {
      type: String,
      default: 'customer',
    },
  },
  schemaOptions,
);

export const Customer = mongoose.model('customer', customerSchema);
export const Admin = mongoose.model('admin', adminSchema);
