import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  description: string;
  partNumber: string;
  price: number;
  stockCount: number;
  imageUrl: string;
  category: string;
  bikeBrand: string;
}

const ProductSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  partNumber: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  stockCount: { type: Number, required: true, default: 0 },
  imageUrl: { type: String, required: true },
  category: { type: String, required: true },
  bikeBrand: { type: String, required: true },
}, {
  timestamps: true,
});

export default mongoose.model<IProduct>('Product', ProductSchema);
