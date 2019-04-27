import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import authReducer from '../modules/Auth';

const configureStore = () => {
  const reducers = combineReducers({
    authReducer
  });
  const store = createStore(reducers, applyMiddleware(thunk));
  return store;
}

export default configureStore;
