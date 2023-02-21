import { PrismaClient, Review } from "@prisma/client";
import ReviewModel from "../models/review.model";

class ReviewDal {
  db = new PrismaClient();

  async getReviewsOfAFilm(filmId: number): Promise<Review[]> {
    let result: any = await this.db.review.findMany({
      where: {
        filmId: filmId,
        completed: true,
      },
    });
    return result as Review[];
  }

  async getReviewsById(id: number): Promise<Review> {
    let result: any = await this.db.review.findFirst({
      where: {
        id: id,
      },
    });
    return result as Review;
  }

  async createNew(review: ReviewModel, userId: number): Promise<Review> {
    const old = await this.db.review.findFirst({
      where: {
        invitedUserId: userId,
        filmId: review.filmId,
        isInvitation: true,
      },
    });

    if (old) {
      return await this.db.review.update({
        where: {
          id: old?.id,
        },
        data: {
          rating: review.rating,
          review: review.review,
          reviewDate: review.reviewDate,
          completed: review.completed,
          filmId: review.filmId,
          isInvitation:false,
        },
      });
    } else {
      return await this.db.review.create({
        data: {
          userId: userId,
          invitedUserId: userId,
          issuedById: userId,
          rating: review.rating,
          review: review.review,
          reviewDate: review.reviewDate,
          completed: review.completed,
          filmId: review.filmId,
          isInvitation: false,
        },
      });
    }
  }

  async update(review: ReviewModel, reviewId: number): Promise<Review> {
    return await this.db.review.update({
      where: {
        id: reviewId,
      },
      data: {
        rating: review.rating,
        review: review.review,
        reviewDate: review.reviewDate,
        completed: review.completed,
        filmId: review.filmId,
      },
    });
  }

  async deleteById(id: number) {
    return await this.db.review.delete({
      where: {
        id: id,
      },
    });
  }
}

export default ReviewDal;
