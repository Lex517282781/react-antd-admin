import * as types from './types';

const defaultState = {
  table: {
    loading: false,
    data: []
  }
};

const getStateByTableRequest = state => ({
  ...state,
  table: {
    ...state.table,
    loading: true
  }
});

const getStateByTableSuccess = (state, data) => ({
  ...state,
  table: {
    ...state.table,
    data,
    loading: false
  }
});

const getStateByTableFailure = (state, table) => ({
  ...state,
  table: {
    ...state.table,
    loading: false
  }
});

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.TABLE_REQUEST:
      return getStateByTableRequest(state);
    case types.TABLE_SUCCESS:
      return getStateByTableSuccess(state, action.data);
    case types.TABLE_FAILURE:
      return getStateByTableFailure(state);
    default:
      return state;
  }
};
