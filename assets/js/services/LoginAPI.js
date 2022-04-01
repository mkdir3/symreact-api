import axios from "axios";
import jwtDecode from "jwt-decode";

function setAxiosToken(token) {
  axios.defaults.headers["Authorization"] = "Bearer " + token;
}

function deleteAxiosToken() {
  delete axios.defaults.headers["Authorization"];
}

function login(credentials) {
  return axios
    .post("https://localhost:8000/api/login_check", credentials)
    .then((response) => response.data.token)
    .then((token) => {
      window.localStorage.setItem("authToken", token);
      setAxiosToken(token);
    });
}

function logout() {
  window.localStorage.removeItem("authToken");
  deleteAxiosToken();
}

function setup() {
  const token = window.localStorage.getItem("authToken");

  if (token) {
    const { exp: expiration } = jwtDecode(token);
    if (expiration * 1000 > new Date().getTime()) {
      setAxiosToken(token);
    }
  }
}

export default {
  login,
  logout,
  setup,
};
