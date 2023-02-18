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

import { FilmModel } from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Films<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description get films (public films and user films)
   *
   * @name GetFilms
   * @request GET:/films
   */
  getFilms = (params: RequestParams = {}) =>
    this.request<FilmModel[], any>({
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
  createNewFilm = (data: FilmModel, params: RequestParams = {}) =>
    this.request<FilmModel, any>({
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
    this.request<FilmModel, any>({
      path: `/films/${id}`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * @description delete film by its ID
   *
   * @name DeleteFilm
   * @request DELETE:/films/:id
   */
  deleteFilm = (id: string, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/films/${id}`,
      method: "DELETE",
      format: "json",
      ...params,
    });
  /**
   * @description update film by its Id
   *
   * @name UpdateFilm
   * @request PUT:/films/:id
   */
  updateFilm = (id: string, data: FilmModel, params: RequestParams = {}) =>
    this.request<FilmModel, any>({
      path: `/films/${id}`,
      method: "PUT",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description delete media by its ID
   *
   * @name DeleteMedia
   * @request DELETE:/films/media/:id
   */
  deleteMedia = (id: string, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/films/media/${id}`,
      method: "DELETE",
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
    this.request<FilmModel[], any>({
      path: `/films/yourFilms`,
      method: "GET",
      format: "json",
      ...params,
    });
}
