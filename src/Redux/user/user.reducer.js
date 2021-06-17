import userTypes from './user.types';

const initialState = {
  userExists: false,
  userName: null,
  userEmail: null,
  userRole: 'customer',
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case userTypes.USER_LOGIN:
      return {
        ...state,
        userExists: true,
        userName: action.payload.name,
        userEmail: action.payload.email,
        userRole: action.payload.role,
      };
    case userTypes.USER_LOGOUT:
      return {
        ...state,
        userExists: false,
        userName: null,
        userEmail: null,
        userRole: 'customer',
      };
    default:
      return state;
  }
};

export default userReducer;
