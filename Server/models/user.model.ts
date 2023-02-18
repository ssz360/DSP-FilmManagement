import FilmModel from "./film.model";

class UserModel {
  id!: number;
  name!: string;
  email!: string;
  password?: string;
  salt?: string;
}


declare global {
  namespace Express {
    interface User {
      id: number;
      name: string;
      email: string;
    }
  }
}


export default UserModel;
