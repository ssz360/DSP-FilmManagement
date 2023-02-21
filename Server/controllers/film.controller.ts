import { UserModel } from "./../../Client/src/open_api_models/data-contracts";
import * as fs from "fs";
import FilmDal from "../dal/film.dal";
import InvitationDal from "../dal/invitation.dal";
import MediaDal from "../dal/media.dal";
import UserDal from "../dal/user.dal";
import FilmModel from "../models/film.model";
import {
  MqttFilmActiveModel,
  MqttFilmActiveStatus,
} from "../models/mqttFilmActiveModel";
import { MosquitoService } from "../services/mosquito.service";
import path from "path";
import { Film, UsersActiveFilms } from "@prisma/client";
import { MessageType } from "../models/websocketMessage";
import WebsocketService from "../services/websocket.service";
import { ControllerResponseModel } from "../models/contollerResult.model";

export class FilmController {
  constructor(
    private filmDal: FilmDal,
    private mediaDal: MediaDal,
    private invitationDal: InvitationDal,
    private userDal: UserDal,
    private mqttSrv: MosquitoService,
    private websocketSrv: WebsocketService
  ) {}

  createFilm = async (
    title: string,
    watchDate: any,
    rating: number,
    favorite: boolean,
    isPrivate: boolean,
    medias: Array<any>,
    userId: number
  ): Promise<ControllerResponseModel<FilmModel>> => {
    if (!title) {
      return {
        error: {
          code: 400,
          message: "title is required",
        },
      };
    }

    let film = new FilmModel();
    film.favorite = favorite;
    film.private = isPrivate;
    film.rating = +rating;
    film.title = title;
    film.watchDate = new Date(watchDate);

    let user = await this.userDal.getById(userId);
    if (!user) throw new Error("User not found");

    var result = await this.filmDal.createNew(film, user.id);

    for (let img of medias) {
      let imgPath = path.resolve(__dirname, "../", "images", img.name);

      var base64Data = img.data
        .replace(/^data:image\/png;base64,/, "")
        .replace(/^data:image\/jpg;base64,/, "")
        .replace(/^data:image\/jpeg;base64,/, "")
        .replace(/^data:image\/gif;base64,/, "");
      fs.writeFile(
        imgPath,
        base64Data,
        { encoding: "base64" },
        async (err: any) => {
          if (!err) {
            const type = img.name.split(".")[1];
            await this.mediaDal.createNew(img.name, type, result.id);
          }
        }
      );
    }

    const message = new MqttFilmActiveModel();
    message.status = MqttFilmActiveStatus.inactive;
    message.userId = user.id as any;
    message.userName = user.name as any;

    this.mqttSrv.publishToFilm_ActiveTopic(result.id, message);

    return {
      data: FilmModel.convertFromFilmDb(result),
    };
  };

  updateFilm = async (
    id: number,
    title: string,
    watchDate: any,
    rating: number,
    favorite: boolean,
    medias: Array<any>,
    userId: number
  ): Promise<ControllerResponseModel<FilmModel>> => {
    if (!title) {
      return {
        error: {
          code: 400,
          message: "title is required",
        },
      };
    }

    let film = new FilmModel();
    film.favorite = favorite;
    film.rating = +rating;
    film.title = title;
    film.watchDate = new Date(watchDate);

    let user = await new UserDal().getById(userId);
    if (!user) throw new Error("User not found");

    var result = await this.filmDal.update(film, +id as any);

    for (let img of medias) {
      let imgPath = path.resolve(__dirname, "../", "images", img.name);

      var base64Data = img.data
        .replace(/^data:image\/png;base64,/, "")
        .replace(/^data:image\/jpg;base64,/, "")
        .replace(/^data:image\/jpeg;base64,/, "")
        .replace(/^data:image\/gif;base64,/, "");
      fs.writeFile(
        imgPath,
        base64Data,
        { encoding: "base64" },
        async (err: any) => {
          if (!err) {
            const type = img.name.split(".")[1];
            await this.mediaDal.createNew(img.name, type, result.id);
          }
        }
      );
    }

    return {
      data: FilmModel.convertFromFilmDb(result),
    };
  };

  getUserFilms = async (
    userId: number
  ): Promise<ControllerResponseModel<FilmModel[]>> => {
    let result = await this.filmDal.getFilmByOwnerId(userId);
    let final = result.map((r) => FilmModel.convertFromFilmDb(r));
    return {
      data: final,
    };
  };

  getFilmById = async (
    filmId: number
  ): Promise<ControllerResponseModel<FilmModel>> => {
    const result = await this.filmDal.getFilmById(filmId);
    const medias = await this.mediaDal.getByFilmId(filmId);

    const final = FilmModel.convertFromFilmDb(result as Film, medias);
    return { data: final };
  };

  deleteFilms = async (
    filmId: number,
    userId: number,
    userName: string
  ): Promise<ControllerResponseModel<any>> => {
    let result = await this.filmDal.getFilmById(filmId);

    const medias = await this.mediaDal.getByFilmId(filmId);
    for (const media of medias) {
      await this.mediaDal.deleteById(media.id);
      let imgPath = path.resolve(__dirname, "../", "images", media.name);
      if (fs.existsSync(imgPath)) {
        fs.rm(imgPath, (err) => {
          console.log(err);
        });
      }
    }

    if (result?.ownerId == userId) {
      this.filmDal.deleteFilmById(filmId);

      const message = new MqttFilmActiveModel();
      message.status = MqttFilmActiveStatus.deleted;
      message.userId = userId;
      message.userName = userName;
      this.mqttSrv.publishToFilm_ActiveTopic(filmId, message);

      return { data: { result: "true" } };
    } else {
      return {
        error: {
          code: 404,
          message: "not found",
        },
      };
    }
  };

  deleteMedia = async (
    mediaId: number
  ): Promise<ControllerResponseModel<any>> => {
    const media = await this.mediaDal.deleteById(mediaId);

    if (media) {
      let imgPath = path.resolve(__dirname, "../", "images", media.name);
      if (fs.existsSync(imgPath)) {
        fs.rm(imgPath, (err) => {
          console.log(err);
        });
      }
      return { data: { result: "true" } };
    } else {
      return { error: { code: 404, message: "not found" } };
    }
  };

  getFilms = async (
    userId?: number
  ): Promise<ControllerResponseModel<FilmModel[]>> => {
    let result = await this.filmDal.getPublicFilms();
    if (userId) {
      let privateFilms = await this.filmDal.getFilmByOwnerId(userId);
      privateFilms.forEach((film) => {
        if (!result.some((x) => x.id == film.id)) {
          result.push(film);
        }
      });
    }

    let final: FilmModel[] = [];

    for(let film of result){
      const medias = await this.mediaDal.getByFilmId(film.id);
      final.push(FilmModel.convertFromFilmDb(film, medias));
    }
    return { data: final };
  };

  setFilmAsActiveFilmOfUser = async (
    filmId: number,
    userId: number,
    username: string
  ): Promise<ControllerResponseModel<UsersActiveFilms>> => {
    let result = await this.invitationDal.getInvitationByInvitedUserId(userId);
    const hasReviewInvitation = result.some((x) => x.filmId == +filmId);

    if (!hasReviewInvitation) {
      return {
        error: { code: 401, message: "You don't have access to this film" },
      };
    }

    const isOccupied = await this.filmDal.getActiveFilmById(+filmId);

    if (isOccupied && isOccupied.userId != userId) {
      return {
        error: { code: 405, message: "The film is selected by another user." },
      };
    }

    const hasRelation = await this.filmDal.getActiveFilmByUserId(userId as any);
    if (hasRelation) {
      await this.removeRelation(userId as any, username);
    }

    const relation = await this.filmDal.setActiveFilm(userId as any, +filmId);

    const film = await this.filmDal.getFilmById(+filmId);

    this.websocketSrv.broadcast({
      filmId: relation.filmId,
      userId: relation.userId,
      userName: username,
      typeMessage: MessageType.update,
      taskName: film?.title,
    });

    const message = new MqttFilmActiveModel();
    message.status = MqttFilmActiveStatus.active;
    message.userId = userId as any;
    message.userName = username as any;
    this.mqttSrv.publishToFilm_ActiveTopic(+filmId, message);

    return { data: relation };
  };

  getUserActiveFilm = async (
    userId: number
  ): Promise<ControllerResponseModel<any>> => {
    const relation = await this.filmDal.getActiveFilmByUserId(userId);
    return { data: { activeFilmId: relation?.filmId } };
  };

  removeUserActiveFilm = async (
    userId: number,
    username: string
  ): Promise<ControllerResponseModel<any>> => {
    const relation = await this.removeRelation(userId, username);

    return { data: { removedFilmId: relation?.filmId } };
  };

  private async removeRelation(userId: any, username: any) {
    const relation = await this.filmDal.deleteActiveFilm(userId);

    if (relation) {
      this.websocketSrv.broadcast({
        filmId: relation.filmId,
        userId: relation.userId,
        userName: username,
        typeMessage: MessageType.update,
      });

      const message = new MqttFilmActiveModel();
      message.status = MqttFilmActiveStatus.inactive;
      message.userId = userId;
      message.userName = username as any;
      this.mqttSrv.publishToFilm_ActiveTopic(relation.filmId, message);
    }
    return relation;
  }
}
