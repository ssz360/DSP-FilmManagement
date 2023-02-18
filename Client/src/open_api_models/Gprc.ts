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

export class Gprc<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @name GprcConvertImage
   * @request GET:/gprc/convert-image
   */
  gprcConvertImage = (params: RequestParams = {}) =>
    this.request<
      {
        fileName?: string;
      },
      any
    >({
      path: `/gprc/convert-image`,
      method: "GET",
      format: "json",
      ...params,
    });
}
