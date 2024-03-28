import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOut, faUser } from "@fortawesome/free-solid-svg-icons";
export default function DashSidebar() {
  return (
    <div>
      <div className="conOfSidbar">
        <div className="conOfSidbarChild">
          <FontAwesomeIcon icon={faUser} className="iconSlide" />
          <div>Dashboard</div>
          <div className="catUser">User</div>
        </div>
        <div className="conOfSidbarChild">
          <FontAwesomeIcon icon={faSignOut} className="iconSlide" />
          <div>sign Out</div>
        </div>
      </div>
    </div>
  );
}
