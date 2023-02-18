export class MqttFilmActiveModel {
  status!: MqttFilmActiveStatus;
  userId!: number;
  userName!: string;
}

export enum MqttFilmActiveStatus {
  active,
  inactive,
  deleted,
}
