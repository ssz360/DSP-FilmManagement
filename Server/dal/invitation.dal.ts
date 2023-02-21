import { PrismaClient } from "@prisma/client";
import InvitationModel from "../models/invitation.model";

class InvitationDal {
  db = new PrismaClient();

  async getById(id: number): Promise<InvitationModel> {
    let result: any = await this.db.review.findFirst({
      where: {
        id: id,
      },
    });
    return result as InvitationModel;
  }

  async getInvitationByIssuerUserId(
    issuerId: number
  ): Promise<InvitationModel[]> {
    let result: any = await this.db.review.findMany({
      where: {
        issuedById: issuerId,
      },
    });
    return result as InvitationModel[];
  }

  async getInvitationByInvitedUserId(
    InvitedId: number
  ): Promise<InvitationModel[]> {
    let result: any = await this.db.review.findMany({
      where: {
        invitedUserId: InvitedId,
      },
    });
    return result as InvitationModel[];
  }

  async setInvitationAsDone(invitationId: number): Promise<InvitationModel> {
    let result: any = await this.db.review.update({
      where: {
        id: invitationId,
      },
      data: {
        completed: true,
      },
    });
    return result as InvitationModel;
  }

  async create(invitation: InvitationModel): Promise<InvitationModel> {
    return (await this.db.review.create({
      data: {
        userId: invitation.issuedById,
        completed: false,
        filmId: invitation.filmId,
        issuedById: invitation.issuedById,
        invitedUserId: invitation.invitedUserId,
        isInvitation: invitation?.isInvitation ?? false,
      },
    })) as InvitationModel;
  }

  async deleteById(id: number) {
    return await this.db.review.delete({
      where: {
        id: id,
      },
    });
  }
}

export default InvitationDal;
