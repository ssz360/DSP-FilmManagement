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

import { LoginRequest, LoginResponse, RegisterRequest } from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class User<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
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
        user?: LoginResponse;
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
  login = (data: LoginRequest, params: RequestParams = {}) =>
    this.request<LoginResponse, any>({
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
   * @request POST:/user/logout
   */
  logout = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/user/logout`,
      method: "POST",
      ...params,
    });
  /**
   * No description
   *
   * @name Register
   * @request POST:/user/register
   */
  register = (data: RegisterRequest, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/user/register`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
}
