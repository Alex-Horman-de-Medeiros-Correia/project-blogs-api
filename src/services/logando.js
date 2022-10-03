const { User } = require('../models');

const findByLogin = async ({ email, password }) => {
    const result = await User.findOne({ where: { email, password } });
    return result;
};

module.exports = { findByLogin };
