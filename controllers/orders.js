const { admin, functions } = require('../config/db');

const getOrders = functions.https.onRequest(async (req, res) => {
  try {
    if (req.method !== 'GET') {
      return res.status(400).json({ error: 'Method not allowed' });
    }
    const orders = await admin
      .firestore()
      .collection('orders')
      .orderBy('bookingDate', 'desc')
      .get();
    const orderData = [];
    orders.forEach((order) => {
      let { title, address, bookingDate, customer } = order.data();
      if (title && bookingDate && typeof bookingDate !== 'string') {
        if (typeof bookingDate === 'number') {
          bookingDate = admin.firestore.Timestamp.fromDate(
            new Date(bookingDate)
          );
        }

        orderData.push({
          _id: order.id,
          title,
          address,
          bookingDate,
          customer,
        });
      }
    });
    return res.json(orderData);
  } catch (e) {
    return res.status(400).json({ msg: e.message });
  }
});

const getOrder = functions.https.onRequest(async (req, res) => {
  try {
    if (req.method !== 'GET') {
      return res.status(400).json({ error: 'Method not allowed' });
    }
    const { orderId } = req.params;
    const snapshot = await admin
      .firestore()
      .collection('orders')
      .doc(orderId)
      .get();
    const { city, country, street, zip } = snapshot.data().address || {};
    const { email, name, phone } = snapshot.data().customer || {};
    let { title, bookingDate } = snapshot.data();
    bookingDate =
      typeof bookingDate === 'number'
        ? admin.firestore.Timestamp.fromDate(new Date(bookingDate))
        : bookingDate;

    return res.json({
      title,
      bookingDate,
      city,
      country,
      street,
      zip,
      email,
      name,
      phone,
      _id: orderId,
    });
  } catch (e) {
    return res.status(400).json({ msg: e.message });
  }
});

const createOrder = functions.https.onRequest(async (req, res) => {
  try {
    if (req.method !== 'POST') {
      return res.status(400).json({ error: 'Method not allowed' });
    }
    const {
      title,
      bookingDate,
      city,
      country,
      street,
      zip,
      email,
      name,
      phone,
    } = req.body;

    const newOrder = {
      title,
      bookingDate,
      address: {
        city,
        country,
        street,
        zip,
      },
      customer: {
        email,
        name,
        phone,
      },
      bookingDate: admin.firestore.Timestamp.fromDate(new Date(bookingDate)),
    };
    await admin.firestore().collection('orders').add(newOrder);
    res.json({ msg: 'Order added successfully' });
  } catch (e) {
    return res.status(200).status(400).json({ msg: e.message });
  }
});

const updateOrder = functions.https.onRequest(async (req, res) => {
  try {
    if (req.method !== 'PUT') {
      return res.status(400).json({ error: 'Method not allowed' });
    }
    const { orderId } = req.params;
    const { title, bookingDate } = req.body;
    const updateOrder = {
      title,
      bookingDate: admin.firestore.Timestamp.fromDate(new Date(bookingDate)),
    };
    await admin
      .firestore()
      .collection('orders')
      .doc(orderId)
      .update(updateOrder);
    res.status(200).json({ msg: 'Order updated successfully' });
  } catch (e) {
    return res.status(400).json({ msg: e.message });
  }
});

module.exports = {
  getOrders,
  createOrder,
  updateOrder,
  getOrder,
};
