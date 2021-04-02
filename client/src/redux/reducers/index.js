import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import OrderReducer from './orderReducer';

export default combineReducers({
  auth: AuthReducer,
  orders: OrderReducer,
});
