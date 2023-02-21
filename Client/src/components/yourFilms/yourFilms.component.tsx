import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import React from "react";
import "./yourFilms.component.css";
import { FilmModel } from "../../open_api_models/data-contracts";
import { Films } from "../../open_api_models/Films";

function YourFilmsComponent() {
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
    <div className="content-section">
      <div className="content-section-title">Your Films:</div>
      <div className="apps-card">
        {films.map((film) => {
          return (
            <div key={film.id} className="app-card">
              <Link
                className="link-inherent"
                to={"/dashboard/film/" + film.id}
              >
                <span>🎬{" " + film.title}</span>
              </Link>
              <div className="app-card__subtext">
                <div>
                  <div>Favorite: {film.favorite ? "True" : "False"}</div>
                  <div>Is Private: {film.isPrivate ? "True" : "False"}</div>
                  <div>Rating: {film.rating}</div>
                  <div>
                    Watched Date:{" "}
                    {new Date(film.watchDate as string).toDateString()}
                  </div>
                </div>
              </div>
              <div className="app-card-buttons">
                <Row className="btn-row">
                  <Col lg="3">
                    <Link to={"/dashboard/edit-film/" + film.id}>
                      <Button size="sm" variant="primary">
                        Update
                      </Button>
                    </Link>
                  </Col>
                  <Col lg="3">
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => showModalHandler(film)}
                    >
                      Delete
                    </Button>
                  </Col>
                  <Col lg="6">
                    {film.isPrivate ? (
                      <></>
                    ) : (
                      <Link to={"/dashboard/invite-user/" + film.id}>
                        <Button size="sm" variant="warning">
                          Issue an invitation
                        </Button>
                      </Link>
                    )}
                  </Col>
                </Row>{" "}
              </div>
            </div>
          );
        })}
        <div className="last-white-space"></div>
      </div>
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
    </div>
  );
}
export default YourFilmsComponent;
