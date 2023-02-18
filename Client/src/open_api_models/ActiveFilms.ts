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

import { HttpClient, RequestParams } from "./http-client";

export class ActiveFilms<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @name GetActiveMovie
   * @request GET:/active-films
   */
  getActiveMovie = (params: RequestParams = {}) =>
    this.request<
      {
        activeFilmId?: number;
      },
      any
    >({
      path: `/active-films`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @name DeleteActiveMovie
   * @request DELETE:/active-films
   */
  deleteActiveMovie = (params: RequestParams = {}) =>
    this.request<
      {
        activeFilmId?: number;
      },
      any
    >({
      path: `/active-films`,
      method: "DELETE",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @name SetMovieActive
   * @request GET:/active-films/:filmId
   */
  setMovieActive = (filmId: string, params: RequestParams = {}) =>
    this.request<object, any>({
      path: `/active-films/${filmId}`,
      method: "GET",
      format: "json",
      ...params,
    });
}
