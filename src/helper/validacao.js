const joiValidation = require('./usandoJoi');
const { User } = require('../models');

const validacao = ({ displayName, email, password }) => {
  const { error } = joiValidation.userSchema.validate({ displayName, email, password });

  if (error) {
    const [code, message] = error.message.split('|');

    return { code, message };
  }
  return false;
};

const emailValidation = async ({ email }) => {
  const verifyEmail = await User.findOne({ where: { email } });

  if (verifyEmail) return { code: 409, message: 'User already registered' };

  return false;
};

module.exports = { validacao, emailValidation };
