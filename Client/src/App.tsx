import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Nav from "react-bootstrap/Nav";
import LoginPage from "./pages/login/login.page";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import DashboardPage from "./pages/dashboard/dashboard.page";
import MainPage from "./pages/main/main.page";
import { useEffect, useState } from "react";
import { User } from "./open_api_models/User";
import {
  getGlobalUser,
  setGlobalUser,
  setWebsocketMessages_activeFilms,
  setWebsocketMessages_onlineUsers,
  websocketMessages_activeFilms,
  websocketMessages_onlineUsers,
} from "./global/variables.global";
import {
  InvitationModel,
  LoginResponse,
  WebsocketMessageModel,
} from "./open_api_models/data-contracts";
import { subscribeEvent, unsubscribeEvent } from "./services/event.service";
import { NavLink } from "react-router-dom";
import { Alert,  Navbar } from "react-bootstrap";
import AddFilmPage from "./pages/addFilm/addFilm.page";
import InviteUserPage from "./pages/inviteUser/inviteUser.page";
import EditFilmPage from "./pages/editFilm/editFilm.page";
import FilmPage from "./pages/film/film.page";
import UserInvitationsPage from "./pages/userInvitations/userInvitations.page";
import { Invitation } from "./open_api_models/Invitation";
import ReviewedFilmsPage from "./pages/reviewedFilms/reviewedFilms.page";
import { WebsocketService } from "./services/websocket.service";
import OnlineUsersPage from "./pages/onlineUsers/onlineUsers";
import RegisterPage from "./pages/register/register.page";
import React from "react";

let websocket: WebsocketService;

function App() {
  const [user, setUser] = useState<LoginResponse>();
  const [invitations, setInvitations] = useState<InvitationModel[]>();
  let userApi = new User();
  const invitationApi = new Invitation();

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
    whenUserLoggedIn(e.detail);
    checkInvitations();
  }

  function checkIfUserLoggedIn() {
    let gUser = getGlobalUser();
    if (!gUser) {
      userApi.getIfUserLoggedIn({ credentials: "include" }).then((res) => {
        const { isLoggedIn, user } = res.data;
        if (isLoggedIn) {
          setGlobalUser(user as LoginResponse);
        }
      });
    }
  }

  function whenUserLoggedIn(user: LoginResponse) {
    setUser(user);
  }

  async function checkInvitations() {
    const result = await invitationApi.getListOfInvitations({
      credentials: "include",
    });

    setInvitations(result.data);
  }

  function logout() {
    userApi.logout({ credentials: "include" });
    setGlobalUser(undefined);
  }

  return (
    <div className="App">
      <BrowserRouter>
        {invitations?.map((invitation) => {
          if (!invitation.done) {
            return (
              <Alert className="invitation-alert" key={invitation.id} variant="warning">
                {invitation.issuer?.name} invited you to review{" "}
                {invitation.film?.title}{" "}
                <Link to={"/film/" + invitation.filmId + "#review"}>
                  write a review
                </Link>
              </Alert>
            );
          }
        })}

        <Navbar className="justify-content-end" bg="light" variant="light">
          <Nav>
            {user ? (
              <>
                <Nav.Item>
                  <Nav.Link as={NavLink} to={"/user/dashboard"}>
                    Hello {user?.name}
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link as={Link} to={"/login"} onClick={logout}>
                    Logout
                  </Nav.Link>
                </Nav.Item>
              </>
            ) : (
              <>
                <Nav.Item>
                  <Nav.Link as={NavLink} to="/login">
                    Login
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link as={NavLink} to="/register">
                    Register
                  </Nav.Link>
                </Nav.Item>
              </>
            )}
          </Nav>
        </Navbar>

        <Routes>
          <Route path="user">
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="add-film" element={<AddFilmPage />} />
            <Route path="invite-user/:filmId" element={<InviteUserPage />} />
            <Route path="edit-film/:id" element={<EditFilmPage />} />
            <Route path="reviewed-films" element={<ReviewedFilmsPage />} />
            <Route path="online-users" element={<OnlineUsersPage />} />
            <Route
              path="issued-invitations"
              element={<UserInvitationsPage />}
            />
          </Route>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="film/:id" element={<FilmPage />} />
          <Route path="/" element={<MainPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
