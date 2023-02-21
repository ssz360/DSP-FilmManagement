import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { Button, Form } from "react-bootstrap";
import "./reviewedFilms.component.css";
import React from "react";
import { ActiveFilms } from "../../open_api_models/ActiveFilms";
import { FilmModel, MqttFilmActiveModel } from "../../open_api_models/data-contracts";
import { Invitation } from "../../open_api_models/Invitation";
import { MosquitoService } from "../../services/mosquito.service";

let mqttSrv: MosquitoService;


function ReviewedFilmsComponent() {
  const [films, setFilms] = useState<FilmModel[]>([]);
  const [activeFilm, setActiveFilm] = useState<FilmModel>();
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

  async function switchHandler(switchVal: boolean, film: FilmModel) {
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
      <div className="content-section">
        <div className="content-section-title">Your Films:</div>
        <div className="apps-card">
          {films.map((film) => {
            return (
              <div key={film.id} className="app-card">
                <strong className="link-inherent">🎬{" " + film.title}</strong>
                <div>
                  <span>set as active:</span>
                  <div className="active-switch">
                    <Form.Check
                      type="switch"
                      id="custom-switch"
                      checked={film.id == activeFilm?.id}
                      onChange={(e) => switchHandler(e.target.checked, film)}
                    />
                  </div>
                </div>
                <div className="app-card__subtext">
                  <div>
                    Watched Date:{" "}
                    {new Date(film.watchDate as string).toDateString()}
                  </div>
                  <div>
                    <div>Favorite: {film.favorite ? "True" : "False"}</div>
                    <div>Is Private: {film.isPrivate ? "True" : "False"}</div>
                    <div>Rating: {film.rating}</div>
                  </div>
                </div>
                <div className="app-card-buttons">
                  <hr />
                  <div>
                    {messages
                      .filter(
                        (el) => el.channel == "film/" + film.id + "/activate"
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
                </div>
              </div>
            );
          })}
          <div className="last-white-space"></div>
        </div>
      </div>
    </Container>
  );
}

export default ReviewedFilmsComponent;
