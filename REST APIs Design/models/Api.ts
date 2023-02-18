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

import { Date } from "./data-contracts";
import { HttpClient, RequestParams } from "./http-client";

export class Api<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @name GprcConvertImage
   * @request GET:/api/gprc/convert-image
   */
  gprcConvertImage = (params: RequestParams = {}) =>
    this.request<Date, any>({
      path: `/api/gprc/convert-image`,
      method: "GET",
      format: "json",
      ...params,
    });
}
