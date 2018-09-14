import * as types from './types';

const defaultState = {
  collapsed: false,
  openKeys: [],
  selectedKey: ''
};

const sidebar_update = (state, sidebar) => {
  return {
    ...state,
    ...sidebar
  };
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.SIDEBAR_UPDATE:
      return sidebar_update(state, action.sidebar);
    default:
      return state;
  }
};
