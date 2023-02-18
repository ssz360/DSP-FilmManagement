import FilmModel from "./film.model";
import ReviewModel from "./review.model";
import UserModel from "./user.model";

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
