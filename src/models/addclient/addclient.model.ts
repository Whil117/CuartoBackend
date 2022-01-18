import { Schema, model } from 'mongoose';

interface AddClient {
  image: string;
  name: string;
  phone_number: string;
  email: string;
  address: string;
}

const AddClientSchema = new Schema<AddClient>({
  image: {
    type: String
  },
  name: {
    type: String,
    required: true
  },
  phone_number: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  }
});

module.exports = model('AddClient', AddClientSchema);
