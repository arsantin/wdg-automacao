import * as types from "../types";
import axios from "axios";

export const loginUser = (data) => async (dispatch) => {
  axios
    .post("https://reqres.in/api/login", data)
    .then(function (response) {
      const token = response.data.token;
      console.log("token recebido", token);
      if (token) {
        let config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        axios
          .get("https://reqres.in/api/users?delay=2", config)
          .then((response) => {
            console.log(response);
            dispatch({
              type: types.GET_USERS,
              payload: response.data,
            });
            window.location = "/users"
          })
          .catch(() => {});
      }
    })
    .catch(function (error) {
      console.error(error);
      alert("login ou senha inválidos");
    });
};

export const fetchUserDetails = (id) => async (dispatch) => {

  const idUser = id.id;

  console.log(idUser)
  
  const res = await fetch(
    `https://reqres.in/api/users/${idUser}`
  );
  console.log("res", res);

  const userInfo = await res.json();
  console.log("info", userInfo);

  dispatch({
    type: types.GET_USER_DETAILS,
    payload: userInfo,
  });
};

export const atualizaUsuario = (id, data) => async (dispatch) => {
  const obj = {
    id: id.id,
    email: data.email,
    first_name: data.firstname,
    last_name: data.lastname,
    avatar: data.avatar
    };   

  dispatch({
    type: types.UPDATE_USER,
    payload: obj,
  });
  window.location = "/users"
};

export const removeCategoriaFiltrada = (id, name) => async (dispatch) => {
  const obj = {
    id: id,
    name: name,
  };
  dispatch({
    type: types.FILTERED_LIST_REMOVE,
    payload: obj,
  });
};
