import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DashboardSideMenuComponent from "../../components/dashboardSideMenu/dashboardSideMenu.component";
import { Button, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import { User as UserApi } from "../../open_api_models/User";
import { UserModel } from "../../open_api_models/data-contracts";
import { Invitation } from "../../open_api_models/Invitation";
import { useParams } from "react-router-dom";
import React from "react";

function InviteUserPage() {
  const [users, setUsers] = useState<UserModel[]>();
  let selectedUsers: UserModel[] = [];

  const { filmId } = useParams();

  const userApi = new UserApi();
  const invitationApi = new Invitation();
  useEffect(() => {
    userApi.getAll().then((result) => setUsers(result.data));
  }, []);

  function onChbChange(isChecked: boolean, user: UserModel) {
    (user as any).isChecked = isChecked;

    if (isChecked) {
      selectedUsers.push(user);
    } else {
      selectedUsers.splice(selectedUsers.indexOf(user), 1);
    }
  }

  async function sendInvitationsHandler() {
    await invitationApi.issueNewInvitation(
      {
        filmId: filmId as any,
        invitedUserId: selectedUsers?.map((u) => u.id) as any,
      },
      { credentials: "include" }
    );
    selectedUsers.map((user) => ((user as any).isChecked = false));
    selectedUsers = [];
    setUsers([...(users as any)]);
  }

  return (
    <Container>
      <Row>
        <Col lg="4">
          <DashboardSideMenuComponent></DashboardSideMenuComponent>
        </Col>
        <Col lg="8">
          {users?.map((user) => (
            <Form.Check
              type={"checkbox"}
              id={`chb-user-${user.id}`}
              key={`chb-user-${Math.random()}`}
              label={user.name}
              defaultChecked={false}
              onChange={(el) => onChbChange(el.target.checked, user)}
            />
          ))}
          <Button variant="success" onClick={() => sendInvitationsHandler()}>
            Send Invitations
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default InviteUserPage;
