import mongoose from 'mongoose';

interface IProduct {
  title: string;
  image: { fileName: string; originalName: string };
  category: string;
  description?: string;
  price?: number | null;
}

const productSchema = new mongoose.Schema<IProduct>(
  {
    title: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
      unique: true,
    },
    image: {
      type: {
        fileName: String,
        originalName: String,
      },
      required: true,
      _id: false,
    },
    category: {
      type: String,
      required: true,
    },
    description: String,
    price: {
      type: Number,
      default: null,
    },
  },
  {
    versionKey: false,
  },
);

export default mongoose.model<IProduct>('product', productSchema);
