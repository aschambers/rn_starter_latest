import { AsyncStorage } from 'react-native';
import axios from 'axios';
import { ROOT_URL } from '../../config/NetworkSettings';

// Types
import {
  ADDING_FEED,
  ADD_FEED_FAIL,
  ADD_FEED_SUCCESS,
  REMOVING_FEED,
  REMOVE_FEED_FAIL,
  REMOVE_FEED_SUCCESS,
  SHOWING_FEEDS,
  SHOW_FEEDS_FAIL,
  SHOW_FEEDS_SUCCESS,
  SETTING_FEED,
  SET_FEED_FAIL,
  SET_FEED_SUCCESS,
  REMOVING_SUBSCRIPTION,
  REMOVE_SUBSCRIPTION_FAIL,
  REMOVE_SUBSCRIPTION_SUCCESS,
  UPDATE_PUSH_NOTIFICATION_SUCCESS,
  UPDATE_PUSH_NOTIFICATION_FAIL,
  SEND_PUSH_NOTIFICATION,
  RESET_FEED_VALUES,
} from '../types';

// Initial States
export const feedInitialState = {
  success: false,
  isLoading: false,
  error: false,
  feeds: null,
  currentFeed: null
}

// Reducers
export default (state = feedInitialState, action) => {
  switch (action.type) {
    case ADDING_FEED:
      return {
        ...state, isLoading: true, error: false, success: false
      };
    case ADD_FEED_FAIL:
      return {
        ...state, isLoading: false, error: true, success: false
      };
    case ADD_FEED_SUCCESS:
      return {
        ...state, isLoading: false, error: false, success: true
      };
    case REMOVING_FEED:
      return {
        ...state, isLoading: true, error: false, success: false
      };
    case REMOVE_FEED_FAIL:
      return {
        ...state, isLoading: false, error: true, success: false
      };
    case REMOVE_FEED_SUCCESS:
      return {
        ...state, isLoading: false, error: false, success: true, feeds: action.payload, currentFeed: null, settingFeed: false
      };
    case REMOVING_SUBSCRIPTION:
      return {
        ...state, isLoading: true, error: false, success: false
      };
    case REMOVE_SUBSCRIPTION_FAIL:
      return {
        ...state, isLoading: false, error: true, success: false
      };
    case REMOVE_SUBSCRIPTION_SUCCESS:
      return {
        ...state, isLoading: false, error: false, success: true, currentFeed: action.payload, settingFeed: false
      };
    case SHOWING_FEEDS:
      return {
        ...state, isLoading: true, error: false, success: false
      };
    case SHOW_FEEDS_FAIL:
      return {
        ...state, isLoading: false, error: true, success: false
      };
    case SHOW_FEEDS_SUCCESS:
      return {
        ...state, isLoading: false, error: false, success: true, feeds: action.payload, settingFeed: false
      };
    case SETTING_FEED:
      return {
        ...state, isLoading: true, error: false, success: true
      };
    case SET_FEED_FAIL:
      return {
        ...state, isLoading: false, error: true, success: false
      };
    case SET_FEED_SUCCESS:
      return {
        ...state, isLoading: false, error: false, success: true, currentFeed: action.payload, settingFeed: true
      };
    case RESET_FEED_VALUES:
      return { ...state, isLoading: false, error: false, success: false, currentFeed: null };
    default:
      return state;
  }
};

// Actions
export const addFeed = params => async (dispatch) => {
  dispatch({ type: ADDING_FEED });
  try {
    const response = await axios.post(`${ROOT_URL}/api/v1/createFeed`, params);
    if (response.data) {
      const allFeeds = await axios.post(`${ROOT_URL}/api/v1/showAllFeeds`, params);
      if (allFeeds.data) {
        dispatch({ type: SHOW_FEEDS_SUCCESS, payload: allFeeds.data });
      }
    }
  } catch (err) {
    dispatch({ type: ADD_FEED_FAIL });
  }
};

export const removeFeed = params => async (dispatch) => {
  dispatch({ type: REMOVING_FEED });
  try {
    const response = await axios.post(`${ROOT_URL}/api/v1/removeFeed`, params);
    if (response.data) {
      dispatch({ type: REMOVE_FEED_SUCCESS, payload: response.data });
    }
  } catch (err) {
    dispatch({ type: REMOVE_FEED_FAIL });
  }
};

export const removeSubscription = params => async (dispatch) => {
  dispatch({ type: REMOVING_SUBSCRIPTION });
  try {
    const response = await axios.post(`${ROOT_URL}/api/v1/removeSubscription`, params);
    if (response.data) {
      dispatch({ type: REMOVE_SUBSCRIPTION_SUCCESS, payload: response.data });
    }
  } catch (err) {
    dispatch({ type: REMOVE_SUBSCRIPTION_FAIL });
  }
};

export const showAllFeeds = params => async (dispatch) => {
  dispatch({ type: SHOWING_FEEDS });
  try {
    const response = await axios.post(`${ROOT_URL}/api/v1/showAllFeeds`, params);
    if (response.data) {
      dispatch({ type: SHOW_FEEDS_SUCCESS, payload: response.data });
    }
  } catch (err) {
    dispatch({ type: SHOW_FEEDS_FAIL });
  }
};

export const setCurrentFeed = params => async (dispatch) => {
  dispatch({ type: SETTING_FEED });
  try {
    const response = await axios.post(`${ROOT_URL}/api/v1/showCurrentFeed`, params);
    if (response.data) {
      dispatch({ type: SET_FEED_SUCCESS, payload: response.data });
    }
  } catch (err) {
    dispatch({ type: SET_FEED_FAIL });
  }
};

export const setPushNotificationToken = params => async (dispatch) => {
  try {
    let response = await axios.put(`${ROOT_URL}/api/v1/setPushNotificationToken`, params);
    if(response.data) {
      dispatch({ type: UPDATE_PUSH_NOTIFICATION_SUCCESS });
    }
  } catch(err) {
    dispatch({ type: UPDATE_PUSH_NOTIFICATION_FAIL });
  }
}

export const showPushNotification = params => async (dispatch) => {
  // application is in the background or closed
  if(params.data) {
    AsyncStorage.setItem('newfeed', JSON.stringify(params.data));
  }
  // application is open or in foreground
  if(params._data) {
    AsyncStorage.setItem('newfeed', JSON.stringify(params._data));
  }
  dispatch({ type: SEND_PUSH_NOTIFICATION });
}

export const showPushNotificationIOS = params => async (dispatch) => {
  if(params) {
    AsyncStorage.setItem('newfeed', JSON.stringify(params));
  }
  dispatch({ type: SEND_PUSH_NOTIFICATION });
}

export const resetFeedValues = () => async (dispatch) => {
  dispatch({ type: RESET_FEED_VALUES });
}