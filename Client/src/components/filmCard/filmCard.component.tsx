import "./filmCard.component.css"
function FilmCardComponent(props) {
  return (
    <div className="film-card">
      <div className="topbar">
        <div className="extra technology">Favorite</div>
        <div className="extra rating">3,5 ★</div>
      </div>
      <div className="card-info">
        <div className="info">
          <div className="title">🎬 The Greatest Showman</div>
        </div>
      </div>
    </div>
  );
}

export default FilmCardComponent;
