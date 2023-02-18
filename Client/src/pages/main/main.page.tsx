import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DashboardSideMenuComponent from "../../components/dashboardSideMenu/dashboardSideMenu.component";
import { useEffect, useState } from "react";
import { FilmModel } from "../../open_api_models/data-contracts";
import Card from "react-bootstrap/Card";
import { Films } from "../../open_api_models/Films";
import React from "react";


function MainPage() {
  const [films, setFilms] = useState<FilmModel[]>([]);

  useEffect(() => {
    getFilms();
  }, []);

  async function getFilms() {
    let yourFilms = await new Films().getFilms({
      credentials: "include",
    });
    setFilms(yourFilms.data);
  }

  return (
    <Container>
      <Row>
        <Col lg="4">
          <DashboardSideMenuComponent></DashboardSideMenuComponent>
        </Col>
        <Col lg="8">
          <Row>
            {films.map((e) => {
              return (
                <Col key={"mf" + e.id}>
                  <Card border="secondary" style={{ width: "18rem" }}>
                    <Card.Header>{e.title}</Card.Header>
                    <Card.Body className="text-left">
                      <Card.Text>
                        Watched Date:{" "}
                        {new Date(e.watchDate as string).toDateString()}
                      </Card.Text>
                      <div>
                        <div>Favorite: {e.favorite ? "True" : "False"}</div>
                        <div>Is Private: {e.isPrivate ? "True" : "False"}</div>
                        <div>Rating: {e.rating}</div>
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

export default MainPage;
