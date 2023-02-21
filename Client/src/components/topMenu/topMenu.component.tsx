import { useEffect, useReducer, useState } from "react";
import { Button } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import {
  getGlobalUser,
  setGlobalUser,
  setWebsocketMessages_activeFilms,
  setWebsocketMessages_onlineUsers,
  websocketMessages_activeFilms,
  websocketMessages_onlineUsers,
} from "../../global/variables.global";
import {
  UserModel,
  WebsocketMessageModel,
} from "../../open_api_models/data-contracts";
import { User } from "../../open_api_models/User";
import { subscribeEvent, unsubscribeEvent } from "../../services/event.service";
import { WebsocketService } from "../../services/websocket.service";
import "./topMenu.component.css";

let websocket: WebsocketService;

function TopMenuComponent() {
  const [user, setUser] = useState<UserModel>();

  let userApi = new User();

  useEffect(() => {
    checkIfUserLoggedIn();
    // checkInvitations();
    if (!websocket) {
      websocket = new WebsocketService();
    }

    unsubscribeEvent("new_wc_message", onNewMessage);
    subscribeEvent("new_wc_message", onNewMessage);
    unsubscribeEvent("user_changed", unUserChange);
    subscribeEvent("user_changed", unUserChange);
  }, []);

  function onNewMessage(message: any) {
    const data: WebsocketMessageModel = message.detail;
    if (data.typeMessage == "login") {
      const user = websocketMessages_onlineUsers.find(
        (x) => x.userId == data.userId
      );
      if (!user) {
        websocketMessages_onlineUsers.push(data);
      }
    } else if (data.typeMessage == "logout") {
      const user = websocketMessages_onlineUsers.find(
        (x) => x.userId == data.userId
      );
      if (user) {
        const userIndex = websocketMessages_onlineUsers.indexOf(user);
        websocketMessages_onlineUsers.splice(
          websocketMessages_onlineUsers.indexOf(userIndex as any),
          1
        );
      }
    } else if (data.typeMessage == "snapshot_online") {
      setWebsocketMessages_onlineUsers((data as any).data);
    } else if (data.typeMessage == "snapshot_activeFilms") {
      setWebsocketMessages_activeFilms((data as any).data);
    } else if (data.typeMessage == "update") {
      const element = websocketMessages_activeFilms.find(
        (x) => x.userId == data.userId && x.filmId == data.filmId
      );
      if (element) {
        websocketMessages_activeFilms.splice(
          websocketMessages_activeFilms.indexOf(element as any),
          1
        );
      } else {
        websocketMessages_activeFilms.push(data);
      }
    }
  }

  function unUserChange(e) {
    setUser((user) => {
      return { ...e.detail };
    });
  }

  function checkIfUserLoggedIn() {
    let gUser = getGlobalUser();
    if (!gUser) {
      userApi.getIfUserLoggedIn({ credentials: "include" }).then((res) => {
        const { isLoggedIn, user } = res.data;
        if (isLoggedIn) {
          setGlobalUser(user);
        }
      });
    }
  }

  function logout() {
    userApi.logout({ credentials: "include" });
    setGlobalUser(undefined);
  }

  return (
    <div className="header">
      <div className="menu-circle"></div>
      {user?.id ? (
        <div className="header-menu">
          <div className="menu-user-info">Hello {user.name}</div>
          <Button variant="danger" size="sm" onClick={() => logout()}>
            Logout
          </Button>
          <NavLink to={"/home"} className="menu-link ">
            Home
          </NavLink>
          <NavLink to={"/dashboard/your-films"} className="menu-link ">
            Dashboard
          </NavLink>
          <NavLink to={"/your-invitations"} className="menu-link notify">
            Invitations
          </NavLink>
        </div>
      ) : (
        <div className="header-menu">
          <NavLink to={"/login"} className="menu-link ">
            Login
          </NavLink>
          <NavLink to={"/register"} className="menu-link ">
            Register
          </NavLink>
        </div>
      )}
    </div>
  );
}
export default TopMenuComponent;
