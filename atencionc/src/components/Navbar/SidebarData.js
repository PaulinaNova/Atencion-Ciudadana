import React from 'react'
import * as IoIcons from "react-icons/io";
import * as AiIcons from "react-icons/ai";

export const SidebarData = [
    {
        title: "Pendientes",
        path: "/",
        icon: <AiIcons.AiFillAlert />,
        cName: "nav-text"
    },
   
    {
        title: "Buscar",
        path: "/buscar",
        icon: <IoIcons.IoIosSearch />,
        cName: "nav-text"
    },
        {
        title: "Seguimiento",
        path: "/seguimiento",
        icon: <AiIcons.AiOutlineArrowRight />,
        cName: "nav-text"
    },
        {
        title: "Graficas",
        path: "/graficas",
        icon: <AiIcons.AiFillPieChart />,
        cName: "nav-text"
    },
        {
        title: "Reportes",
        path: "/reportes",
        icon: <AiIcons.AiFillFileText />,
        cName: "nav-text"
    },
      
     {
        title: "Gestores",
        path: "/gestores",
        icon: <IoIcons.IoIosPeople/>,
        cName: "nav-text"
    }
]