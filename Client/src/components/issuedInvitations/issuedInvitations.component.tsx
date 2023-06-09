import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { InvitationModel } from "../../open_api_models/data-contracts";
import { Invitation } from "../../open_api_models/Invitation";

function IssuedInvitationsComponent() {
  const [invitations, setInvitations] = useState<InvitationModel[]>();

  const invitationApi = new Invitation();
  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const invitations = (
      await invitationApi.getListOfIssuedInvitations({ credentials: "include" })
    ).data;
    setInvitations(invitations);
  }

  async function cancelHandler(invitation: InvitationModel) {
    await invitationApi.deleteAnInvitation(invitation.id as any, {
      credentials: "include",
    });
    getData();
  }

  return (
    <Container>
      <div>
        <div className="content-section-title">Issued Invitations</div>
        <ul>
          {invitations?.map((invitation) => (
            <li className="adobe-product">
              <div className="products">
                <svg
                className="svg-ico"
                  id="Layer_1"
                  data-name="Layer 1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 122.88 118.1"
                >
                  <title>newsletter</title>
                  <path d="M115.17,33.29a3.8,3.8,0,0,1,2.49-.92,4.19,4.19,0,0,1,2.14.62,5.82,5.82,0,0,1,1.32,1.12,7.37,7.37,0,0,1,1.76,4.44v73.64a5.87,5.87,0,0,1-1.73,4.16h0A5.9,5.9,0,0,1,117,118.1H5.91a5.91,5.91,0,0,1-4.17-1.73h0A5.9,5.9,0,0,1,0,112.19V38.55a7.41,7.41,0,0,1,1.8-4.5A5.52,5.52,0,0,1,3.12,33a4.05,4.05,0,0,1,2.1-.6,3.68,3.68,0,0,1,2,.59l.2.17v-26a7.1,7.1,0,0,1,2.08-5h0a7.1,7.1,0,0,1,5-2.08h93.54a7.08,7.08,0,0,1,5,2.08,2.25,2.25,0,0,1,.21.24,7,7,0,0,1,1.87,4.77v26.2ZM70.85,43a3,3,0,0,1,0-6H83.64a3,3,0,0,1,0,6ZM39,43a3,3,0,0,1,0-6H51.77a3,3,0,0,1,0,6ZM54.2,60a3,3,0,0,1,0-6.05H68.42a3,3,0,0,1,0,6.05ZM27.86,26.07a3,3,0,0,1,0-6.05H42.29a3,3,0,0,1,0,6.05Zm52.48,0a3,3,0,0,1,0-6.05H94.77a3,3,0,0,1,0,6.05Zm-24.11,0a3,3,0,0,1,0-6.05h10a3,3,0,0,1,0,6.05ZM13.71,38.65,48.64,69.86l.15.14L60.84,80.76l48.08-42V7.09a.89.89,0,0,0-.17-.51l-.08-.08a.84.84,0,0,0-.59-.25H14.54A.84.84,0,0,0,14,6.5a.83.83,0,0,0-.24.59V38.65ZM114.56,41.4a3.09,3.09,0,0,1-1,.87L79.85,71.72l37.31,32.7h0V39.12l-2.6,2.28ZM58.92,86.68,46.81,75.86l-41.09,36v.33a.17.17,0,0,0,0,.13h0a.17.17,0,0,0,.13,0H117a.17.17,0,0,0,.13,0h0a.17.17,0,0,0,0-.13V112L75.52,75.5,62.7,86.7h0a2.85,2.85,0,0,1-3.78,0ZM42.52,72,5.72,39.15v65.13L42.52,72Z"></path>
                </svg>
                {invitation.invitedUser?.name} invited to review{" "}
                {invitation.film?.title}
              </div>
              {invitation.completed ? (
                <span className="status">
                  <span className="status-circle green"></span>
                  Completed
                </span>
              ) : (
                <span className="status">
                  <span className="status-circle red"></span>
                  Not Completed
                </span>
              )}
              <div className="button-wrapper">
                {invitation.completed ? (
                  <></>
                ) : (
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => cancelHandler(invitation as any)}
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Container>
  );
}

export default IssuedInvitationsComponent;
