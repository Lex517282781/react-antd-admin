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
