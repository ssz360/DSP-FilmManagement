import { UserModel } from "./../../Client-Side/src/models/openApiAutoGenerated/data-contracts";
import FilmModel from "./film.model";
import ReviewModel from "./review.model";

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