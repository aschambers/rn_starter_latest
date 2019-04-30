import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import authReducer from '../modules/Auth';
import feedReducer from '../modules/Feed';

const configureStore = () => {
  const reducers = combineReducers({
    authReducer,
    feedReducer
  });
  const store = createStore(reducers, applyMiddleware(thunk));
  return store;
}

export default configureStore;
