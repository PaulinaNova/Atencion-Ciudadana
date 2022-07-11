import React, { useState, useEffect } from "react";
import * as FaIcons from "react-icons/fa";
import * as IoIcons from "react-icons/io";
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import { SidebarDataGestor } from "./SidebarDataGestor";
import "./Navbar.css";
import { IconContext } from "react-icons";
import AuthService from "../../services/auth.service";

export const Navbar = () => {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  const [currentisAdmin, setCurrentisAdmin] = useState();

  useEffect(() => {
    const isAdmin = AuthService.getCurrentisAdmin();
    if (isAdmin) {
      setCurrentisAdmin(isAdmin);
    }
  }, []);

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="navbar">
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items">
            <li className="navbar-toggle">
              <p>Atención Ciudadana</p>
              <Link to="#" className="menu-bars">
                <FaIcons.FaBars onClick={showSidebar} />
              </Link>
            </li>
            {currentisAdmin
              ? SidebarData.map((item, index) => {
                  return (
                    <li key={index} className={item.cName}>
                      <Link to={item.path}>
                        {item.icon}
                        <span>{item.title}</span>
                      </Link>
                    </li>
                  );
                })
              : SidebarDataGestor.map((item, index) => {
                  return (
                    <li key={index} className={item.cName}>
                      <Link to={item.path}>
                        {item.icon}
                        <span>{item.title}</span>
                      </Link>
                    </li>
                  );
                })}
            <li className="nav-text">
              <Link to={"/login"} reloadDocument >
                <IoIcons.IoIosLogOut />
                <span>Cerrar sesión</span>
              </Link>
            </li>
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
};

export default Navbar;
