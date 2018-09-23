import * as types from './types';

const defaultState = {
  collapsed: false,
  openKeys: [],
  selectedKey: ''
};

const headbar_update = (state, headbar) => {
  return {
    ...state,
    ...headbar
  };
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.HEADBAR_UPDATE:
      return headbar_update(state, action.headbar);
    default:
      return state;
  }
};
