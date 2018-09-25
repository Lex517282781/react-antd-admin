import * as types from './types';
import Service from '@/services/api';
import { message } from 'antd';

export const table_request = () => ({
  type: types.TABLE_REQUEST
});

export const table_success = data => ({
  type: types.TABLE_SUCCESS,
  data
});

export const table_failure = () => ({
  type: types.TABLE_FAILURE
});

export const table_update = (params) => {
  return async dispatch => {
    dispatch(table_request());
    let data = await Service.getTable({
      params,
      waitting: () => {},
      error: res => {
        dispatch(table_failure());
        message.error(res.errorMessage);
      }
    });
    if (!data) return;
    dispatch(table_success(data));
  };
};
