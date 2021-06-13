import * as types from "../types";
import axios from "axios";

export const fetchposts = () => async (dispatch) => {
  const moviesArray = [];
  const res = await axios.get(
    "https://api.themoviedb.org/3/movie/popular?api_key=1cafedf2a856620e3b3fa86798661fe8&page=1"
  );
  console.log(res.data);
  const movies = moviesArray.push(res.data);

  dispatch({
    type: types.GET_POSTS,
    payload: res.data,
  });
};

export const fetchpostdetails = (id) => async (dispatch) => {  
    const idMovie = id.id     
    const res = await fetch(`https://api.themoviedb.org/3/movie/${idMovie}?api_key=1cafedf2a856620e3b3fa86798661fe8`);
    const show = await res.json();
    console.log("show", JSON.stringify(show));
  dispatch({
    type: types.GET_POSTS_DETAILS,
    payload: show,
  });
};
