import * as types from './types';

const defaultState = {
  device: {
    isMobile: false
  },
  user: {
    loading: false,
    data: {
      status: undefined
    }
  }
};

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
    data: {
      ...data,
      status: 'ok'
    },
    loading: false
  }
});

const getStateByUserFailure = state => ({
  ...state,
  user: {
    ...state.user,
    data: {
      status: 'error'
    },
    loading: false
  }
});

export default (state = defaultState, action) => {
  switch (action.type) {
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
