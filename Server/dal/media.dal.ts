import { PrismaClient } from "@prisma/client";
import MediaModel from "../models/media.model";
import ReviewModel from "../models/review.model";

class MediaDal {
  db = new PrismaClient();

  async getByFilmId(filmId: number): Promise<MediaModel[]> {
    let result: any = await this.db.media.findMany({
      where: {
        filmId: filmId,
      },
    });
    return result as MediaModel[];
  }

  async createNew(name: string, type: string, filmId: number): Promise<MediaModel> {
    return await this.db.media.create({
      data: {
        name: name,
        type: type,
        filmId: filmId,
      },
    });
  }

  async deleteById(id: number) {
    return await this.db.media.delete({
      where: {
        id: id,
      },
    });
  }
}

export default MediaDal;
