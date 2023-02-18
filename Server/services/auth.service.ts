import passport from "passport";
import LocalStrategy from "passport-local";
import crypto from "crypto";
import UserDal from "../dal/user.dal";
import UserModel from "../models/user.model";
import { Request, Response } from "express";


class AuthService {
  dal = new UserDal();

  init() {
    passport.use(
      new LocalStrategy.Strategy(
        {
          usernameField: "email",
          passwordField: "password",
        },
        async (username: string, password: string, cb: any) => {
          const user = await this.dal.get(username);

          if (!user)
            return cb(null, false, {
              message: "Incorrect username or password.",
            });

          const result = await this.checkPassword(
            password,
            user.password as string,
            user.salt as string
          );

          if (!result)
            return cb(null, false, {
              message: "Incorrect username or password.",
            });

          return cb(null, user);
        }
      )
    );

    passport.serializeUser(function (u, cb) {
      let user = u as UserModel;
      delete user.password;
      delete user.salt;
      cb(null, user);
    });

    passport.deserializeUser(function (user: UserModel, cb) {
      return cb(null, user);
    });
  }

  checkPassword(password: string, userPassword: string, salt: string) {
    return new Promise((resolve, reject) => {
      crypto.scrypt(password, salt, 32, (err, hashedPassword) => {
        if (err) reject(err);
        if (
          !crypto.timingSafeEqual(
            Buffer.from(userPassword, "hex"),
            hashedPassword
          )
        )
          resolve(false);
        else resolve(true);
      });
    });
  }

  authenticate(req: Request, res: Response, next: any,callback:Function) {
    return passport.authenticate("local", (err, user, info) => {
      if (err) return next(err);
      if (!user) {
        return res.status(401).send(info);
      }
      req.login(user, (err) => {
        if (err) return next(err);
        callback(err,req.user);
        return res.status(201).json(req.user);
      });
    })(req, res, next);
  }

  isLoggedIn(req: Request, res: Response, next: any) {
    if (req.isAuthenticated()) {
      return next();
    } else {
      return res.status(401).json({ error: "Not authorized" });
    }
  }
}

export default AuthService;
