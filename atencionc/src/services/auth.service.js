import axios from "axios";

const login = async (userName, password) => {
  const response = await axios
        .post("api/auth/login", {
            userName,
            password,
        });
    if (response.data.accessToken) {
        localStorage.setItem("gestor", JSON.stringify(response.data));
    }
    return response.data;
};

const logout = () => {
  localStorage.removeItem("gestor");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("gestor"));
};

const authService = {
  login,
  logout,
  getCurrentUser,
};

export default authService;