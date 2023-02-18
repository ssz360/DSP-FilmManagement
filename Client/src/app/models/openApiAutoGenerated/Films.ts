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

import { CreateFilmRequest, CreateFilmResponse, FilmResponse, FilmsResponse } from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Films<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @name GetFilms
   * @request GET:/films
   */
  getFilms = (params: RequestParams = {}) =>
    this.request<FilmsResponse, any>({
      path: `/films`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @name CreateNewFilm
   * @request POST:/films
   */
  createNewFilm = (data: CreateFilmRequest, params: RequestParams = {}) =>
    this.request<CreateFilmResponse, any>({
      path: `/films`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @name GetFilmsById
   * @request GET:/films/:id
   */
  getFilmsById = (id: string, params: RequestParams = {}) =>
    this.request<FilmResponse, any>({
      path: `/films/${id}`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @name GetYourFilms
   * @request GET:/films/yourFilms
   */
  getYourFilms = (params: RequestParams = {}) =>
    this.request<FilmsResponse, any>({
      path: `/films/yourFilms`,
      method: "GET",
      format: "json",
      ...params,
    });
}
