import axios from "axios";

const login = async (userName, password) => {
  const response = await axios.post("/api/auth/login", {
    userName,
    password,
  });
  if (response.data.accessToken) {
    localStorage.setItem("gestor", JSON.stringify(response.data));
    localStorage.setItem("userName", JSON.stringify(response.data.userName));
    localStorage.setItem("isAdmin", JSON.stringify(response.data.isAdmin));
  }
  return response.data;
};

const getCurrentUser = () => {
  return localStorage.getItem("gestor");
};
const getCurrentUserName = () => {
  return JSON.parse(localStorage.getItem("userName"));
};
const getCurrentisAdmin = () => {
  return JSON.parse(localStorage.getItem("isAdmin"));
};

const AuthService = {
  login,
  getCurrentUser,
  getCurrentUserName,
  getCurrentisAdmin,
};

export default AuthService;
