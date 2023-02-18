/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

import { ReviewModel } from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Reviews<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @name SubmitNewReview
   * @request POST:/reviews
   */
  submitNewReview = (data: ReviewModel, params: RequestParams = {}) =>
    this.request<ReviewModel, any>({
      path: `/reviews`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description delete review by its ID
   *
   * @name DeleteReview
   * @request DELETE:/reviews/:id
   */
  deleteReview = (id: string, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/reviews/${id}`,
      method: "DELETE",
      format: "json",
      ...params,
    });
  /**
   * @description update review by its Id
   *
   * @name UpdateReview
   * @request PUT:/reviews/:id
   */
  updateReview = (id: string, data: ReviewModel, params: RequestParams = {}) =>
    this.request<ReviewModel, any>({
      path: `/reviews/${id}`,
      method: "PUT",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @name GetReviewByFilmId
   * @request GET:/reviews/film/:filmId
   */
  getReviewByFilmId = (filmId: string, params: RequestParams = {}) =>
    this.request<ReviewModel[], any>({
      path: `/reviews/film/${filmId}`,
      method: "GET",
      format: "json",
      ...params,
    });
}
