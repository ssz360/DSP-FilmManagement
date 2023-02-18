import { Film } from "@prisma/client";
import MediaModel from "./media.model";
import ReviewModel from "./review.model";
import UserModel from "./user.model";

class FilmModel {
  id!: number;
  title!: string;
  owner!: UserModel;
  ownerId!: number;
  private: boolean = true;
  watchDate!: Date;
  rating!: number;
  favorite: boolean = false;
  reviews!: ReviewModel[];
  imagesBase64!: string[];
  medias!: MediaModel[];
  self?: object;
  filmReviews?: object;
  constructor(id?: number) {
    if (id) {
      this.id = id as any;
      this.self = { href: "/api/films/" + this.id };
      this.filmReviews = { href: `/api/films/${this.id}/reviews` };
    }
  }

  static convertFromFilmDb(dbFilm: Film, medias?: MediaModel[]): FilmModel {
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
