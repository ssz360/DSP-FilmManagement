import FilmModel from "./film.model";
import UserModel from "./user.model";
import { InvitationModel as Invitation } from './../../Client/src/open_api_models/data-contracts';

class InvitationModel {
  id!: number;
  filmId!: number;
  issuedById!: number;
  issuedBy?: UserModel;
  invitedUserId!: number;
  invitedUser?: UserModel;
  film?: FilmModel;
  completed: boolean = false;
}

export default InvitationModel;
