import validator from "validator";
import userDAL from "../dal/user.dal";
import UserModel from "../models/user.model";
import UserRegisterModel from "../models/userRegister.model";
import { Request, Response, Express } from "express";
import AuthService from "../services/auth.service";
import WebsocketService from "../services/websocket.service";
import { MessageType } from "../models/websocketMessage";

class UserApi {
  dal = new userDAL();

  constructor(
    private app: Express,
    private authSrv: AuthService,
    private wsSrv: WebsocketService
  ) {}

  init = async () => {
    this.login();
    this.logout();
    this.register();
    this.isUserLoggedIn();
    this.getAllUsers();
  };

  login() {
    this.app.post("/api/user/login", (req: Request, res: Response, next) => {
      const { email, password } = req.body;
      let validation = validator.isEmail(email);
      if (!validation) {
        res.status(400).json("bad request");
        return;
      }

      this.authSrv.authenticate(req, res, next, (err: any, user: any) => {
        if (!err) {
          this.wsSrv.broadcast({
            typeMessage: MessageType.login,
            userId: user.id,
            userName: user.name,
          });
        }
      });
    });
  }

  register() {
    this.app.post(
      "/api/user/register",
      async (req: Request, res: Response, next) => {
        const { email, password, passwordConfirmation, name } = req.body;
        let validation = validator.isEmail(email);
        if (!validation) {
          res.status(400).json("bad request");
          return;
        }
        if (password !== passwordConfirmation) {
          res.status(400).json("bad request");
          return;
        }

        const user: UserRegisterModel = {
          email: email,
          name: name,
          password: password,
          passwordConfirmation: passwordConfirmation,
        };

        try {
          const checkUser = await this.dal.get(email);
          if (checkUser) {
            res.status(400).json({
              result: false,
              message: "This Email is registered already.",
            });
            return;
          }
          const newUser: UserModel = {
            id: 0,
            password: password,
            email: email,
            name: name,
            salt: "",
            films: [],
          };
          const result = await this.dal.addNew(newUser);
          if (result.id) {
            res.status(201).json({ result: true });
            return;
          }
        } catch (error) {
          res.status(500).json({ result: false, message: error });
          return;
        }
      }
    );
  }

  logout() {
    this.app.get("/api/user/logout", (req: Request, res: Response) => {
      try {
        //req.logOut(() => {});
        req.session.destroy((err) => {
          res.clearCookie("connect.sid");
          res.send("Logged out");
          this.wsSrv.broadcast({
            typeMessage: MessageType.logout,
            userId: req.user?.id,
            userName: req.user?.name,
          });
        });
      } catch (error) {
        console.log(error);
      }
    });
  }

  isUserLoggedIn() {
    this.app.get("/api/user/isUserLoggedIn", (req: Request, res: Response) => {
      res.status(200).json({ isLoggedIn: !!req.user, user: req.user });
    });
  }

  getAllUsers() {
    this.app.get("/api/user/all", async (req: Request, res: Response) => {
      try {
        let result = await this.dal.getAll();
        result = result.map((el) => {
          delete el.password;
          delete el.salt;
          return el;
        });
        res.status(200).json(result);
        return;
      } catch (error) {
        res.status(500).json({ message: error });
      }
    });
  }

  // getOnlineUsers() {
  //   this.app.get("/api/user/online", async (req: Request, res: Response) => {
  //     try {
  //       req.sessionStore.all?.((err:any, data:any) => {
  //         const users = [];
  //         for(let i in data){
  //           const el = data[i];
  //           const user = el.passport.user;
  //           users.push(user);
  //         }
  //         res.status(200).json(users);
  //       });
  //       return;
  //     } catch (error) {
  //       res.status(500).json({ message: error });
  //     }
  //   });
  // }
}

export default UserApi;
