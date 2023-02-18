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

/** @pattern ^(19|20)[0-9]{2}[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$ */
export type Date = string;

export interface InvitationModel {
  id?: number;
  filmId?: number;
  issuedById?: number;
  invitedUserId?: number;
  issuedBy?: UserModel;
  invitedUser?: UserModel;
  film?: FilmModel;
  completed?: boolean;
}

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

export interface FilmModel {
  id?: number;
  title?: string;
  ownerId?: number;
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
  medias?: MediaModel[];
  filmReviews?: {
    href?: string;
  };
  self?: {
    href?: string;
  };
}

export interface MediaModel {
  id?: number;
  type?: string;
  name?: string;
  filmId?: number;
}

export interface ReviewModel {
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
