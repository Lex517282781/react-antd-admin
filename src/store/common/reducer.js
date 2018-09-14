import * as types from './types';

const defaultState = {
  menu: {
    loading: false,
    data: []
  }
};

const getStateByMenuRequest = state => ({
  ...state,
  menu: {
    ...state.menu,
    loading: true
  }
});

const getStateByMenuSuccess = (state, data) => ({
  ...state,
  menu: {
    ...state.menu,
    data,
    loading: false
  }
});

const getStateByMenuFailure = (state, menu) => ({
  ...state,
  menu: {
    ...state.menu,
    loading: false
  }
});

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.MENU_REQUEST:
      return getStateByMenuRequest(state);
    case types.MENU_SUCCESS:
      return getStateByMenuSuccess(state, action.data);
    case types.MENU_FAILURE:
      return getStateByMenuFailure(state);
    default:
      return state;
  }
};
