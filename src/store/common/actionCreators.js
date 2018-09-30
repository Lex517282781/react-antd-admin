import * as types from './types';
import Service from '@/services/api';
import { message } from 'antd';

export const device_update = device => ({
  type: types.DEVICE_UPDATE,
  device
});

export const user_login_request = () => ({
  type: types.USER_LOGIN_REQUEST
});

export const user_login_success = data => ({
  type: types.USER_LOGIN_SUCCESS,
  data
});

export const user_login_failure = () => ({
  type: types.USER_LOGIN_FAILURE
});

export const user_login = params => {
  return async dispatch => {
    dispatch(user_login_request());
    let res = await Service.login({
      params,
      waitting: () => {},
      error: res => {
        dispatch(user_login_failure());
        message.error(res.errorMessage);
      }
    });
    if (!res) return dispatch(user_login_failure());
    dispatch(user_login_success(res));
  };
};

export const user_logout_request = () => ({
  type: types.USER_LOGIN_REQUEST
});

export const user_logout_success = data => ({
  type: types.USER_LOGOUT_SUCCESS,
  data
});

export const user_logout_failure = () => ({
  type: types.USER_LOGIN_FAILURE
});

export const user_logout = () => {
  return async dispatch => {
    dispatch(user_logout_request());
    // let res = await menu;
    // if (!res) return dispatch(user_logout_failure());
    dispatch(user_logout_success());
  };
};
