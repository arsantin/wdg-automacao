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
      let idAlreadyExists =
        state.filteredList.findIndex((i) => i.id === action.payload.id) > -1;
      console.log("ja existe?", idAlreadyExists);
      let filteredList = state.filteredList.slice();

      if (idAlreadyExists) {
        console.log("ja existe");
        filteredList = filteredList.filter((obj) => obj != action.payload.id);
      } else {
        const ok = filteredList.push(action.payload);
        console.log(ok);
      }

      console.log("lista filtrada", filteredList);

      return {
        ...state,
        filteredList: filteredList,
        loading: false,
        error: null,
      };
      case types.FILTERED_LIST_REMOVE:
      let idExists =
        state.filteredList.findIndex((i) => i.id === action.payload.id) > -1;      
      let filteredL = state.filteredList.slice();

      if (idExists) {
        console.log("ja existe");
        const filteredIndex = filteredL.findIndex((i) => i.id === action.payload.id)
        console.log("index remove", filteredIndex);
        filteredL.splice(filteredIndex, 1);        
      }     

      return {
        ...state,
        filteredList: filteredL,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};
