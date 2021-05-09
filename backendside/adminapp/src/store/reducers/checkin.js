import * as actionsTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  data: null,
  error: null,
  loading: false,
};

const checkinStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true,
  });
};

const checkinSuccess = (state, action) => {
  return updateObject(state, {
    data: action.data,
    error: null,
    loading: false,
  });
};

const checkinFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionsTypes.CHECK_START:
      return checkinStart(state, action);
    case actionsTypes.CHECK_SUCCESS:
      console.log('checkinOK');
      return checkinSuccess(state, action);
    case actionsTypes.CHECK_FAIL:
      return checkinFail(state, action);
    default:
      return state;
  }
};

export default reducer;
