import { Request, Response, Express } from "express";
import path from "path";
import AuthService from "../services/auth.service";
import GprcServices from "../services/gprc.service";
import * as fs from "fs";

class GprcApi {
  authService = new AuthService();
  gprcService = new GprcServices();

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

          const destName =((justName as any) + "." + desType) as any;
          const sourcePath = path.resolve(
            __dirname,
            "../",
            "images",
            fileName as any
          );

          const destPath = path.resolve(
            __dirname,
            "../",
            "images",
            destName
          );

          if (!fs.existsSync(sourcePath)) {
            return res.status(404).json({ error: "file not found." });
          }

          if (fs.existsSync(destPath)) {
            return await res.status(200).json({ fileName: destName });
        }

         await  this.gprcService.convertImages(sourcePath, destPath, justType?.toUpperCase() as any, desType?.toUpperCase() as any);

          return await res.status(200).json({ fileName: destName });
        } catch (error: any) {
          return res.status(500).json({ error: error?.message });
        }
      }
    );
  }
}

export default GprcApi;
