import { Request, Response, Express } from "express";
import path from "path";
import AuthService from "../services/auth.service";
import GprcServices from "../services/gprc.service";
import * as fs from "fs";
import { GprcController } from "../controllers/gprc.controller";

class GprcApi {
  authService = new AuthService();
  gprcService = new GprcServices();
  controller = new GprcController(this.gprcService);

  constructor(private app: Express) {}

  init = async () => {
    this.convertImage();
  };

  convertImage() {
    this.app.get(
      "/api/gprc/convert-image",
      this.authService.isLoggedIn,
      async (req, res) => {
        try {
          const fileName = req.get("file-name");
          const desType = req.get("destination-type");
          const justName = fileName?.split(".")[0];
          const justType = fileName?.split(".")[1];

          const destName = ((justName as any) + "." + desType) as any;

          const result = await this.controller.imageConverter(
            fileName as string,
            destName,
            justType as string,
            desType as string
          );

          if (result.error) {
            return res
              .status(result.error.code)
              .json({ message: result.error.message });
          } else {
            return res.status(200).json({ fileName: result.data });
          }
        } catch (error: any) {
          return res.status(500).json({ error: error?.message });
        }
      }
    );
  }
}

export default GprcApi;
