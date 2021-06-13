import * as types from "../types";

const initialState = {
  movie: {},
  postdetails: [],
  posts: [],  
  post: {},
  loading: false,
  error: null,
};

export const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false,
        error: null,
      };
    case types.GET_POSTS_DETAILS:
      return {
        ...state,
        postdetails: action.payload,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};
