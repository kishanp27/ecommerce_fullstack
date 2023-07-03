import { Schema, model, models, Types } from "mongoose";

const ProductSchema = new Schema({
  title: String,
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  images: [
    {
      type: String,
    },
  ],
  category: { type: Types.ObjectId, ref: "category" },
  properties: { type: Object },
}, {
  timestamps: true
});

const Product = models.product || model("product", ProductSchema);

export default Product;
