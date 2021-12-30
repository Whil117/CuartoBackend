import { Schema, model } from 'mongoose';

interface ListSales {
  address: string;
  title: string;
  author: string;
}

const ListSalesSchema = new Schema<ListSales>({
  address: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  }
});
module.exports = model('ListSales', ListSalesSchema);
