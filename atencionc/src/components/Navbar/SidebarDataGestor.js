import React from "react";
import * as IoIcons from "react-icons/io";
import * as AiIcons from "react-icons/ai";
import AuthService from "../../services/auth.service";

const logOut = () => {
  AuthService.logout();
};

export const SidebarDataGestor = [
  {
    title: "Asignadas",
    path: "/asignadas",
    icon: <AiIcons.AiFillAlert />,
    cName: "nav-text",
  },

  {
    title: "Buscar",
    path: "/buscarGestor",
    icon: <IoIcons.IoIosSearch />,
    cName: "nav-text",
  },
  {
    title: "Seguimiento",
    path: "/seguimientoGestor",
    icon: <AiIcons.AiOutlineArrowRight />,
    cName: "nav-text",
  },
  {
    title: "Cerrar sesión",
    path: "/",
    icon: <IoIcons.IoMdLogOut />,
    cName: "nav-text",
    onclick: logOut,
  },
];
