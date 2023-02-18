import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DashboardSideMenuComponent from "../../components/dashboardSideMenu/dashboardSideMenu.component";
import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import {
  getWebsocketMessages_activeFilms,
  getWebsocketMessages_onlineUsers,
} from "../../global/variables.global";
import { subscribeEvent, unsubscribeEvent } from "../../services/event.service";
import React from "react";

function OnlineUsersPage() {
  const [users, setUsers] = useState<any[]>();
  const [activeFilms, setActiveFilms] = useState<any[]>([]);

  useEffect(() => {
    setUsers(getWebsocketMessages_onlineUsers());
    unsubscribeEvent("new_wc_message", onNewMessage);
    subscribeEvent("new_wc_message", onNewMessage);
  }, []);

  function onNewMessage(message: any) {
    const data = getWebsocketMessages_onlineUsers();
    const active = getWebsocketMessages_activeFilms();

    setUsers([...data]);
    setActiveFilms([...active]);
  }

  return (
    <Container>
      <Row>
        <Col lg="4">
          <DashboardSideMenuComponent></DashboardSideMenuComponent>
        </Col>
        <Col lg="8">
          <Row>
            {users?.map((user) => {
              return (
                <Col key={"mf" + user.userId}>
                  <Card border="secondary" style={{ width: "18rem" }}>
                    <Card.Header>{user.userName}</Card.Header>
                    <Card.Body className="text-left">
                      <Card.Text>UserId:{user.userId}</Card.Text>
                      <div key={"active" + user.userId}>
                        {activeFilms
                          .filter((x) => x.userId == user.userId)
                          .map((r) => (
                            <div key={"f-name" + r.filmId}>
                              <strong>Active Film:</strong>
                              <div>Film Id:{r.filmId}</div>
                              <div>Film Name: {r.taskName}</div>
                            </div>
                          ))}
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default OnlineUsersPage;
