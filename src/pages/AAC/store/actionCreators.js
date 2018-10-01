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

export const table_update = params => {
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

export const createForm_update = createForm => ({
  type: types.CREATEFORM_UPDATE,
  createForm
});

export const updateForm_update = updateForm => ({
  type: types.UPDATEFORM_UPDATE,
  updateForm
});

export const current_update = current => ({
  type: types.CURRENT_UPDATE,
  current
});

export const slectedRows_update = selectedRows => ({
  type: types.SELECTEDROWS_UPDATE,
  selectedRows
});

export const tabActiveKey_update = tabActiveKey => ({
  type: types.TABACTIVEKEY_UPDATE,
  tabActiveKey
});
