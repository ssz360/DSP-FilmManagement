import FilmDal from "../dal/film.dal";
import InvitationDal from "../dal/invitation.dal";
import UserDal from "../dal/user.dal";
import { ControllerResponseModel } from "../models/contollerResult.model";
import FilmModel from "../models/film.model";
import InvitationModel from "../models/invitation.model";
import AuthService from "../services/auth.service";

export class InvitationController {
  constructor(
    private dal: InvitationDal,
    private userDal: UserDal,
    private filmDal: FilmDal
  ) {}

  getByIssuerUserId = async (
    userId: number
  ): Promise<ControllerResponseModel<InvitationModel[]>> => {
    let result = await this.dal.getInvitationByIssuerUserId(userId);

    for (let el of result) {
      const issuer = await this.userDal.getById(el.issuedById);
      delete issuer.password;
      delete issuer.salt;
      const invited = await this.userDal.getById(el.invitedUserId);
      delete invited.password;
      delete invited.salt;
      const film = await this.filmDal.getFilmById(el.filmId);
      el.issuedBy = issuer;
      el.invitedUser = invited;
      el.film = film as FilmModel;
    }

    if (!result) {
      return { error: { code: 404, message: "The invitation not found" } };
    }

    return { data: result };
  };

  getByInvitations = async (
    userId: number
  ): Promise<ControllerResponseModel<InvitationModel[]>> => {
    let result = await this.dal.getInvitationByInvitedUserId(userId);

    for (let el of result) {
      const issuer = await this.userDal.getById(el.issuedById);
      delete issuer.password;
      delete issuer.salt;
      const invited = await this.userDal.getById(el.invitedUserId);
      delete invited.password;
      delete invited.salt;
      const film = await this.filmDal.getFilmById(el.filmId);
      el.issuedBy = issuer;
      el.invitedUser = invited;
      el.film = film as FilmModel;
    }

    if (!result) {
      return { error: { code: 404, message: "The invitation not found" } };
    }

    return { data: result };
  };

  create = async (invitedUserId: number[], filmId: number, userId: number) => {
    for (let interviewerId of invitedUserId) {
      let invitation = new InvitationModel();
      invitation.filmId = filmId;
      invitation.issuedById = userId;
      invitation.invitedUserId = +interviewerId;
      invitation.isInvitation=true;
      await this.dal.create(invitation);
    }
  };

  deleteInvitation = async (
    id: number,
    userId: number
  ): Promise<ControllerResponseModel<any>> => {
    let result = await this.dal.getById(id);

    if (result?.issuedById == userId) {
      this.dal.deleteById(id);
      return { data: { result: "true" } };
    } else {
      return {
        error: {
          code: 401,
          message: "You are not authorized to delete this invitation.",
        },
      };
    }
  };
}
