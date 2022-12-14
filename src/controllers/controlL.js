require('dotenv').config();
const express = require('express');
// const jwt = require('jsonwebtoken');
const logando = require('../services/logando');
const tokenH = require('../helper/tokenH');

const router = express.Router();

router.post('/', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await logando.findByLogin({ email, password });
    if (!email || !password) {
      return res.status(400)
      .json({ message: 'Some required fields are missing' });
    }

    if (!user) {
      return res.status(400)
      .json({ message: 'Invalid fields' });
    }

    const { token } = await tokenH.tokenGenerate({ email });

    return res.status(200).json({ token });
  } catch (error) {
    return res.status(404).send({ message: 'Algo deu errado' });
  }
});

module.exports = router;
