import { AsyncStorage } from 'react-native';
import axios from 'axios';
import { ROOT_URL } from '../../config/NetworkSettings';

// Types
import {
  SIGNING_UP,
  SIGNUP_FAIL,
  SIGNUP_SUCCESS,
  LOGGING_IN,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGGING_OUT,
  LOGOUT_FAIL,
  LOGOUT_SUCCESS,
  RESET_VALUES,
} from '../types';

// Initial States
export const initialState = {
  isLoading: false,
  error: false,
  success: false,
  signupSuccess: false,
  signupIsLoading: false,
  signupError: false
}

// Reducers
export default (state = initialState, action) => {
  switch (action.type) {
    case SIGNING_UP:
      return {
        ...state, signupIsLoading: true, signupError: false, signupSuccess: false, userLoggedIn: false
      };
    case SIGNUP_FAIL:
      return {
        ...state, signupIsLoading: false, signupError: true, signupSuccess: false, userLoggedIn: false
      };
    case SIGNUP_SUCCESS:
      return {
        ...state, signupIsLoading: false, signupError: false, signupSuccess: true, userLoggedIn: false
      };
    case LOGGING_IN:
      return {
        ...state, isLoading: true, error: false, success: false, userLoggedIn: false
      };
    case LOGIN_FAIL:
      return {
        ...state, isLoading: false, error: true, success: false, userLoggedIn: false
      };
    case LOGIN_SUCCESS:
      return {
        ...state, isLoading: false, error: false, success: true, userLoggedIn: true, user: action.payload
      };
    case LOGGING_OUT:
      return {
        ...state, isLoading: true, error: false, success: false, userLoggedIn: false
      };
    case LOGOUT_FAIL:
      return {
        ...state, isLoading: false, error: true, success: false, userLoggedIn: true
      };
    case LOGOUT_SUCCESS:
      return {
        ...state, isLoading: false, error: false, success: true, userLoggedIn: false
      };
    case RESET_VALUES:
      return { ...state, signupIsLoading: false, signupError: false, signupSuccess: false, isLoading: false, error: false, success: false };
    default:
      return state;
  }
};

// Actions
export const userSignup = params => async (dispatch) => {
  dispatch({ type: SIGNING_UP });
  try {
    const response = await axios.post(`${ROOT_URL}/api/v1/createUser`, params);
    if (response !== 'user-exists') {
      AsyncStorage.removeItem('user');
      AsyncStorage.setItem('user', JSON.stringify(response.data));
    }
    dispatch({ type: SIGNUP_SUCCESS });
  } catch (err) {
    dispatch({ type: SIGNUP_FAIL });
  }
};

export const userLogin = params => async (dispatch) => {
  dispatch({ type: LOGGING_IN });
  try {
    const response = await axios.post(`${ROOT_URL}/api/v1/loginUser`, params);
    if (response.data) {
      AsyncStorage.removeItem('user');
      AsyncStorage.setItem('user', JSON.stringify(response.data));
      dispatch({ type: LOGIN_SUCCESS, payload: response.data });
    } else {
      dispatch({ type: LOGIN_FAIL });
    }
  } catch (err) {
    dispatch({ type: LOGIN_FAIL });
  }
};

export const logoutUser = params => async (dispatch) => {
  dispatch({ type: LOGGING_OUT });
  try {
    const response = await axios.post(`${ROOT_URL}/api/v1/logoutUser`, params);
    if (response.data) {
      dispatch({ type: LOGOUT_SUCCESS });
    } else {
      dispatch({ type: LOGOUT_FAIL });
    }
  } catch (err) {
    dispatch({ type: LOGOUT_FAIL });
  }
};

export const resetValues = () => async (dispatch) => {
  dispatch({ type: RESET_VALUES });
};