import { Review } from "@prisma/client";
import FilmModel from "./film.model";

class ReviewModel {
  id!: number;
  film?: FilmModel;
  filmId!: number;
  completed: boolean = false;
  reviewDate!: Date;
  rating!: number;
  review!: string;
  invitedUserId!: number;
  issuedById?: number;
  userId?: number;

  static convertFromReviewDb(dbReview: Review): ReviewModel {
    let result = new ReviewModel();
    result.id = dbReview.id;
    result.filmId = dbReview.filmId as any;
    result.completed = dbReview.completed;
    result.rating = dbReview.rating as any;
    result.reviewDate = dbReview.reviewDate as any;
    result.review = dbReview.review  as any;
    result.invitedUserId = dbReview.invitedUserId as any;
    result.issuedById = dbReview.issuedById as any;
    result.userId = dbReview.userId as any;
    return result;
  }
}

export default ReviewModel;
