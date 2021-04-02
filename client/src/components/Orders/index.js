import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getOrders,
  getOrder,
  createOrder,
  updateOrder,
} from '../../redux/actions/orderActions';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import List from './List';
import Loader from './../Loader/index';
import { NotificationManager } from 'react-notifications';
import OrderForm from './OrderForm';

const Orders = () => {
  const [show, setShow] = useState(false);
  const handlePopup = () => setShow(!show);
  const reduxDispatch = useDispatch();

  const { data: orders, loading, error, order } = useSelector(
    (state) => state.orders
  );

  useEffect(() => {
    // Checking if orders is empty then dispatching and fetching orders from backend api, otherwise not calling unnecessary api requests
    if (!orders.length) reduxDispatch(getOrders());
  }, [reduxDispatch, orders.length]);

  useEffect(() => {
    if (error) NotificationManager.error(error);
  }, [error]);

  const editOrder = (orderId) => {
    // Dispatching getOrder fn to fetch order details of selected orderId
    reduxDispatch(getOrder(orderId));
  };

  const putOrder = (data) => {
    if (!order._id) return;
    reduxDispatch(
      updateOrder(data, order._id, () => {
        NotificationManager.success('Order updated successfully');
        handlePopup();
        reduxDispatch(getOrders());
      })
    );
  };

  const addOrder = (data) => {
    reduxDispatch(
      createOrder(data, () => {
        NotificationManager.success('Order created successfully');
        handlePopup();
        reduxDispatch(getOrders());
      })
    );
  };

  const handleSubmit = (data) => {
    if (!order._id) {
      addOrder(data);
    } else {
      putOrder(data);
    }
  };

  return (
    <>
      <div className='justify-content-between align-items-center d-flex'>
        <h2>Orders</h2>
        <Button
          onClick={handlePopup}
          style={{ marginBottom: 15 }}
          type='button'
        >
          Add
        </Button>
      </div>
      <OrderForm
        onPopup={handlePopup}
        show={show}
        order={order}
        onSubmit={handleSubmit}
      />
      {error && <Alert variant='danger'>{error}</Alert>}
      <Table responsive='sm'>
        <thead>
          <tr>
            <th>Title</th>
            <th>Customer</th>
            <th>Address</th>
            <th>Booking Date</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {orders.length ? (
            orders.map((order) => (
              <List key={order._id} onEdit={editOrder} order={order} />
            ))
          ) : loading ? (
            <tr>
              <td colSpan='100%' className='text-center'>
                <Loader />
              </td>
            </tr>
          ) : (
            <tr>
              <td colSpan='100%' className='text-center'>
                No orders found
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  );
};

export default Orders;
