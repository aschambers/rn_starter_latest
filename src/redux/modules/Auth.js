import { AsyncStorage } from 'react-native';
import axios from 'axios';
import { ROOT_URL } from '../../config/NetworkSettings';

// Types
import {
  SIGNING_UP,
  SIGNUP_FAIL,
  SIGNUP_SUCCESS
} from '../types';

// Initial States
export const initialState = {
  isLoading: false,
  error: false,
  success: false
}

// Reducers
export default (state = initialState, action) => {
  switch (action.type) {
    case SIGNING_UP:
      return {
        ...state, isLoading: true, error: false, success: false
      };
    case SIGNUP_FAIL:
      return {
        ...state, isLoading: false, error: true, success: false
      };
    case SIGNUP_SUCCESS:
      return {
        ...state, isLoading: false, error: false, success: true
      };
    default:
      return state;
  }
}

// Actions
export const signup = params => async (dispatch) => {
  dispatch({ type: SIGNING_UP });
  try {
    const response = await axios.post(`${ROOT_URL}/api/signup`, params);
    if (response !== 'user-exists') {
      AsyncStorage.setItem('user', JSON.stringify(response.data));
      dispatch({ type: SIGNUP_SUCCESS });
    } else {
      dispatch({ type: SIGNUP_FAIL });
    }
  } catch (err) {
    if (err) {
      dispatch({ type: SIGNUP_FAIL });
    }
  }
};