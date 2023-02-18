import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { LoginResponse } from "../../open_api_models/data-contracts";
import { getGlobalUser } from "../../global/variables.global";
import SidebarOnlineUsersComponent from "../sidebarOnlineUsers/sidebarOnlineUsers.component";
import React from "react";

function DashboardSideMenuComponent() {
  const [user, setUser] = useState<LoginResponse>();

  useEffect(() => {
    setUser(getGlobalUser());
  }, []);

  return (
    <>
      <Nav className="flex-column">
        <Nav.Link as={NavLink} to="/">
          Public Films
        </Nav.Link>
        {user?.id ? (
          <>
            <Nav.Link as={NavLink} to="/user/dashboard">
              Your Films
            </Nav.Link>
            <Nav.Link as={NavLink} to="/user/add-film">
              Add New Film
            </Nav.Link>
            <Nav.Link as={NavLink} to="/user/issued-invitations">
              List of invitations
            </Nav.Link>
            <Nav.Link as={NavLink} to="/user/reviewed-films">
              Reviewed films
            </Nav.Link>
            <Nav.Link as={NavLink} to="/user/online-users">
              Online Users
            </Nav.Link>
          </>
        ) : (
          <></>
        )}
      </Nav>
      <SidebarOnlineUsersComponent></SidebarOnlineUsersComponent>
    </>
  );
}

export default DashboardSideMenuComponent;
