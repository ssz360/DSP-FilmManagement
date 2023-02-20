import { Request, Response, Express } from "express";
import AuthService from "../services/auth.service";
import FilmDal from "../dal/film.dal";
import ReviewModel from "../models/review.model";
import ReviewDal from "../dal/review.dal";
import InvitationDal from "../dal/invitation.dal";
import { MosquitoService } from "../services/mosquito.service";
import { MqttReviewModel, MqttReviewStatus } from "../models/MqttReview.model";
import { Validator } from "express-json-validator-middleware";
import { ReviewController } from "../controllers/review.controller";

class ReviewApi {
  dal = new ReviewDal();
  invitationDal = new InvitationDal();
  authService = new AuthService();
  validationSchema: any;
  filmDal = new FilmDal();
  controller = new ReviewController(
    this.dal,
    this.invitationDal,
    this.mqttSrv,
    this.filmDal
  );
  constructor(
    private app: Express,
    private mqttSrv: MosquitoService,
    private validator: Validator
  ) {
    this.validationSchema = this.validator.ajv.getSchema(
      "ssz://schemas/invitationModel.schema.json"
    )?.schema;
  }

  init = async () => {
    this.create();
    this.getByFilmId();
    this.update();
    this.getByFilmId();
    this.delete();
  };

  create() {
    this.app.post(
      "/api/reviews",
      this.authService.isLoggedIn,
      this.validator.validate({ body: this.validationSchema }),
      async (req: Request, res: Response) => {
        try {
          const { review, reviewDate, rating, completed, filmId } = req.body;

          const result = await this.controller.create(
            review,
            reviewDate,
            +rating,
            completed,
            +filmId,
            req.user?.id as number
          );

          if (result.error) {
            return res
              .status(result.error.code)
              .json({ message: result.error.message });
          } else {
            return res.status(201).json(result.data);
          }
        } catch (error: any) {
          res.status(500).json({ error: error?.message });
        }
      }
    );
  }

  update() {
    this.app.put(
      "/api/reviews/:id",
      this.authService.isLoggedIn,
      this.validator.validate({ body: this.validationSchema }),
      async (req: Request, res: Response) => {
        try {
          const { review, reviewDate, rating, completed } = req.body;
          const { id } = req.params;

          const result = await this.controller.update(
            +id,
            review,
            reviewDate,
            +rating,
            completed
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

  getByFilmId() {
    this.app.get(
      "/api/reviews/film/:filmId",
      this.authService.isLoggedIn,
      async (req, res) => {
        try {
          const { filmId } = req.params;
          const result = await this.controller.getByFilmId(+filmId);
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

  delete() {
    this.app.delete(
      "/api/reviews/:id",
      this.authService.isLoggedIn,
      async (req, res) => {
        try {
          const { id } = req.params;

          const result = await this.controller.delete(+id, req.user?.id as any);

          if (result.error) {
            return res
              .status(result.error.code)
              .json({ result: false, message: result.error.message });
          } else {
            return res.status(200).json({ result: true, message: result.data });
          }
        } catch (error: any) {
          return res
            .status(500)
            .json({ result: "false", error: error?.message });
        }
      }
    );
  }
}

export default ReviewApi;
