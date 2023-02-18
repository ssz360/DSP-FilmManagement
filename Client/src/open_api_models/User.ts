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

import { UserModel } from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class User<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @name GetAll
   * @request GET:/user/all
   */
  getAll = (params: RequestParams = {}) =>
    this.request<UserModel[], any>({
      path: `/user/all`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @name GetIfUserLoggedIn
   * @request GET:/user/isUserLoggedIn
   */
  getIfUserLoggedIn = (params: RequestParams = {}) =>
    this.request<
      {
        isLoggedIn?: boolean;
        user?: UserModel;
      },
      any
    >({
      path: `/user/isUserLoggedIn`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @name Login
   * @request POST:/user/login
   */
  login = (
    data: {
      /** @pattern email */
      email: string;
      password: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<UserModel, any>({
      path: `/user/login`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @name Logout
   * @request GET:/user/logout
   */
  logout = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/user/logout`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @name Register
   * @request POST:/user/register
   */
  register = (
    data: {
      email: string;
      password: string;
      passwordConfirmation: string;
      name: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/user/register`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
}
