import { PrismaClient } from "@prisma/client";
import UserModel from "../models/user.model";
import crypto from "crypto";

class UserDal {
  db = new PrismaClient();

  async get(username: string): Promise<UserModel> {
    let result = await this.db.user.findFirst({
      where: {
        email: username,
      },
    });

    return result as UserModel;
  }

  async getById(userId: number): Promise<UserModel> {
    let result = await this.db.user.findFirst({
      where: {
        id: userId,
      },
    });

    return result as UserModel;
  }

  async getAll(): Promise<UserModel[]> {
    let result = await this.db.user.findMany();
    return result as UserModel[];
  }


  async addNew(user: UserModel) {
    const salt = crypto.randomBytes(32).toString("hex");
    const hashedPassword = await this.getHashedPassword(
      user.password as string,
      salt
    );

    return await this.db.user.create({
      data: {
        email: user.email,
        password: hashedPassword as string,
        name: user.name,
        salt: salt,
      },
    });
  }

  private getHashedPassword(password: string, salt: string) {
    return new Promise((resolve, reject) => {
      crypto.scrypt(password, salt, 32, async (err, hashedPassword) => {
        if (!err) {
          resolve(hashedPassword.toString("hex"));
        } else {
          reject(err);
        }
      });
    });
  }
}

export default UserDal;
