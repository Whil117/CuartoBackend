import { Schema, model } from 'mongoose';

interface INewSale {
  address: string;
  description: string;
  details: {
    rooms: number;
    bathrooms: number;
    bedrooms: number;
    guests: number;
  };
  price: number;
  images: string[];
  offer: string[];
  title: string;
  author: string;
}

const NewSaleSchema = new Schema<INewSale>({
  address: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  details: {
    rooms: {
      type: Number,
      required: true
    },
    bathrooms: {
      type: Number,
      required: true
    },
    bedrooms: {
      type: Number,
      required: true
    },
    guests: {
      type: Number,
      required: true
    }
  },
  price: {
    type: Number,
    required: true
  },
  images: {
    type: [String],
    required: true
  },
  offer: {
    type: [String],
    required: true
  },
  author: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  favorite: {
    type: Boolean
  }
});

module.exports = model('NewSale', NewSaleSchema);
