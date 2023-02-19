import { Request, Response, Express } from "express";
import AuthService from "../services/auth.service";
import FilmDal from "../dal/film.dal";
import ReviewModel from "../models/review.model";
import ReviewDal from "../dal/review.dal";
import InvitationDal from "../dal/invitation.dal";
import { MosquitoService } from "../services/mosquito.service";
import { MqttReviewModel, MqttReviewStatus } from "../models/MqttReview.model";
import { Validator } from "express-json-validator-middleware";

class ReviewApi {
  dal = new ReviewDal();
  invitationDal = new InvitationDal();
  authService = new AuthService();
  validationSchema: any;
  constructor(private app: Express, private mqttSrv: MosquitoService,   private validator: Validator) {
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

          if (!filmId) {
            res.status(400).json({ message: "filmId is required" });
            return;
          }

          let reviewObj = new ReviewModel();
          reviewObj.review = review;
          reviewObj.filmId = +filmId;
          reviewObj.rating = +rating;
          reviewObj.completed = completed;
          reviewObj.reviewDate = new Date(reviewDate);

          const invitations =
            await this.invitationDal.getInvitationByInvitedUserId(
              req.user?.id as any
            );
          for (let invitation of invitations) {
            if (!invitation.completed && invitation.filmId == filmId) {
              this.invitationDal.setInvitationAsDone(invitation.id);
            }
          }

          let fId = parseInt(filmId);
          let film = await new FilmDal().getFilmById(fId);
          if (!film) throw new Error("Film not found");

          var result = await this.dal.createNew(reviewObj, req.user?.id as any);

          const mqttMessage = new MqttReviewModel();
          mqttMessage.filmId = result.filmId as number;
          mqttMessage.id = result.id;
          mqttMessage.rating = result.rating as number;
          mqttMessage.review = result.review as string;
          mqttMessage.reviewDate = result.reviewDate as Date;
          mqttMessage.userId = result.userId as number;
          mqttMessage.status = MqttReviewStatus.created;

          this.mqttSrv.publishToFilm_ReviewTopic(filmId, mqttMessage);
          this.mqttSrv.publishToReviewTopic(result.id, mqttMessage);

          return res.status(201).json(ReviewModel.convertFromReviewDb(result));
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

          let reviewObj = new ReviewModel();
          reviewObj.review = review;
          reviewObj.rating = +rating;
          reviewObj.completed = completed;
          reviewObj.reviewDate = new Date(reviewDate);

          var oldReview = await this.dal.getReviewsById(+id as any);

          var result = await this.dal.update(reviewObj, +id as any);

          const mqttMessage = new MqttReviewModel();
          mqttMessage.filmId = result.filmId as number;
          mqttMessage.id = result.id;
          mqttMessage.rating = result.rating as number;
          mqttMessage.review = result.review as string;
          mqttMessage.reviewDate = result.reviewDate as Date;
          mqttMessage.userId = result.userId as number;
          mqttMessage.status = MqttReviewStatus.updated;

          this.mqttSrv.publishToFilm_ReviewTopic(
            result.filmId as number,
            mqttMessage
          );
          this.mqttSrv.publishToReviewTopic(result.id, mqttMessage);

          if (reviewObj.rating != oldReview.rating) {
            this.mqttSrv.publishToReview_RatingTopic(
              result.id,
              oldReview.rating as number,
              result.rating as number
            );
          }
          if (reviewObj.review != oldReview.review) {
            this.mqttSrv.publishToReview_ReviewTopic(
              result.id,
              oldReview.review as string,
              result.review as string
            );
          }
          if (
            reviewObj.reviewDate.toDateString() !=
            oldReview.reviewDate?.toDateString()
          ) {
            this.mqttSrv.publishToReview_DateTopic(
              result.id,
              oldReview.reviewDate as Date,
              result.reviewDate as Date
            );
          }

          return res.status(201).json(ReviewModel.convertFromReviewDb(result));
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
          let result = await this.dal.getReviewsOfAFilm(+filmId);

          let final = result.map((r) => ReviewModel.convertFromReviewDb(r));
          return await res.status(200).json(final);
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
          let result = await this.dal.getReviewsById(+id);

          if (result?.userId == (req.user?.id as any)) {
            this.dal.deleteById(+id);

            const mqttMessage = new MqttReviewModel();
            mqttMessage.filmId = result.filmId as number;
            mqttMessage.id = result.id;
            mqttMessage.rating = result.rating as number;
            mqttMessage.review = result.review as string;
            mqttMessage.reviewDate = result.reviewDate as Date;
            mqttMessage.userId = result.userId as number;
            mqttMessage.status = MqttReviewStatus.deleted;

            this.mqttSrv.publishToFilm_ReviewTopic(
              result.filmId as number,
              mqttMessage
            );
            this.mqttSrv.publishToReviewTopic(result.id, mqttMessage);

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
}

export default ReviewApi;
