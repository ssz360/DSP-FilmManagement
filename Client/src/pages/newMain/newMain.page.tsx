import "./newMain.page.css";
import LeftSideComponent from "../../components/leftSide/leftSide.component";
import TopMenuComponent from "../../components/topMenu/topMenu.component";
import DashboardMenuComponent from "../../components/dashboardMenu.tsx/dashboardMenu.component";
import LoginPage from "../login/login.page";
import YourFilmsComponent from "../../components/yourFilms/yourFilms.component";
import HomeComponent from "../../components/home/home.component";
import { useLocation } from "react-router";
import { useEffect, useState } from "react";
import DashboardComponent from "../../components/dashboard/dashboard.component";
import UserInvitationsComponent from "../../components/userInvitations/userInvitations.component";

function NewMainPage() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  let location = useLocation();
  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, [location]);
  return (
    <div className="page-container">
      <div className="video-bg">
        <video width="320" height="240" autoPlay={true} loop muted>
          <source
            src="https://assets.codepen.io/3364143/7btrrd.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="app">
        <TopMenuComponent></TopMenuComponent>

        <div className="wrapper">
          <LeftSideComponent></LeftSideComponent>

          <div className="main-container">
            {currentPath.includes("/home") ? (
              <HomeComponent></HomeComponent>
            ) : (
              <></>
            )}
            {currentPath.includes("/dashboard") ? (
              <DashboardComponent></DashboardComponent>
            ) : (
              <></>
            )}
            {currentPath.includes("/your-invitations") && (
              <UserInvitationsComponent></UserInvitationsComponent>
            )}
          </div>
        </div>
        <div className="overlay-app"></div>
      </div>
    </div>
  );
}

export default NewMainPage;
