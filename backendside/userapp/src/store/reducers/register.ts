import { CART_START, CART_SUCCESS, CART_FAIL } from "../actions/actionTypes";
import { updateObject } from "../utility";

type cartState = {
  shoppingCart: string,
  error: string,
  loading: boolean
}

const initialState:cartState = {
  shoppingCart: "",
  error: "",
  loading: false
};

const cartStart = (state:cartState, action:any) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const cartSuccess = (state:cartState, action:any) => {
  return updateObject(state, {
    shoppingCart: action.data,
    error: null,
    loading: false
  });
};

const cartFail = (state:cartState, action:any) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const reducer = (state = initialState, action:any) => {
  switch (action.type) {
    case CART_START:
      return cartStart(state, action);
    case CART_SUCCESS:
      return cartSuccess(state, action);
    case CART_FAIL:
      return cartFail(state, action);
    default:
      return state;
  }
};

export default reducer;