import '../controlls/auth/register_user/register_user';

const registerUser = require('../controlls/auth/register_user/register_user');
const loggerUser = require('../controlls/auth/logger_user/logger_user');
const verifyUser = require('../controlls/verify/verify');
module.exports = {
  registerUser,
  loggerUser,
  verifyUser
};
