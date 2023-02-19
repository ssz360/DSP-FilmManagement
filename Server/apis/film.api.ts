import { MosquitoService } from "../services/mosquito.service";
import { Request, Response, Express } from "express";
import AuthService from "../services/auth.service";
import FilmDal from "../dal/film.dal";
import UserDal from "../dal/user.dal";
import MediaDal from "../dal/media.dal";
import InvitationDal from "../dal/invitation.dal";
import WebsocketService from "../services/websocket.service";
import { Validator } from "express-json-validator-middleware";
import { FilmController } from "../controllers/film.controller";

class FilmApi {
  filmDal = new FilmDal();
  mediaDal = new MediaDal();
  invitationDal = new InvitationDal();
  authService = new AuthService();
  userDal = new UserDal();
  validationSchema: any;
  controller = new FilmController(
    this.filmDal,
    this.mediaDal,
    this.invitationDal,
    this.userDal,
    this.mqttSrv,
    this.websocketSrv
  );
  constructor(
    private app: Express,
    private websocketSrv: WebsocketService,
    private mqttSrv: MosquitoService,
    private validator: Validator
  ) {
    this.validationSchema = this.validator.ajv.getSchema(
      "ssz://schemas/filmModel.schema.json"
    )?.schema;
  }

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
      this.validator.validate({ body: this.validationSchema }),
      async (req: Request, res: Response) => {
        try {
          const { title, watchDate, rating, favorite, isPrivate, medias } =
            req.body;

          const result = await this.controller.createFilm(
            title,
            watchDate,
            rating,
            favorite,
            isPrivate,
            medias,
            req.user?.id as number
          );

          if (result.error) {
            return res
              .status(result.error.code)
              .json({ message: result.error.message });
          } else {
            return res.status(200).json(result.data);
          }
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
      this.validator.validate({ body: this.validationSchema }),
      async (req: Request, res: Response) => {
        try {
          const { title, watchDate, rating, favorite, medias } = req.body;
          const { id } = req.params;

          const result = await this.controller.updateFilm(
            +id,
            title,
            watchDate,
            rating,
            favorite,
            medias,
            req.user?.id as number
          );

          if (result.error) {
            return res
              .status(result.error.code)
              .json({ message: result.error.message });
          } else {
            return res.status(200).json(result.data);
          }
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
          let result = await this.controller.getUserFilms(
            req.user?.id as number
          );
          if (result.error) {
            return res
              .status(result.error.code)
              .json({ message: result.error.message });
          } else {
            return res.status(200).json(result.data);
          }
        } catch (error: any) {
          return res.status(500).json({ error: error?.message });
        }
      }
    );
  }

  getFilmById() {
    this.app.get("/api/films/:id", async (req, res) => {
      const { id } = req.params;

      const result = await this.controller.getFilmById(+id);

      if (!result) {
        res.status(404).json({ error: "The film not found" });
        return;
      }

      if (result.data?.private && result.data?.ownerId != req.user?.id) {
        res.status(401).json({ error: "You are not authorized" });
        return;
      }

      if (result.error) {
        return res
          .status(result.error.code)
          .json({ message: result.error.message });
      } else {
        return res.status(200).json(result.data);
      }
    });
  }

  deleteFilms() {
    this.app.delete(
      "/api/films/:id",
      this.authService.isLoggedIn,
      async (req, res) => {
        try {
          const { id } = req.params;

          const result = await this.controller.deleteFilms(
            +id,
            req.user?.id as number,
            req.user?.name as string
          );
          if (result.error) {
            return res
              .status(result.error.code)
              .json({ message: result.error.message });
          } else {
            return res.status(200).json(result.data);
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

          const result = await this.controller.deleteMedia(+id);

          if (result.error) {
            return res
              .status(result.error.code)
              .json({ message: result.error.message });
          } else {
            return res.status(200).json(result.data);
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
      const result = await this.controller.getFilms(req.user?.id);

      if (result.error) {
        return res
          .status(result.error.code)
          .json({ message: result.error.message });
      } else {
        return res.status(200).json(result.data);
      }
    });
  }

  setFilmAsActiveFilmOfUser() {
    this.app.get(
      "/api/active-films/:filmId",
      this.authService.isLoggedIn,
      async (req, res) => {
        try {
          const { filmId } = req.params;

          const result = await this.controller.setFilmAsActiveFilmOfUser(
            +filmId,
            req.user?.id as number,
            req.user?.name as string
          );

          if (result.error) {
            return res
              .status(result.error.code)
              .json({ message: result.error.message });
          } else {
            return res.status(200).json(result.data);
          }
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
          const result = await this.controller.getUserActiveFilm(
            req.user?.id as number
          );

          if (result.error) {
            return res
              .status(result.error.code)
              .json({ message: result.error.message });
          } else {
            return res.status(200).json(result.data);
          }
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
          const result = await this.controller.removeUserActiveFilm(
            req.user?.id as number,
            req.user?.name as string
          );

          if (result.error) {
            return res
              .status(result.error.code)
              .json({ message: result.error.message });
          } else {
            return res.status(200).json(result.data);
          }
        } catch (error) {
          return res.status(500).json({ result: "false", error: error });
        }
      }
    );
  }
}
export default FilmApi;
