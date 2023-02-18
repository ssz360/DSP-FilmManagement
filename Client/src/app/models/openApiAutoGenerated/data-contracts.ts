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

export interface User {
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
  owner?: number;
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
}

export interface Review {
  filmId?: number;
  reviewerId?: number;
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
}
