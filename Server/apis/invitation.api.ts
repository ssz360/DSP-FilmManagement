import { Request, Response, Express } from "express";
import AuthService from "../services/auth.service";
import InvitationDal from "../dal/invitation.dal";
import InvitationModel from "../models/invitation.model";
import UserDal from "../dal/user.dal";
import FilmDal from "../dal/film.dal";
import FilmModel from "../models/film.model";
import { Validator } from "express-json-validator-middleware";
import { InvitationController } from "../controllers/invitation.controller";

class InvitationApi {
  dal = new InvitationDal();
  userDal = new UserDal();
  filmDal = new FilmDal();
  authService = new AuthService();
  validationSchema: any;
  controller = new InvitationController(this.dal, this.userDal, this.filmDal);

  constructor(private app: Express, private validator: Validator) {
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
        const result = await this.controller.getByIssuerUserId(
          req.user?.id as number
        );

        if (result.error) {
          return res
            .status(result.error.code)
            .json({ message: result.error.message });
        } else {
          return res.status(200).json(result.data);
        }
      }
    );
  }

  getByInvitations() {
    this.app.get(
      "/api/invitation/invited",
      this.authService.isLoggedIn,
      async (req, res) => {
        const result = await this.controller.getByInvitations(
          req.user?.id as number
        );
        if (result.error) {
          return res
            .status(result.error.code)
            .json({ message: result.error.message });
        } else {
          return res.status(200).json(result.data);
        }
      }
    );
  }

  create() {
    this.app.post(
      "/api/invitation",
      this.authService.isLoggedIn,
      this.validator.validate({ body: this.validationSchema }),
      async (req: Request, res: Response) => {
        try {
          const { filmId, invitedUserId } = req.body;

          await this.controller.create(
            invitedUserId,
            +filmId,
            req.user?.id as number
          );

          res.status(201).json({ message: "The invitations sent." });
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

          const result = await this.controller.deleteInvitation(
            +id,
            req.user?.id as number
          );

          if (result.error) {
            return res
              .status(result.error.code)
              .json({ message: result.error.message });
          } else {
            return res.status(200).json(result.data);
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
