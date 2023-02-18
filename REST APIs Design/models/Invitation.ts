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

import { InvitationModel, IssueInvitationRequest } from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Invitation<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @name GetListOfIssuedInvitations
   * @request GET:/invitation/issuer
   */
  getListOfIssuedInvitations = (params: RequestParams = {}) =>
    this.request<InvitationModel[], any>({
      path: `/invitation/issuer`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @name GetListOfInvitations
   * @request GET:/invitation/invited
   */
  getListOfInvitations = (params: RequestParams = {}) =>
    this.request<InvitationModel[], any>({
      path: `/invitation/invited`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @name IssueNewInvitation
   * @request POST:/invitation
   */
  issueNewInvitation = (data: IssueInvitationRequest, params: RequestParams = {}) =>
    this.request<InvitationModel[], any>({
      path: `/invitation`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description delete an invitation by its ID
   *
   * @name DeleteAnInvitation
   * @request DELETE:/invitation/:id
   */
  deleteAnInvitation = (id: string, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/invitation/${id}`,
      method: "DELETE",
      format: "json",
      ...params,
    });
}
