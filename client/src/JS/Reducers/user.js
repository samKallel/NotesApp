const {
  LOAD_USER,
  SUCC_USER,
  FAIL_USER,
  CURRENT_USER,
  LOGOUT_USER,
  LOGIN_ADMIN,
  GET_USERS,
} = require("../ActionTypes/user");

//initialState
const initialState = {
  listUsers: [],
  user: null,
  loadUser: false,
  errors: [],
  isAuth: false,
  isAdmin: false,
};

// pure function
const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOAD_USER:
      return { ...state, loadUser: true };
    case SUCC_USER:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        loadUser: false,
        user: payload.user,
        isAuth: true,
        isAdmin: payload.isAdmin,
      };
    case CURRENT_USER:
      return {
        ...state,
        user: payload,
        loadUser: false,
        isAuth: true,
      };
    case LOGOUT_USER:
      localStorage.removeItem("token");
      return { user: null, loadUser: false, errors: [], isAuth: false };
    case FAIL_USER:
      return { ...state, loadUser: false, errors: payload };

    case GET_USERS:
      return { ...state, loadUser: false, listUsers: payload.listUsers };
    default:
      return state;
  }
};
export default userReducer;
