import * as actionTypes from "../types";

export const setMyData = (myUserData) => async (dispatch) => {
  try {
    
    dispatch({ type: actionTypes.SET_MY_DATA, payload: myUserData });
  } catch (err) {
    dispatch({ type: actionTypes.USER_ERROR, payload: err });
  }
};

export const setMotors = (motors) => async (dispatch) => {
  try {
    
    dispatch({ type: actionTypes.SET_MOTOR, payload: motors });
  } catch (err) {
    dispatch({ type: actionTypes.USER_ERROR, payload: err });
  }
};

export const setUsers = (users) => async (dispatch) => {
  try {
    
    dispatch({ type: actionTypes.SET_USER, payload: users });
  } catch (err) {
    dispatch({ type: actionTypes.USER_ERROR, payload: err });
  }
};

export const setProducts = (products) => async (dispatch) => {
  try {
    
    dispatch({ type: actionTypes.SET_PRODUCT, payload: products });
  } catch (err) {
    dispatch({ type: actionTypes.USER_ERROR, payload: err });
  }
};

export const setNewsBlogs = (news) => async (dispatch) => {
  try {
    
    dispatch({ type: actionTypes.SET_NEWS_BLOGS, payload: news });
  } catch (err) {
    dispatch({ type: actionTypes.USER_ERROR, payload: err });
  }
};

export const setOrders = (orders) => async (dispatch) => {
  try {
    
    dispatch({ type: actionTypes.SET_ORDERS, payload: orders });
  } catch (err) {
    dispatch({ type: actionTypes.USER_ERROR, payload: err });
  }
};

export const setFinance = (finance) => async (dispatch) => {
  try {
    
    dispatch({ type: actionTypes.SET_FINANCE, payload: finance });
  } catch (err) {
    dispatch({ type: actionTypes.USER_ERROR, payload: err });
  }
};



