import * as types from "../types";

const initialState = {
  movie: {},
  filteredList: [],
  chosenIds: [],
  novoarray: [],
  filtered: [],
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
    case types.FILTERED_LIST:
      console.log("payload", action.payload.id);

      let idAlreadyExists = state.filteredList.findIndex(
        (i) => i.id === action.payload.id
      ) > -1;
      let filteredList = state.filteredList.slice();
      console.log("ja existe?", idAlreadyExists);

      if (idAlreadyExists) {
        filteredList = filteredList.filter((obj) => obj.id != action.payload.id);
      } else {
        // modify the COPY, not the original
        filteredList.push(action.payload);
      }

      return {
        ...state,
        filteredList: filteredList,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};
