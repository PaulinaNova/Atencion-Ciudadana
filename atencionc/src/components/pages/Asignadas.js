import React, {useEffect, useState}from "react";
import TblAsignadas from "../TableAsignadas/TblAsignadas";
import AuthService from "../../services/auth.service";

export const Asignadas = () => {
  const [currentuserName, setCurrentUserName] = useState();

  useEffect(() => {
    const userName = AuthService.getCurrentUserName();
    if (userName) {
      setCurrentUserName(userName);
    }
  }, []);

  return (
    <div className="asignadas">
      <div className="asignadasH">
        <h3>Gestiones Asignadas</h3>
        <TblAsignadas cadena={"ASIGNADAS"} gestor={currentuserName} />
      </div>
    </div>
  );
};

export default Asignadas;
