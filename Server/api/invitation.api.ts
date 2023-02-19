import { Request, Response, Express } from "express";
import AuthService from "../services/auth.service";
import InvitationDal from "../dal/invitation.dal";
import InvitationModel from "../models/invitation.model";
import UserDal from "../dal/user.dal";
import FilmDal from "../dal/film.dal";
import FilmModel from "../models/film.model";
import { Validator } from "express-json-validator-middleware";

class InvitationApi {
  dal = new InvitationDal();
  userDal = new UserDal();
  filmDal = new FilmDal();
  authService = new AuthService();
  validationSchema: any;

  constructor(private app: Express,
    private validator: Validator) {
      this.validationSchema = this.validator.ajv.getSchema(
        "ssz://schemas/invitationModel.schema.json"
      )?.schema;
    }

  init = async () => {
    this.create();
    this.deleteInvitation();
    this.getByInvitations();
    this.getByIssuerUserId();
    // this.setAsDone();
  };

  getByIssuerUserId() {
    this.app.get(
      "/api/invitation/issuer",
      this.authService.isLoggedIn,
      async (req, res) => {
        let result = await this.dal.getInvitationByIssuerUserId(
          req.user?.id as any
        );

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
          res.status(404).json({ error: "The invitation not found" });
          return;
        }

        res.status(200).json(result);
      }
    );
  }

  getByInvitations() {
    this.app.get(
      "/api/invitation/invited",
      this.authService.isLoggedIn,
      async (req, res) => {
        let result = await this.dal.getInvitationByInvitedUserId(
          req.user?.id as any
        );

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
          res.status(404).json({ error: "The invitation not found" });
          return;
        }

        res.status(200).json(result);
      }
    );
  }

  //   setAsDone() {
  //     this.app.put(
  //       "/api/invitation/:id",
  //       this.authService.isLoggedIn,
  //       async (req, res) => {
  //         const { id } = req.params;
  //         const invitation = await this.dal.getById(+id);
  //         if (invitation.issuedById !== req.user?.id) {
  //           res.status(401).json({
  //             error: "You are not authorized to change this invitation",
  //           });
  //         }
  //         let result = await this.dal.setInvitationAsDone(+id);
  //         if (!result) {
  //           res.status(404).json({ error: "The invitation not found" });
  //           return;
  //         }

  //         res.status(200).json(result);
  //       }
  //     );
  //   }

  create() {
    this.app.post(
      "/api/invitation",
      this.authService.isLoggedIn,
      this.validator.validate({ body: this.validationSchema }),
      async (req: Request, res: Response) => {
        try {
          const { filmId, invitedUserId} = req.body;

          for (let interviewerId of invitedUserId
            ) {
            let invitation = new InvitationModel();
            invitation.filmId = +filmId;
            invitation.issuedById = req.user?.id as any;
            invitation.invitedUserId = +interviewerId;
            await this.dal.create(invitation);
          }

          return res.status(201).json({ message: "The invitations sent." });
        } catch (error: any) {
          res.status(500).json({ error: error?.message });
        }
      }
    );
  }

  deleteInvitation() {
    this.app.delete(
      "/api/invitation/:id",
      this.authService.isLoggedIn,
      async (req, res) => {
        try {
          const { id } = req.params;
          let result = await this.dal.getById(+id);

          if (result?.issuedById == (req.user?.id as any)) {
            this.dal.deleteById(+id);
            return await res.status(200).json({ result: "true" });
          } else {
            return res.status(401).json({
              message: "You are not authorized to delete this invitation.",
            });
          }
        } catch (error: any) {
          return res
            .status(500)
            .json({ result: "false", error: error?.message });
        }
      }
    );
  }
}

export default InvitationApi;
