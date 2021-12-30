import { Schema, model, Types } from 'mongoose';

const bcrypt = require('bcrypt');

interface IUser {
  username: string;
  email: string;
  password: string;
}

const registerUserSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  _id: {
    type: Types.ObjectId
  }
});

registerUserSchema.methods.EncryptPassword = async function (password: string) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};
registerUserSchema.methods.ComparePassword = function (password: string) {
  return bcrypt.compare(password, this.password);
};
module.exports = model('registerUser', registerUserSchema);
