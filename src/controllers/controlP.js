require('dotenv').config();
const express = require('express');
const serPOST = require('../services/serPOST');
const tokenH = require('../helper/tokenH');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) return res.status(401).json({ message: 'Token not found' });
    const data = await serPOST.findAll();
    tokenH.tokenVerify(authorization);  
    return res.status(200).json(data);
  } catch (err) {
     res.status(401).json({ message: 'Expired or invalid token' });
  }
});

/* router.get('/', async (req, res) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) return res.status(401).json({ message: 'Token not found' });
    const data = await serPOST.findAll();
  } catch (err) {
     res.status(401).json({ message: 'Expired or invalid token' });
  }
}); */

router.get('/:id', async (req, res) => {
  const { authorization } = req.headers;
  const { id } = req.params;
  if (!authorization) return res.status(401).json({ message: 'Token not found' });

  try {
    const date = tokenH.tokenVerify(authorization);
    console.log('nao sei', { date: date.userId });
    const { code, message, post } = await serPOST.findById(id);
    if (post === null) {
      res.status(code).json({ message });
    }
    res.status(code).json(post);
  } catch (error) {
    res.status(401).json({ message: 'Expired or invalid token' });
  }
});

module.exports = router;
