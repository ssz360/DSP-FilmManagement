import { FilmModel } from "../../open_api_models/data-contracts";
import "./filmCard.component.css";
function FilmCardComponent(props) {
  const film: FilmModel = props.film;
  return (
    <div
      className="film-card as"
      style={{
        backgroundImage: "url(http://localhost:3001/images/" + film?.medias[0].name + ")",
      }}
    >
      <div className="topbar">
        {film.favorite && <div className="extra technology">Favorite</div>}
        <div className="extra rating">{film.rating} ★</div>
      </div>
      <div className="card-info">
        <div className="info">
          <div className="title">🎬 {film.title}</div>
        </div>
      </div>
    </div>
  );
}

export default FilmCardComponent;
