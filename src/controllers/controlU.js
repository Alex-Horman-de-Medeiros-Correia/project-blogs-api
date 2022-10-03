const express = require('express');
const servicoDeUsuario = require('../services/servicoDeUsuario');
const tokenH = require('../helper/tokenH');

const router = express.Router();

router.post('/', async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const { code, data, message } = await servicoDeUsuario
  .create({ displayName, email, password, image });

  if (!data) return res.status(code).json({ message });
  return res.status(code).json(data);
});

router.get('/', async (req, res, _next) => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).json({ message: 'Token not found' });
  try {
    tokenH.tokenVerify(authorization);
    const result = await servicoDeUsuario.findAll();
    res.status(200).json(result);
  } catch (error) {
    res.status(401).json({ message: 'Expired or invalid token' });
  }
});

router.get('/:id', async (req, res, _next) => {
  const { authorization } = req.headers;
  const { id } = req.params;
  if (!authorization) return res.status(401).json({ message: 'Token not found' });

  try {
    tokenH.tokenVerify(authorization);
    const { code, message, user } = await servicoDeUsuario.findById(id);
    if (!user) {
      res.status(code).json({ message });
    }
    res.status(code).json(user);
  } catch (error) {
    res.status(401).json({ message: 'Expired or invalid token' });
  }
});

module.exports = router;
