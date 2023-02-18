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

export interface IssueInvitationRequest {
  filmId?: number;
  invitedUserId?: number[];
}

export interface InvitationModel {
  id?: number;
  filmId?: number;
  issuedById?: number;
  invitedUserId?: number;
  issuer?: UserModel;
  reviewer?: UserModel;
  film?: Film;
  done?: boolean;
}

export type ReviewsResponse = SubmitReviewRequest[];

export interface SubmitReviewRequest {
  id?: number;
  filmId?: number;
  /** @default false */
  completed?: boolean;
  reviewDate?: Date;
  /**
   * @min 0
   * @max 10
   */
  rating?: number;
  /** @maxLength 1000 */
  review?: string;
  issuedById?: number;
}

export interface SubmitReviewResponse {
  filmId?: number;
  issuedById?: number;
  /** @default false */
  completed?: boolean;
  reviewDate?: Date;
  /**
   * @min 0
   * @max 10
   */
  rating?: number;
  /** @maxLength 1000 */
  review?: string;
  id?: number;
  userId?: number;
}

/** @example "{"id":0,"title":"Film 1","ownerId":3,"private":true,"watchDate":"2022-12-30T00:00:00.000Z","rating":2,"favorite":false}" */
export interface FilmResponse {
  id?: number;
  title?: string;
  ownerId?: number;
  private?: boolean;
  watchDate?: Date;
  rating?: number;
  favorite?: boolean;
}

/** @example "[{"id":0,"title":"Film 1","ownerId":3,"private":true,"watchDate":"2022-12-30T00:00:00.000Z","rating":2,"favorite":false},{"id":1,"title":"Film 3","ownerId":3,"private":true,"watchDate":"2022-12-13T00:00:00.000Z","rating":3,"favorite":false}]" */
export type FilmsResponse = FilmResponse[];

export interface CreateFilmRequest {
  title?: string;
  /** @default true */
  isPrivate?: boolean;
  watchDate?: Date;
  /**
   * @min 0
   * @max 10
   */
  rating?: number;
  /** @default false */
  favorite?: boolean;
  images?: {
    data?: string;
    name?: string;
  }[];
}

export interface CreateFilmResponse {
  title?: string;
  /** @default true */
  private?: boolean;
  watchDate?: Date;
  /**
   * @min 0
   * @max 10
   */
  rating?: number;
  /** @default false */
  favorite?: boolean;
  ownerId?: number;
}

export interface LoginResponse {
  id?: number;
  name?: string;
  /** @pattern email */
  email?: string;
}

export interface LoginRequest {
  /** @pattern email */
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  passwordConfirmation: string;
  name: string;
}

/** @pattern ^(19|20)[0-9]{2}[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$ */
export type Date = string;

export interface UserModel {
  id?: number;
  name?: string;
  /** @format email */
  email?: string;
  /**
   * @minLength 6
   * @maxLength 20
   */
  password?: string;
}

export interface Film {
  id?: number;
  title?: string;
  ownerId?: number;
  /** @default true */
  private?: boolean;
  watchDate?: Date;
  /**
   * @min 0
   * @max 10
   */
  rating?: number;
  /** @default false */
  favorite?: boolean;
  medias?: Media[];
}

export interface Media {
  id?: number;
  type?: string;
  name?: string;
  filmId?: number;
}

export interface Review {
  id?: number;
  filmId?: number;
  issuedById?: number;
  invitedUserId?: number;
  /** @default false */
  completed?: boolean;
  reviewDate?: Date;
  /**
   * @min 0
   * @max 10
   */
  rating?: number;
  /** @maxLength 1000 */
  review?: string;
  userId?: number;
}

export interface WebsocketMessageModel {
  /** type of the message (the available types are login, logout, or update) */
  typeMessage?: "login" | "logout" | "update" | "snapshot_online" | "snapshot_activeFilms";
  /** identified of the user */
  userId?: number;
  /** name of the user */
  userName?: string;
  /** identified of the film */
  filmId?: number;
  /** title of the film */
  taskName?: string;
}

export interface MqttFilmActiveModel {
  /** current condition of the film (the available types are active if it is selected by a user, inactive if it is not selected by any user, or deleted if it has been removed from the service) */
  status?: "active" | "inactive" | "deleted";
  /** identifier of the user */
  userId?: number;
  /** name of the user */
  userName?: string;
}

export interface MqttReviewModel {
  id?: number;
  filmId?: number;
  reviewDate?: Date;
  rating?: number;
  review?: string;
  userId?: number;
  status?: "created" | "updated" | "deleted";
}
