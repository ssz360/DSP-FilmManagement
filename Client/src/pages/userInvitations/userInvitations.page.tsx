import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DashboardSideMenuComponent from "../../components/dashboardSideMenu/dashboardSideMenu.component";
import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { InvitationModel } from "../../open_api_models/data-contracts";
import { Invitation } from "../../open_api_models/Invitation";
import React from "react";

function UserInvitationsPage() {
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
      <Row>
        <Col lg="4">
          <DashboardSideMenuComponent></DashboardSideMenuComponent>
        </Col>
        <Col lg="8">
          {invitations?.map((invitation) => (
            <Row key={invitation.id}>
              <Col>
                {invitation.reviewer?.name} is invited for
                {invitation.film?.title}
              </Col>
              <Col>
                {invitation.done ? (
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
              </Col>
            </Row>
          ))}
        </Col>
      </Row>
    </Container>
  );
}

export default UserInvitationsPage;
