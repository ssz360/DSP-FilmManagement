import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import AddNewFilmComponent from "../addNewFilm/addNewFilm.component";
import DashboardMenuComponent from "../dashboardMenu.tsx/dashboardMenu.component";
import EditFilmComponent from "../editFilm/editFilm.component";
import IssuedInvitationsComponent from "../issuedInvitations/issuedInvitations.component";
import IssuingInvitationComponent from "../issuingInvitation/issuingInvitation.component";
import OnlineUsersComponent from "../onlineUsers/onlineUsers.component";
import ReviewedFilmsComponent from "../reviewedFilms/reviewedFilms.component";
import SingleFilmComponent from "../singleFilm/singleFilm.Component";
import YourFilmsComponent from "../yourFilms/yourFilms.component";


function DashboardComponent() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  let location = useLocation();
  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, [location]);
  return (
    <div>
      <DashboardMenuComponent></DashboardMenuComponent>

      <div className="content-wrapper">
        {/* <AlertComponent></AlertComponent> */}
        <div className="content-section">
          {/* <ListComponent></ListComponent> */}
          {currentPath.includes("/your-films") && (
            <YourFilmsComponent></YourFilmsComponent>
          )}
          {currentPath.includes("/dashboard/film/") && (
            <SingleFilmComponent></SingleFilmComponent>
          )}
          {currentPath.includes("/dashboard/edit-film/") && (
            <EditFilmComponent></EditFilmComponent>
          )}
          {currentPath.includes("/dashboard/invite-user/") && (
            <IssuingInvitationComponent></IssuingInvitationComponent>
          )}
          {currentPath.includes("/dashboard/add-film") && (
            <AddNewFilmComponent></AddNewFilmComponent>
          )}
          {currentPath.includes("/dashboard/issued-invitations") && (
            <IssuedInvitationsComponent></IssuedInvitationsComponent>
          )}
          {currentPath.includes("/dashboard/reviewed-films") && (
            <ReviewedFilmsComponent></ReviewedFilmsComponent>
          )}
          {currentPath.includes("/dashboard/online-users") && (
            <OnlineUsersComponent></OnlineUsersComponent>
          )}
        </div>
      </div>
    </div>
  );
}

export default DashboardComponent;
