import { combineReducers } from "redux";
import { genreReducer } from "./genreReducer";
import { postReducer } from "./postReducer";

const reducer = combineReducers({
  genre: genreReducer,
  post: postReducer,
});

export default reducer;
