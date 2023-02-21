import { useEffect, useState } from "react";
import { FilmModel } from "../../open_api_models/data-contracts";
import { Films } from "../../open_api_models/Films";
import FilmCardComponent from "../filmCard/filmCard.component";


function HomeComponent() {
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
    <div>
      <div className="content-wrapper">
        <div className="content-section">
          {films.map((film) => (
            <FilmCardComponent film={film}></FilmCardComponent>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomeComponent;
