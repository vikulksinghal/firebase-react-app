import {
  ORDERS_LOADING,
  ORDERS_LOADED,
  ORDER_LOADED,
  ORDERS_ERROR,
  ORDER_CREATING,
  ORDER_CREATED,
  ORDER_UPDATING,
  ORDER_UPDATED,
} from '../types';

const initialState = {
  loading: false,
  manageOrderLoading: false,
  data: [],
  error: null,
  order: {},
};

const OrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case ORDERS_LOADING:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case ORDERS_LOADED:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case ORDER_LOADED:
      console.log('payload: ', action.payload);
      return {
        ...state,
        order: action.payload,
      };
    case ORDERS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        data: [],
      };
    case ORDER_CREATING:
      return {
        ...state,
        manageOrderLoading: true,
      };
    case ORDER_CREATED:
      return {
        ...state,
        manageOrderLoading: false,
        order: {},
      };
    case ORDER_UPDATING:
      return {
        ...state,
        manageOrderLoading: true,
      };
    case ORDER_UPDATED:
      return {
        ...state,
        manageOrderLoading: false,
        order: {},
      };
    default:
      return state;
  }
};

export default OrderReducer;
