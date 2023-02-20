import * as fs from "fs";
import path from "path";
import { ControllerResponseModel } from "../models/contollerResult.model";
import GprcServices from "../services/gprc.service";

export class GprcController {
  constructor(private gprcService: GprcServices) {}

  imageConverter = async (
    fileName: string,
    destName: string,
    srcType: string,
    destType: string
  ): Promise<ControllerResponseModel<string>> => {
    const sourcePath = path.resolve(
      __dirname,
      "../",
      "images",
      fileName as any
    );

    const destPath = path.resolve(__dirname, "../", "images", destName);

    if (!fs.existsSync(sourcePath)) {
      return { error: { code: 404, message: "file not found." } };
    }

    if (fs.existsSync(destPath)) {
      return { data: destName };
    }

    await this.gprcService.convertImages(
      sourcePath,
      destPath,
      srcType?.toUpperCase() as any,
      destType?.toUpperCase() as any
    );

    return { data: destName };
  };
}
