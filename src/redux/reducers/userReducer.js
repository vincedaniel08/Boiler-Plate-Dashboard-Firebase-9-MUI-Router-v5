import * as actionTypes from "../types";

const initialState = {
  displayName: "",
  currentUserData: [""],
  motors: [""],
  users: [],
  products: [],
  newsBlogs: [],
  orders: [],
  finances: [],
  error: null,
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_MY_DATA:
      return {
        ...state,
        currentUserData: action.payload,
      };
    case actionTypes.SET_MOTOR:
      return {
        ...state,
        motors: action.payload,
      };
    case actionTypes.SET_USER:
      return {
        ...state,
        users: action.payload,
      };
    case actionTypes.SET_PRODUCT:
      return {
        ...state,
        products: action.payload,
      };
    case actionTypes.SET_NEWS_BLOGS:
      return {
        ...state,
        newsBlogs: action.payload,
      };
      case actionTypes.SET_ORDERS:
      return {
        ...state,
        orders: action.payload,
      };
      case actionTypes.SET_FINANCE:
        return {
          ...state,
          finances: action.payload,
        };
    case actionTypes.USER_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
}

export default userReducer;
