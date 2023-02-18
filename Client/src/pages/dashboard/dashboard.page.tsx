import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DashboardSideMenuComponent from "../../components/dashboardSideMenu/dashboardSideMenu.component";
import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Films } from "../../open_api_models/Films";
import {
  FilmModel,
} from "../../open_api_models/data-contracts";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./dashboard.page.css";
import React from "react";

function DashboardPage() {
  const [films, setFilms] = useState<FilmModel[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedFilm, setSelectedFilm] = useState<FilmModel>();

  useEffect(() => {
    getFilms();
  }, []);

  async function getFilms() {
    let yourFilms = await new Films().getYourFilms({
      credentials: "include",
    });
    setFilms(yourFilms.data);
  }

  function showModalHandler(film: FilmModel) {
    setShowModal(true);
    setSelectedFilm(film);
  }

  async function deleteHandler(film: FilmModel) {
    setShowModal(false);
    if (!film) return;
    await new Films().deleteFilm(film.id as any, {
      credentials: "include",
    });
    getFilms();
  }

  const handleClose = () => setShowModal(false);

  return (
    <Container>
      <Row>
        <Col lg="4">
          <DashboardSideMenuComponent></DashboardSideMenuComponent>
        </Col>
        <Col lg="8">
          <Row>
            {films.map((film) => {
              return (
                <Col key={"pf-" + film.id}>
                  <Card border="secondary" style={{ width: "18rem" }}>
                    <Link to={"/film/" + film.id}>
                      <Card.Header>{film.title}</Card.Header>
                    </Link>
                    <Card.Body className="text-left">
                      <Card.Text>
                        Watched Date:{" "}
                        {new Date(film.watchDate as string).toDateString()}
                      </Card.Text>
                      <div>
                        <div>Favorite: {film.favorite ? "True" : "False"}</div>
                        <div>Is Private: {film.isPrivate ? "True" : "False"}</div>
                        <div>Rating: {film.rating}</div>
                      </div>
                      <Row className="btn-row">
                        <Col lg="4">
                          <Link to={"/user/edit-film/" + film.id}>
                            <Button size="sm" variant="primary">
                              Update
                            </Button>
                          </Link>
                        </Col>
                        <Col lg="8"></Col>
                        <Col lg="4">
                          <Button
                            size="sm"
                            variant="danger"
                            onClick={() => showModalHandler(film)}
                          >
                            Delete
                          </Button>
                        </Col>
                        <Col lg="8">
                          {film.isPrivate ? (
                            <></>
                          ) : (
                            <Link to={"/user/invite-user/" + film.id}>
                              <Button size="sm" variant="warning">
                                Issue an invitation
                              </Button>
                            </Link>
                          )}
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Col>
      </Row>

      {/* *************** modal ************** */}

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Warning</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete the Film?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button
            variant="warning"
            onClick={() => deleteHandler(selectedFilm as any)}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default DashboardPage;
