import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DashboardSideMenuComponent from "../../components/dashboardSideMenu/dashboardSideMenu.component";
import { useEffect, useState } from "react";
import {
  Film,
  FilmsResponse,
  MqttFilmActiveModel,
} from "../../open_api_models/data-contracts";
import Card from "react-bootstrap/Card";
import { Invitation } from "../../open_api_models/Invitation";
import { Form } from "react-bootstrap";
import { ActiveFilms } from "../../open_api_models/ActiveFilms";
import { MosquitoService } from "../../services/mosquito.service";
import "./reviewedFilm.page.css";
import React from "react";

let mqttSrv: MosquitoService;

function ReviewedFilmsPage() {
  const [films, setFilms] = useState<FilmsResponse>([]);
  const [activeFilm, setActiveFilm] = useState<Film>();
  const [messages, setMessages] = useState<
    {
      channel: string;
      message: MqttFilmActiveModel;
    }[]
  >([]);

  const invitationApi = new Invitation();
  const filmApi = new ActiveFilms();

  useEffect(() => {
    getData();

    if (!mqttSrv) {
      mqttSrv = new MosquitoService(onNewMessage);
    }
    return () => {
      mqttSrv.client.end();
      mqttSrv = undefined as any;
    };
  }, []);

  async function getData() {
    const result = await invitationApi.getListOfInvitations({
      credentials: "include",
    });

    const reviewedFilms = result.data
      //.filter((x) => x.done === true)
      .map((x) => x.film);

    for (let film of reviewedFilms) {
      mqttSrv.subscribe("film/" + film?.id + "/activate");
    }

    setFilms(reviewedFilms as any);

    const activeFilmId = await (
      await filmApi.getActiveMovie({ credentials: "include" })
    ).data.activeFilmId;

    const activeFilm = reviewedFilms.find(
      (x) => activeFilmId == (x?.id as any)
    );

    setActiveFilm(activeFilm);
  }

  async function switchHandler(switchVal: boolean, film: Film) {
    if (switchVal) {
      await filmApi
        .setMovieActive(film.id as any, { credentials: "include" })
        .catch((err) => {
          if (err?.error?.message) alert(err.error.message);
        });
    } else {
      await filmApi.deleteActiveMovie({ credentials: "include" });
    }
    getData();
  }

  const onNewMessage = (channel: string, message: MqttFilmActiveModel) => {
    if (!channel.startsWith("film/") && !channel.startsWith("/activate")) {
      return;
    }

    const result = JSON.parse(message.toString());

    setMessages((messages) => {
      const tmp = messages.find((x) => x.channel == channel);
      if (tmp) {
        tmp.message.status = result.status;
        tmp.message.userId = result.userId;
        tmp.message.userName = result.userName;
        return [...messages];
      } else {
        return [...messages, { channel, message: result }];
      }
    });
    // to update the UI
    setFilms((films) => [...films]);
  };

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
                <Col key={"mf" + film.id}>
                  <Card border="secondary" style={{ width: "18rem" }}>
                    <Card.Header>
                      {film.title}

                      <div>
                        <span>set as active:</span>
                        <div className="active-switch">
                          <Form.Check
                            type="switch"
                            id="custom-switch"
                            checked={film.id == activeFilm?.id}
                            onChange={(e) =>
                              switchHandler(e.target.checked, film)
                            }
                          />
                        </div>
                      </div>
                    </Card.Header>
                    <Card.Body className="text-left">
                      <Card.Text>
                        Watched Date:{" "}
                        {new Date(film.watchDate as string).toDateString()}
                      </Card.Text>
                      <div>
                        <div>Favorite: {film.favorite ? "True" : "False"}</div>
                        <div>Is Private: {film.private ? "True" : "False"}</div>
                        <div>Rating: {film.rating}</div>
                      </div>
                      <hr />
                      <div>
                        {messages
                          .filter(
                            (el) =>
                              el.channel == "film/" + film.id + "/activate"
                          )
                          .map((el) => {
                            return (
                              <div key={el.channel}>
                                <div>Status: {el.message.status}</div>
                                {el.message.status == "active" ? (
                                  <div>
                                    <div>User id: {el.message.userId}</div>
                                    <div>User name: {el.message.userName}</div>
                                  </div>
                                ) : (
                                  <></>
                                )}
                              </div>
                            );
                          })}
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

export default ReviewedFilmsPage;
