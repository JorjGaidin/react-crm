import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { sendMessage } from "../store/actions";
import { AppState } from "../store";
import { callApi, login } from "../middleware/api";
import { listCustomers, getCustomer, deleteCustomer } from "../actions/customer";
import { signIn, signOut } from "../actions/auth";

import { LIST_CUSTOMER, GET_CUSTOMER, DELETE_CUSTOMER, ApiAction, SIGN_IN, SIGN_OUT } from "../store/types";

export const thunkSendMessage = (
  message: string
): ThunkAction<void, AppState, null, Action<string>> => async dispatch => {
  const asyncResp = await exampleAPI();
  dispatch(
    sendMessage({
      message,
      user: asyncResp,
      timestamp: new Date().getTime()
    })
  );
};

function exampleAPI() {
  return Promise.resolve("Async Chat Bot");
}


export const thunkAuth= (
  apiAction?: ApiAction
): ThunkAction<void, AppState, null, Action<string>> => async dispatch => {
  const { type, endpoint, method, data, filters } = apiAction;
  const response = await login(endpoint, method, data)
  console.log(response)
  dispatchSignIn(dispatch, type, response);
};


function dispatchSignIn( dispatch, type,response) {

  switch (type) {
    case SIGN_IN:
      dispatch(
        signIn(response.data)
      );
      break;
    case SIGN_OUT:
      dispatch(
         getCustomer(response.data)
      );
      break;
    case DELETE_CUSTOMER:
      dispatch(
           deleteCustomer(response.data)
      );
      break;

  }
}

export const thunkSearch = (
  apiAction?: ApiAction
): ThunkAction<void, AppState, null, Action<string>> => async dispatch => {
  const { type, endpoint, method, data, filters } = apiAction;
  const response = await callApi(endpoint, method, data, filters)
  console.log(response)

  dispatchReponse(dispatch, type, response);
};


function dispatchReponse( dispatch, type,response) {

  switch (type) {
    case LIST_CUSTOMER:
      dispatch(
        listCustomers(response.data)
      );
      break;
    case GET_CUSTOMER:
      dispatch(
         getCustomer(response.data)
      );
      break;
    case DELETE_CUSTOMER:
      dispatch(
           deleteCustomer(response.data)
      );
      break;

  }
}








