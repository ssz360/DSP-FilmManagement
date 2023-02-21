import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import React from "react";
import { UserModel } from "../../open_api_models/data-contracts";
import { Invitation } from "../../open_api_models/Invitation";
import { User as UserApi } from "../../open_api_models/User";


function IssuingInvitationComponent() {
  const [users, setUsers] = useState<UserModel[]>();
  let selectedUsers: UserModel[] = [];

  const { id } = useParams();

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
        filmId: +id as any,
        invitedUserId: selectedUsers?.map((u) => +u.id) as any,
      },
      { credentials: "include" }
    );
    selectedUsers.map((user) => ((user as any).isChecked = false));
    selectedUsers = [];
    setUsers([...(users as any)]);
  }

  return (
    <Container>
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
    </Container>
  );
}

export default IssuingInvitationComponent;
