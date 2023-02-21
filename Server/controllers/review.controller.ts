import FilmDal from "../dal/film.dal";
import InvitationDal from "../dal/invitation.dal";
import ReviewDal from "../dal/review.dal";
import { ControllerResponseModel } from "../models/contollerResult.model";
import { MqttReviewModel, MqttReviewStatus } from "../models/MqttReview.model";
import ReviewModel from "../models/review.model";
import { MosquitoService } from "../services/mosquito.service";

export class ReviewController {
  constructor(
    private dal: ReviewDal,
    private invitationDal: InvitationDal,
    private mqttSrv: MosquitoService,
    private filmDal: FilmDal
  ) {}

  create = async (
    review: string,
    reviewDate: any,
    rating: number,
    completed: boolean,
    filmId: number,
    userId: number
  ): Promise<ControllerResponseModel<ReviewModel>> => {
    if (!filmId) {
      return { error: { code: 400, message: "filmId is required" } };
    }

    let reviewObj = new ReviewModel();
    reviewObj.review = review;
    reviewObj.filmId = filmId;
    reviewObj.rating = rating;
    reviewObj.completed = completed;
    reviewObj.reviewDate = new Date(reviewDate);

    const invitations = await this.invitationDal.getInvitationByInvitedUserId(
      userId
    );
    for (let invitation of invitations) {
      if (!invitation.completed && invitation.filmId == filmId) {
        this.invitationDal.setInvitationAsDone(invitation.id);
      }
    }

    let film = await this.filmDal.getFilmById(filmId);
    if (!film) throw new Error("Film not found");

    var result = await this.dal.createNew(reviewObj, userId);

    if(!result.invitedUserId){
      result.invitedUserId = result.userId;
    }
    if(!result.issuedById){
      result.issuedById = result.userId;
    }

    const mqttMessage = new MqttReviewModel();
    mqttMessage.filmId = result.filmId as number;
    mqttMessage.id = result.id;
    mqttMessage.rating = result.rating as number;
    mqttMessage.review = result.review as string;
    mqttMessage.reviewDate = result.reviewDate as Date;
    mqttMessage.userId = result.invitedUserId as number;
    mqttMessage.status = MqttReviewStatus.created;

    this.mqttSrv.publishToFilm_ReviewTopic(filmId, mqttMessage);
    this.mqttSrv.publishToReviewTopic(result.id, mqttMessage);

    return { data: ReviewModel.convertFromReviewDb(result) };
  };

  update = async (
    reviewId: number,
    review: string,
    reviewDate: any,
    rating: number,
    completed: boolean
  ): Promise<ControllerResponseModel<ReviewModel>> => {
    let reviewObj = new ReviewModel();
    reviewObj.review = review;
    reviewObj.rating = rating;
    reviewObj.completed = completed;
    reviewObj.reviewDate = new Date(reviewDate);

    var oldReview = await this.dal.getReviewsById(reviewId);

    var result = await this.dal.update(reviewObj, reviewId);

    const mqttMessage = new MqttReviewModel();
    mqttMessage.filmId = result.filmId as number;
    mqttMessage.id = result.id;
    mqttMessage.rating = result.rating as number;
    mqttMessage.review = result.review as string;
    mqttMessage.reviewDate = result.reviewDate as Date;
    mqttMessage.userId = result.invitedUserId as number;
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

    return { data: ReviewModel.convertFromReviewDb(result) };
  };

  getByFilmId = async (
    filmId: number
  ): Promise<ControllerResponseModel<ReviewModel[]>> => {
    let result = await this.dal.getReviewsOfAFilm(filmId);


    let final = result.map((r) => ReviewModel.convertFromReviewDb(r));
    return { data: final };
  };

  delete = async (
    reviewId: number,
    userId: number
  ): Promise<ControllerResponseModel<string>> => {
    let result = await this.dal.getReviewsById(reviewId);

    if (result?.invitedUserId == userId) {
      this.dal.deleteById(reviewId);

      const mqttMessage = new MqttReviewModel();
      mqttMessage.filmId = result.filmId as number;
      mqttMessage.id = result.id;
      mqttMessage.rating = result.rating as number;
      mqttMessage.review = result.review as string;
      mqttMessage.reviewDate = result.reviewDate as Date;
      mqttMessage.userId = result.invitedUserId as number;
      mqttMessage.status = MqttReviewStatus.deleted;

      this.mqttSrv.publishToFilm_ReviewTopic(
        result.filmId as number,
        mqttMessage
      );
      this.mqttSrv.publishToReviewTopic(result.id, mqttMessage);

      return { data: "true" };
    } else {
      return { error: { code: 404, message: "not found" } };
    }
  };
}
