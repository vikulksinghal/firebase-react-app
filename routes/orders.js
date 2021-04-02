const express = require('express');
const FBAuth = require('../middlewares/FBAuth');
const {
  getOrders,
  getOrder,
  createOrder,
  updateOrder,
} = require('../controllers/orders');

const router = express.Router();

router.get('/', FBAuth, getOrders);

router.get('/:orderId', FBAuth, getOrder);

router.post('/', FBAuth, createOrder);

router.put('/:orderId', FBAuth, updateOrder);

module.exports = {
  routes: router,
};
