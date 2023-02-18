export class MqttReviewModel {
  id!: number;
  filmId!: number;
  reviewDate!: Date;
  rating!: number;
  review!: string;
  userId?: number;
  status!: MqttReviewStatus;
}

export enum MqttReviewStatus {
  created,
  updated,
  deleted,
}
