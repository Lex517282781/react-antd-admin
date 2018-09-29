import * as types from './types';

const defaultState = {
  menu: {
    loading: false,
    data: []
  },
  device: {
    isMobile: false
  },
  user: {
    loading: false,
    data: null
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

const getStateByDeviceUpdate = (state, device) => ({
  ...state,
  device: {
    ...state.device,
    ...device
  }
});

const getStateByUserRequest = state => ({
  ...state,
  user: {
    ...state.user,
    loading: true
  }
});

const getStateByUserSuccess = (state, data) => ({
  ...state,
  user: {
    ...state.user,
    data,
    loading: false
  }
});

const getStateByUserFailure = (state, menu) => ({
  ...state,
  user: {
    ...state.user,
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
    case types.DEVICE_UPDATE:
      return getStateByDeviceUpdate(state, action.device);
    case types.USER_LOGIN_REQUEST:
    case types.USER_LOGOUT_REQUEST:
      return getStateByUserRequest(state);
    case types.USER_LOGIN_SUCCESS:
    case types.USER_LOGOUT_SUCCESS:
      return getStateByUserSuccess(state, action.data);
    case types.USER_LOGIN_FAILURE:
    case types.USER_LOGOUT_FAILURE:
      return getStateByUserFailure(state);
    default:
      return state;
  }
};
