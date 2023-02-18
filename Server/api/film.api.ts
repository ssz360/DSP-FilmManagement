import { MosquitoService } from "../services/mosquito.service";
import { Request, Response, Express } from "express";
import AuthService from "../services/auth.service";
import FilmDal from "../dal/film.dal";
import FilmModel from "../models/film.model";
import UserDal from "../dal/user.dal";
import path from "path";
import MediaDal from "../dal/media.dal";
import * as fs from "fs";
import InvitationDal from "../dal/invitation.dal";
import WebsocketService from "../services/websocket.service";
import { MessageType } from "../models/websocketMessage";
import { MqttFilmActiveModel, MqttFilmActiveStatus } from "../models/mqttFilmActiveModel";

class FilmApi {
  dal = new FilmDal();
  mediaDal = new MediaDal();
  invitationDal = new InvitationDal();
  authService = new AuthService();
  filmDal = new FilmDal();
  constructor(
    private app: Express,
    private websocketSrv: WebsocketService,
    private mqttSrv: MosquitoService
  ) {}

  init = async () => {
    this.create();
    this.getYourFilms();
    this.getFilmById();
    this.getFilms();
    this.deleteFilms();
    this.update();
    this.deleteMedia();
    this.setFilmAsActiveFilmOfUser();
    this.getUserActiveFilm();
    this.removeUserActiveFilm();
  };

  create() {
    this.app.post(
      "/api/films",
      this.authService.isLoggedIn,
      async (req: Request, res: Response) => {
        try {
          const { title, watchDate, rating, favorite, isPrivate, images } =
            req.body;

          if (!title) {
            res.status(400).json({ message: "title is required" });
            return;
          }

          let film = new FilmModel();
          film.favorite = favorite;
          film.private = isPrivate;
          film.rating = +rating;
          film.title = title;
          film.watchDate = new Date(watchDate);

          let user = await new UserDal().get(req.user?.email as string);
          if (!user) throw new Error("User not found");

          var result = await this.dal.createNew(film, user.id);

          for (let img of images) {
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
          message.userId = req.user?.id as any;
          message.userName = req.user?.name as any;

          this.mqttSrv.publishToFilm_ActiveTopic(result.id, message);

          return res.status(201).json(FilmModel.convertFromFilmDb(result));
        } catch (error: any) {
          res.status(500).json({ error: error?.message });
        }
      }
    );
  }

  update() {
    this.app.put(
      "/api/films/:id",
      this.authService.isLoggedIn,
      async (req: Request, res: Response) => {
        try {
          const { title, watchDate, rating, favorite } = req.body;
          const { id } = req.params;

          if (!title) {
            res.status(400).json({ message: "title is required" });
            return;
          }

          let film = new FilmModel();
          film.favorite = favorite;
          film.rating = +rating;
          film.title = title;
          film.watchDate = new Date(watchDate);

          let user = await new UserDal().get(req.user?.email as string);
          if (!user) throw new Error("User not found");

          var result = await this.dal.update(film, +id as any);

          return res.status(201).json(FilmModel.convertFromFilmDb(result));
        } catch (error: any) {
          res.status(500).json({ error: error?.message });
        }
      }
    );
  }
  getYourFilms() {
    this.app.get(
      "/api/films/yourFilms",
      this.authService.isLoggedIn,
      async (req, res) => {
        try {
          let result = await this.dal.getFilmByOwnerId(req.user?.id as any);

          let final = result.map((r) => FilmModel.convertFromFilmDb(r));
          return await res.status(200).json(final);
        } catch (error: any) {
          return res.status(500).json({ error: error?.message });
        }
      }
    );
  }

  getFilmById() {
    this.app.get("/api/films/:id", async (req, res) => {
      const { id } = req.params;
      let result = await this.dal.getFilmById(+id);
      if (!result) {
        res.status(404).json({ error: "The film not found" });
        return;
      }

      const medias = await this.mediaDal.getByFilmId(+id);

      if (result?.private && result?.ownerId != req.user?.id) {
        res.status(401).json({ error: "You are not authorized" });
        return;
      }

      res.status(200).json(FilmModel.convertFromFilmDb(result, medias));
    });
  }

  deleteFilms() {
    this.app.delete(
      "/api/films/:id",
      this.authService.isLoggedIn,
      async (req, res) => {
        try {
          const { id } = req.params;
          let result = await this.dal.getFilmById(+id);

          const medias = await this.mediaDal.getByFilmId(+id);
          for (const media of medias) {
            await this.mediaDal.deleteById(media.id);
            let imgPath = path.resolve(__dirname, "../", "images", media.name);
            if (fs.existsSync(imgPath)) {
              fs.rm(imgPath, (err) => {
                console.log(err);
              });
            }
          }

          if (result?.ownerId == (req.user?.id as any)) {
            this.dal.deleteFilmById(+id);

            const message = new MqttFilmActiveModel();
            message.status = MqttFilmActiveStatus.deleted;
            message.userId = req.user?.id as any;
            message.userName = req.user?.name as any;
            this.mqttSrv.publishToFilm_ActiveTopic(+id, message);

            return await res.status(200).json({ result: "true" });
          } else {
            return res
              .status(404)
              .json({ result: "false", message: "not found" });
          }
        } catch (error: any) {
          return res
            .status(500)
            .json({ result: "false", error: error?.message });
        }
      }
    );
  }

  deleteMedia() {
    this.app.delete(
      "/api/films/media/:id",
      this.authService.isLoggedIn,
      async (req, res) => {
        try {
          const { id } = req.params;
          const media = await this.mediaDal.deleteById(+id);

          if (media) {
            let imgPath = path.resolve(__dirname, "../", "images", media.name);
            if (fs.existsSync(imgPath)) {
              fs.rm(imgPath, (err) => {
                console.log(err);
              });
            }
            return await res.status(200).json({ result: "true" });
          } else {
            return res
              .status(404)
              .json({ result: "false", message: "not found" });
          }
        } catch (error: any) {
          return res
            .status(500)
            .json({ result: "false", error: error?.message });
        }
      }
    );
  }

  getFilms() {
    this.app.get("/api/films", async (req, res) => {
      let result = await this.dal.getPublicFilms();
      if (req.user) {
        let privateFilms = await this.dal.getFilmByOwnerId(req.user.id);
        privateFilms.forEach((film) => {
          if (!result.some((x) => x.id == film.id)) {
            result.push(film);
          }
        });
      }

      let final = result.map((r) => FilmModel.convertFromFilmDb(r));

      res.status(200).json(final);
    });
  }

  setFilmAsActiveFilmOfUser() {
    this.app.get(
      "/api/active-films/:filmId",
      this.authService.isLoggedIn,
      async (req, res) => {
        try {
          const { filmId } = req.params;

          let result = await this.invitationDal.getInvitationByInvitedUserId(
            req.user?.id as any
          );
          const hasReviewInvitation = result.some((x) => x.filmId == +filmId);

          if (!hasReviewInvitation) {
            return res.status(401).json({
              result: "false",
              error: "You don't have access to this film",
            });
          }

          const isOccupied = await this.dal.getActiveFilmById(+filmId);

          if (isOccupied && isOccupied.userId != req.user?.id) {
            return res.status(405).json({
              result: false,
              message: "The film is selected by another user.",
            });
          }

          const hasRelation = await this.dal.getActiveFilmByUserId(
            req.user?.id as any
          );
          if (hasRelation) {
            await this.removeRelation(req.user?.id as any, req.user?.name);
          }

          const relation = await this.dal.setActiveFilm(
            req.user?.id as any,
            +filmId
          );

          const film = await this.filmDal.getFilmById(+filmId);

          this.websocketSrv.broadcast({
            filmId: relation.filmId,
            userId: relation.userId,
            userName: req.user?.name,
            typeMessage: MessageType.update,
            taskName: film?.title,
          });

          const message = new MqttFilmActiveModel();
          message.status = MqttFilmActiveStatus.active;
          message.userId = req.user?.id as any;
          message.userName = req.user?.name as any;
          this.mqttSrv.publishToFilm_ActiveTopic(+filmId, message);

          res.status(200).json(relation);
        } catch (error) {
          return res.status(500).json({ result: "false", error: error });
        }
      }
    );
  }

  getUserActiveFilm() {
    this.app.get(
      "/api/active-films",
      this.authService.isLoggedIn,
      async (req, res) => {
        try {
          const relation = await this.dal.getActiveFilmByUserId(
            req.user?.id as any
          );
          res.status(200).json({ activeFilmId: relation?.filmId });
        } catch (error) {
          return res.status(500).json({ result: "false", error: error });
        }
      }
    );
  }

  removeUserActiveFilm() {
    this.app.delete(
      "/api/active-films",
      this.authService.isLoggedIn,
      async (req, res) => {
        try {
          const relation = await this.removeRelation(
            req.user?.id as any,
            req.user?.name
          );

          res.status(200).json({ activeFilmId: relation?.filmId });
        } catch (error) {
          return res.status(500).json({ result: "false", error: error });
        }
      }
    );
  }

  private async removeRelation(userId: any, username: any) {
    const relation = await this.dal.deleteActiveFilm(userId);

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
export default FilmApi;
