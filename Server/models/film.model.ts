import { Film } from './../../Client/src/open_api_models/data-contracts';
import { Film as DbFilm } from "@prisma/client";
import MediaModel from "./media.model";
import ReviewModel from "./review.model";
import UserModel from "./user.model";

class FilmModel {
  id!: number;
  title!: string;
  ownerId!: number;
  private: boolean = true;
  watchDate!: Date;
  rating!: number;
  favorite: boolean = false;
  medias!: MediaModel[];
  self?: object;
  filmReviews?: object;
  constructor(id?: number) {
    if (id) {
      this.id = id as any;
      this.self = { href: "/api/films/" + this.id };
      this.filmReviews = { href: `/api/reviews/film/${this.id}` };
    }
  }

  static convertFromFilmDb(dbFilm: DbFilm, medias?: MediaModel[]): FilmModel {
    let resultFilm = new FilmModel(dbFilm.id);
    resultFilm.id = dbFilm.id;
    resultFilm.favorite = dbFilm.favorite;
    resultFilm.private = dbFilm.private;
    resultFilm.rating = dbFilm.rating;
    resultFilm.title = dbFilm.title;
    resultFilm.watchDate = dbFilm.watchDate;
    resultFilm.ownerId = dbFilm.ownerId;
    resultFilm.medias = medias as any;
    return resultFilm;
  }
}

export default FilmModel;
