const {
  LOAD_USER,
  SUCC_USER,
  FAIL_USER,
  CURRENT_USER,
  LOGOUT_USER,
} = require("../ActionTypes/user");

const initialState = {
  user: null,
  loadUser: false,
  errors: [],
  isAuth: false,
};

// pure function
const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOAD_USER:
      return { ...state, loadUser: true, isAuth: true };
    case SUCC_USER:
      localStorage.setItem("token", payload.token);
      return { ...state, loadUser: false, user: payload.user, isAuth: true };
    case CURRENT_USER:
      return { ...state, user: payload, loadUser: false, isAuth: true };
    case LOGOUT_USER:
      localStorage.removeItem("token");
      return { user: null, loadUser: false, errors: [], isAuth: false };
    case FAIL_USER:
      return { ...state, loadUser: false, errors: payload };

    default:
      return state;
  }
};
export default userReducer;
