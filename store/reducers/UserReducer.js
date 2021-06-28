import * as types from "../types";

const initialState = {
  userdetails: [],
  users: [],
  user: {},
  modifiedUsers: [],
  loading: false,
  error: null,
};

export const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false,
        error: null,
      };
    case types.GET_USER_DETAILS:
      return {
        ...state,
        userdetails: action.payload,
        loading: false,
        error: null,
      };
    case types.UPDATE_USER:
    
    const userId = parseInt(action.payload.id);
    console.log("userID", typeof(userId));
    let modifiedUsersList = state.users.data.slice();

    const indexUser = modifiedUsersList.findIndex((i) => i.id === userId);
    console.log("indexUser", indexUser);
    modifiedUsersList.splice(indexUser, 1, {
      id: userId, 
      email: action.payload.email, 
      first_name: action.payload.first_name, 
      last_name: action.payload.last_name, 
      avatar: action.payload.avatar
    });
    console.log("modi", modifiedUsersList);

      return {
        ...state,
        modifiedUsers: modifiedUsersList,
        loading: false,
        error: null,
      };
    
    default:
      return state;
  }
};
