import * as types from './types';
import menu from '@/config/menu';

export const menu_request = () => ({
  type: types.MENU_REQUEST
});

export const menu_success = data => ({
  type: types.MENU_SUCCESS,
  data
});

export const menu_failure = () => ({
  type: types.MENU_FAILURE
});

export const menu_update = () => {
  return async dispatch => {
    dispatch(menu_request());
    let res = await menu;
    if (!res) return dispatch(menu_failure());
    dispatch(menu_success(res.children));
  };
};

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

export const user_login = () => {
  return async dispatch => {
    dispatch(user_login_request());
    let res = await menu;
    if (!res) return dispatch(user_login_failure());
    dispatch(user_login_success(res));
  };
};

export const user_logout_request = () => ({
  type: types.USER_LOGIN_REQUEST
});

export const user_logout_success = data => ({
  type: types.USER_LOGIN_SUCCESS,
  data
});

export const user_logout_failure = () => ({
  type: types.USER_LOGIN_FAILURE
});

export const user_logout = () => {
  return async dispatch => {
    dispatch(user_logout_request());
    let res = await menu;
    if (!res) return dispatch(user_logout_failure());
    dispatch(user_logout_success(res));
  };
};
