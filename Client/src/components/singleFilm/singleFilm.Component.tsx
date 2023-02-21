import "./singleFilm.Component.css";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import React from "react";
import { useParams } from "react-router";
import { getGlobalUser } from "../../global/variables.global";
import { FilmModel, UserModel } from "../../open_api_models/data-contracts";
import { Films } from "../../open_api_models/Films";
import { Gprc } from "../../open_api_models/Gprc";
import ReviewFilmComponent from "../review/review.component";


function SingleFilmComponent() {
  const [film, setFilm] = useState<FilmModel>();
  const [user, setUser] = useState<UserModel>();
  const [movie, setMovie] = useState<any>();

  let { id } = useParams();
  const filmApi = new Films();

  useEffect(() => {
    getData();
    setUser(getGlobalUser());
  }, []);

  async function getData() {
    const selectedFilm = (
      await filmApi.getFilmsById(id as any, {
        credentials: "include",
      })
    ).data;
    setFilm(selectedFilm);
    findMovie(selectedFilm.title?.replace(" ", "+"));
  }

  const key = "2fb7569a";
  const url = `https://www.omdbapi.com/?apikey=${key}&t=`;

  const api = new Gprc();

  const findMovie = (title: any) => {
    fetch(url + title, {
      method: "get",
    }).then(async (res) => {
      setMovie((await res.json()) as any);
    });
  };

  async function downloadImage(name: string, format: string) {
    const result = await api.gprcConvertImage({
      credentials: "include",
      headers: {
        "file-name": name,
        "destination-type": format,
      },
    });

    fetch("http://localhost:3001/images/" + result.data.fileName)
      .then((resp) => resp.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        // the filename you want
        a.download = result.data.fileName as any;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      })
      .catch(() => {});
  }

  async function deleteMediaHandler(id: Number) {
    await filmApi.deleteMedia(id as any, { credentials: "include" });
    getData();
  }

  return (
    <Container>
      <div className="movie single-film" id="movie-card">
        <div className="movie__data" id="movie-data">
          <div className="movie__poster">
            <span className="movie__poster--fill">
              <img src={movie?.Poster} />
            </span>
            <span className="movie__poster--featured">
              <img src={movie?.Poster} />
            </span>
          </div>
          <div className="movie__details">
            <h2 className="movie__title">{movie?.Title}</h2>
            <ul className="movie__tags list--inline">
              <li className="movie__rated">{movie?.Rated}</li>
              <li className="movie__year">{movie?.Year}</li>
              <li className="movie__year">{movie?.Genre}</li>
            </ul>
            <p className="movie__plot">{movie?.Plot}</p>
            <div className="movie__credits">
              <p>
                <strong>Written by:</strong> {movie?.Writer}
              </p>
              <p>
                <strong>Directed by:</strong> {movie?.Director}
              </p>
              <p>
                <strong>Starring:</strong>
              </p>
              <ul className="movie__actors list--inline">
                {movie?.Actors?.split(",")?.map((actor: any) => (
                  <li key={actor}>{actor}</li>
                ))}
              </ul>
              <hr />
              <p>
                <strong>Favorite:</strong> {film?.favorite ? "Yes" : "No"}
              </p>
              <p>
                <strong>Rating:</strong> {film?.rating}
              </p>
              <p>
                <strong>Watched Date:</strong>{" "}
                {new Date(film?.watchDate as any).toDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="images-wrapper-parent">
        <div className="images-wrapper">
          {film?.medias?.map((x) => {
            return (
              <div key={x.id}>
                <img
                  src={"http://localhost:3001/images/" + x.name}
                  alt=""
                  key={x.id}
                />
                {user?.id == film.ownerId ? (
                  <div
                    className="delete-btn"
                    onClick={() => deleteMediaHandler(x.id as any)}
                  >
                    X
                  </div>
                ) : (
                  <></>
                )}
                <div className="download-wrapper">
                  <span>Download:</span>
                  <Button
                    size="sm"
                    variant="warning"
                    onClick={() => {
                      downloadImage(x.name as string, "PNG");
                    }}
                  >
                    PNG
                  </Button>
                  <Button
                    size="sm"
                    variant="success"
                    onClick={() => {
                      downloadImage(x.name as string, "JPG");
                    }}
                  >
                    JPG
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => {
                      downloadImage(x.name as string, "GIF");
                    }}
                  >
                    GIF
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {film?.ownerId === user?.id ? (
        <ReviewFilmComponent filmId={id}></ReviewFilmComponent>
      ) : (
        <></>
      )}
      <div className="last-white-space"></div>
    </Container>
  );
}

export default SingleFilmComponent;
