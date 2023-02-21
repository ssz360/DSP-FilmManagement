import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { InvitationModel } from "../../open_api_models/data-contracts";
import { Invitation } from "../../open_api_models/Invitation";
import { unsubscribeEvent, subscribeEvent } from "../../services/event.service";

function UserInvitationsComponent() {
  const [invitations, setInvitations] = useState<InvitationModel[]>();
  const invitationApi = new Invitation();

  useEffect(() => {
    checkInvitations();
    unsubscribeEvent("user_changed", unUserChange);
    subscribeEvent("user_changed", unUserChange);
  }, []);

  function unUserChange(e) {
    checkInvitations();
  }

  async function checkInvitations() {
    const result = await invitationApi.getListOfInvitations({
      credentials: "include",
    });

    setInvitations(result.data.filter((x) => x.completed === false));
  }

  return (
    <div className="your-invitations-container">
      {invitations?.map((invitation) => {
        return (
          <div key={invitation.id} className="content-wrapper-header">
            <div className="content-wrapper-context invitation-con">
              <h3 className="img-content">
                <svg viewBox="0 0 512 512">
                  <path
                    d="M467 0H45C20.099 0 0 20.099 0 45v422c0 24.901 20.099 45 45 45h422c24.901 0 45-20.099 45-45V45c0-24.901-20.099-45-45-45z"
                    fill="#d6355b"
                    data-original="#ff468c"
                  />
                  <path
                    xmlns="http://www.w3.org/2000/svg"
                    d="M512 45v422c0 24.901-20.099 45-45 45H256V0h211c24.901 0 45 20.099 45 45z"
                    fill="#d6355b"
                    data-original="#d72878"
                  />
                  <path
                    xmlns="http://www.w3.org/2000/svg"
                    d="M467 30H45c-8.401 0-15 6.599-15 15v422c0 8.401 6.599 15 15 15h422c8.401 0 15-6.599 15-15V45c0-8.401-6.599-15-15-15z"
                    fill="#2e000a"
                    data-original="#700029"
                  />
                  <path
                    xmlns="http://www.w3.org/2000/svg"
                    d="M482 45v422c0 8.401-6.599 15-15 15H256V30h211c8.401 0 15 6.599 15 15z"
                    fill="#2e000a"
                    data-original="#4d0e06"
                  />
                  <path
                    xmlns="http://www.w3.org/2000/svg"
                    d="M181 391c-41.353 0-75-33.647-75-75 0-8.291 6.709-15 15-15s15 6.709 15 15c0 24.814 20.186 45 45 45s45-20.186 45-45-20.186-45-45-45c-41.353 0-75-33.647-75-75s33.647-75 75-75 75 33.647 75 75c0 8.291-6.709 15-15 15s-15-6.709-15-15c0-24.814-20.186-45-45-45s-45 20.186-45 45 20.186 45 45 45c41.353 0 75 33.647 75 75s-33.647 75-75 75z"
                    fill="#d6355b"
                    data-original="#ff468c"
                  />
                  <path
                    xmlns="http://www.w3.org/2000/svg"
                    d="M391 361h-30c-8.276 0-15-6.724-15-15V211h45c8.291 0 15-6.709 15-15s-6.709-15-15-15h-45v-45c0-8.291-6.709-15-15-15s-15 6.709-15 15v45h-15c-8.291 0-15 6.709-15 15s6.709 15 15 15h15v135c0 24.814 20.186 45 45 45h30c8.291 0 15-6.709 15-15s-6.709-15-15-15z"
                    fill="#d6355b"
                    data-original="#d72878"
                  />
                </svg>
                {invitation.issuedBy.name} invites you
              </h3>
              <div className="content-text text-left">
                {invitation.issuedBy.name} invites you to review '
                {invitation.film.title}' which is a movie that is gotten the
                rating of {invitation.film.rating} by the user and he wants to
                kow your opinion too.
              </div>
              <div>
                <Link
                  to={"/dashboard/film/" + invitation.filmId}
                  className="content-button"
                >
                  Write a review
                </Link>
              </div>
            </div>
            <img
              className="content-wrapper-img"
              src="https://assets.codepen.io/3364143/glass.png"
              alt=""
            />
          </div>
        );
      })}
    </div>
  );
}

export default UserInvitationsComponent;
