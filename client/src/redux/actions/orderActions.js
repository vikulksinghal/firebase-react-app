import {
  ORDERS_LOADING,
  ORDERS_LOADED,
  ORDER_LOADED,
  ORDERS_ERROR,
  ORDER_CREATING,
  ORDER_CREATED,
  ORDER_UPDATING,
  ORDER_UPDATED,
} from '../types/index';
import axios from 'axios';
import { getToken } from './../../utils/index';
import { logout } from './authActions';

// Fn to fetch all orders using token which is stored in localStorage
export const getOrders = () => async (dispatch) => {
  dispatch({ type: ORDERS_LOADING });
  try {
    const token = getToken();
    axios.defaults.headers.common['Authorization'] = token;
    const orders = await axios.get('/orders');
    if (orders.data) {
      dispatch({ type: ORDERS_LOADED, payload: orders.data });
    } else {
      dispatch({ type: ORDERS_ERROR, payload: 'No Order Found' });
    }
  } catch (e) {
    console.log(e.message);
    if (e.message) {
      if (e.message === 'Request failed with status code 403') {
        dispatch(logout());
      } else {
        dispatch({ type: ORDERS_ERROR, payload: e.message });
      }
    }
  }
};

// Fn to getch selected orderId order details
export const getOrder = (orderId) => async (dispatch) => {
  try {
    const token = getToken();
    axios.defaults.headers.common['Authorization'] = token;
    const order = await axios.get(`/orders/${orderId}`);
    if (order.data) {
      dispatch({ type: ORDER_LOADED, payload: order.data });
    }
  } catch (e) {
    if (e.message) {
      if (e.message === 'Request failed with status code 403') {
        dispatch(logout());
      } else {
        dispatch({ type: ORDERS_ERROR, payload: e.message });
      }
    }
  }
};

// Fn to create new order
export const createOrder = (data, cb) => async (dispatch) => {
  dispatch({ type: ORDER_CREATING });
  try {
    const token = getToken();
    axios.defaults.headers.common['Authorization'] = token;
    await axios.post('/orders', data);
    dispatch({ type: ORDER_CREATED });
    cb();
  } catch (e) {
    if (e.message) {
      dispatch({ type: ORDERS_ERROR, payload: e.message });
    }
  }
};

// Fn to update order
export const updateOrder = (data, orderId, cb) => async (dispatch) => {
  dispatch({ type: ORDER_UPDATING });
  try {
    const token = getToken();
    axios.defaults.headers.common['Authorization'] = token;
    await axios.put(`/orders/${orderId}`, data);
    dispatch({ type: ORDER_UPDATED });
    cb();
  } catch (e) {
    if (e.message) {
      dispatch({ type: ORDERS_ERROR, payload: e.message });
    }
  }
};
