import { createStore, combineReducers } from 'redux';
import { cartReducer } from './reducers';
import { userReducer } from './reducers';

const rootReducer = combineReducers({
  cart: cartReducer,
  user: userReducer,
});

const store = createStore(rootReducer);

export default store;
