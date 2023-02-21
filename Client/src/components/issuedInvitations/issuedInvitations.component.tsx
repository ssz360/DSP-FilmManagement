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
                <svg viewBox="0 0 52 52" className="style2">
                  <g xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M40.824 52H11.176C5.003 52 0 46.997 0 40.824V11.176C0 5.003 5.003 0 11.176 0h29.649C46.997 0 52 5.003 52 11.176v29.649C52 46.997 46.997 52 40.824 52z"
                      fill="#061e26"
                      data-original="#393687"
                    />
                    <path
                      d="M12.16 39H9.28V11h9.64c2.613 0 4.553.813 5.82 2.44 1.266 1.626 1.9 3.76 1.9 6.399 0 .934-.027 1.74-.08 2.42-.054.681-.22 1.534-.5 2.561-.28 1.026-.66 1.866-1.14 2.52-.48.654-1.213 1.227-2.2 1.72-.987.494-2.16.74-3.52.74h-7.04V39zm0-12h6.68c.96 0 1.773-.187 2.44-.56.666-.374 1.153-.773 1.46-1.2.306-.427.546-1.04.72-1.84.173-.801.267-1.4.28-1.801.013-.399.02-.973.02-1.72 0-4.053-1.694-6.08-5.08-6.08h-6.52V27zM29.48 33.92l2.8-.12c.106.987.6 1.754 1.48 2.3.88.547 1.893.82 3.04.82s2.14-.26 2.98-.78c.84-.52 1.26-1.266 1.26-2.239s-.36-1.747-1.08-2.32c-.72-.573-1.6-1.026-2.64-1.36-1.04-.333-2.086-.686-3.14-1.06a7.36 7.36 0 01-2.78-1.76c-.987-.934-1.48-2.073-1.48-3.42s.54-2.601 1.62-3.761 2.833-1.739 5.26-1.739c.854 0 1.653.1 2.4.3.746.2 1.28.394 1.6.58l.48.279-.92 2.521c-.854-.666-1.974-1-3.36-1-1.387 0-2.42.26-3.1.78-.68.52-1.02 1.18-1.02 1.979 0 .88.426 1.574 1.28 2.08.853.507 1.813.934 2.88 1.28 1.066.347 2.126.733 3.18 1.16 1.053.427 1.946 1.094 2.68 2s1.1 2.106 1.1 3.6c0 1.494-.6 2.794-1.8 3.9-1.2 1.106-2.954 1.66-5.26 1.66-2.307 0-4.114-.547-5.42-1.64-1.307-1.093-1.987-2.44-2.04-4.04z"
                      fill="#c1dbe6"
                      data-original="#89d3ff"
                    />
                  </g>
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
