import * as types from './types';

export const table_request = () => ({
  type: types.TABLE_REQUEST
});

export const table_success = data => ({
  type: types.TABLE_SUCCESS,
  data
});

export const metable_failure = () => ({
  type: types.TABLE_FAILURE
});

export const table_update = () => {
  return async dispatch => {
    dispatch(table_request());
    let res = await menu;
    if (!res) return dispatch(table_failure());
    dispatch(table_success(res.children));
  };
};
