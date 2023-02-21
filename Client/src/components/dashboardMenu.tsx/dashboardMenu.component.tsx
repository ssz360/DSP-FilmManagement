import { Nav } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";

function DashboardMenuComponent() {
  return (
    <div className="main-header">
      <a className="menu-link-main" href="#">
        Menu:
      </a>
      <div className="header-menu">
        <NavLink className="main-header-link" to="/dashboard/your-films">
          Your Films
        </NavLink>
        <NavLink className="main-header-link" to="/dashboard/add-film">
          Add New Film
        </NavLink>
        <NavLink className="main-header-link" to="/dashboard/issued-invitations">
          List of invitations
        </NavLink>
        <NavLink className="main-header-link" to="/dashboard/reviewed-films">
          Reviewed films
        </NavLink>
        <NavLink className="main-header-link" to="/dashboard/online-users">
          Online Users
        </NavLink>
      </div>
    </div>
  );
}

export default DashboardMenuComponent;
