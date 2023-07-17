const {
  LOAD_USER,
  SUCC_USER,
  FAIL_USER,
  CURRENT_USER,
  LOGOUT_USER,
} = require("../ActionTypes/user");

const initialState = {
  userInfo: null,
  loadUser: false,
  errors: [],
  isAuth: false,
};
const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOAD_USER:
      return { ...state, loadUser: true };
    case SUCC_USER:
      return { ...state, loadUser: false, userInfo: payload, isAuth: true };
    case FAIL_USER:
      return { ...state, loadUser: false, errors: payload };
    case CURRENT_USER:
      return { ...state, loadUser: false, userInfo: payload, isAuth: true };
    case LOGOUT_USER:
      return { userInfo: null, loadUser: false, errors: [], isAuth: false };
    default:
      return state;
  }
};
export default userReducer;
