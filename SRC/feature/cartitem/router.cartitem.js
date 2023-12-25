const express = require('express');
const router = express.Router();
const cartitemController = require('../cartitem/controller.cartitem');
router.post('/additem',cartitemController.addcart);

module.exports = router;