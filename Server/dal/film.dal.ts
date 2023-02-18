import { PrismaClient } from "@prisma/client";
import FilmModel from "../models/film.model";

class FilmDal {
  db = new PrismaClient();

  async get(id: number): Promise<FilmModel> {
    let result: any = await this.db.film.findFirst({
      where: {
        id: id,
      },
    });
    return result as FilmModel;
  }

  async createNew(film: FilmModel, ownerId: number) {
    return await this.db.film.create({
      data: {
        rating: film.rating,
        title: film.title,
        watchDate: film.watchDate,
        favorite: film.favorite,
        private: film.private,
        id: undefined,
        ownerId: ownerId,
      },
    });
  }
  async update(film: FilmModel, filmId: number) {
    return await this.db.film.update({
      where: {
        id: filmId,
      },
      data: {
        rating: film.rating,
        title: film.title,
        watchDate: film.watchDate,
        favorite: film.favorite,
      },
    });
  }

  async getFilmByOwnerId(ownerId: number) {
    return await this.db.film.findMany({
      where: {
        ownerId: ownerId,
      },
    });
  }

  async getFilmById(id: number) {
    return await this.db.film.findFirst({
      where: {
        id: id,
      },
    });
  }

  async deleteFilmById(id: number) {
    return await this.db.film.delete({
      where: {
        id: id,
      },
    });
  }

  async getPublicFilms() {
    return await this.db.film.findMany({
      where: {
        private: false,
      },
    });
  }

  async setActiveFilm(userId: number, filmId: number) {
    const relation = await this.db.usersActiveFilms.findFirst({
      where: {
        userId: userId,
      },
    });
    if (relation) {
      return await this.db.usersActiveFilms.update({
        where: {
          id: relation.id,
        },
        data: {
          filmId: filmId,
        },
      });
    } else {
      return await this.db.usersActiveFilms.create({
        data: {
          filmId: filmId,
          userId: userId,
        },
      });
    }
  }

  async getActiveFilmByUserId(userId: number) {
    return await this.db.usersActiveFilms.findFirst({
      where: {
        userId: userId,
      },
    });
  }

  async getActiveFilmById(filmId: number) {
    return await this.db.usersActiveFilms.findFirst({
      where: {
        filmId: filmId,
      },
    });
  }

  async getAllActiveFilm() {
    return await this.db.usersActiveFilms.findMany();
  }

  async deleteActiveFilm(userId: number) {
    const relation = await this.db.usersActiveFilms.findFirst({
      where: {
        userId: userId,
      },
    });
    return await this.db.usersActiveFilms.delete({
      where: {
        id: relation?.id,
      },
    });
  }
}

export default FilmDal;
