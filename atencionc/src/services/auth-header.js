export default function authHeader() {
  const gestor = JSON.parse(localStorage.getItem("gestor"));

  if (gestor && gestor.accessToken) {
    // return { Authorization: 'Bearer ' + user.accessToken };
    return { "x-auth-token": gestor.accessToken };
  } else {
    return {};
  }
}