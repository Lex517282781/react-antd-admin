import * as types from './types';

const defaultState = {
  table: {
    loading: false,
    data: {
      list: [],
      pagination: {
        total: 0,
        pageSize: 10,
        current: 1
      }
    }
  },
  createForm: {
    loading: false
  },
  updateForm: {
    loading: false,
    visible: false,
    currentStep: 0
  },
  current: {
    loading: false
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

const createForm_update = (state, createForm) => {
  return {
    ...state,
    createForm: {
      ...state.createForm,
      ...createForm
    }
  };
};

const updateForm_update = (state, updateForm) => {
  return {
    ...state,
    updateForm: {
      ...state.updateForm,
      ...updateForm
    }
  };
};

const current_update = (state, current) => {
  return {
    ...state,
    current: {
      ...state.current,
      ...current
    }
  };
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.TABLE_REQUEST:
      return getStateByTableRequest(state);
    case types.TABLE_SUCCESS:
      return getStateByTableSuccess(state, action.data);
    case types.TABLE_FAILURE:
      return getStateByTableFailure(state);
    case types.CREATEFORM_UPDATE:
      return createForm_update(state, action.createForm);
    case types.UPDATEFORM_UPDATE:
      return updateForm_update(state, action.updateForm);
    case types.CURRENT_UPDATE:
      return current_update(state, action.current);
    default:
      return state;
  }
};
