import axios from "axios";
import * as actionTypes from "./actionTypes";



export const checkStart = () => {
    return {
      type: actionTypes.CHECK_START
    };
  };
  
  export const checkSuccess = data => {
    return {
      type: actionTypes.CHECK_SUCCESS,
      data
    };
  };
  
  export const checkFail = error => {
    return {
      type: actionTypes.CHECK_FAIL,
      error: error
    };
  };


export const checkInUser = (uid,bid, mid, cd) => {
    return dispatch => {
      dispatch(checkStart());
      axios
        .get("/member/cfmatt/"+uid+bid+mid+cd)
        .then(res => {
          const data = res.data;
          dispatch(checkSuccess(data));
        })
        .catch(err => {
          dispatch(checkFail(err));
        });
    };
  };
  