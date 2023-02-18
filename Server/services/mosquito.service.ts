import { MqttReviewStatus } from "./../models/MqttReview.model";
import {
  MqttFilmActiveModel,
  MqttFilmActiveStatus,
} from "../models/mqttFilmActiveModel";
import * as mqtt from "mqtt";
import { MqttClient } from "mqtt/types/lib/client";
import FilmDal from "../dal/film.dal";
import UserDal from "../dal/user.dal";
import { MqttReviewModel } from "../models/MqttReview.model";

export class MosquitoService {
  filmDal = new FilmDal();
  userDal = new UserDal();
  client: MqttClient;
  constructor() {
    this.client = mqtt.connect("mqtt://127.0.0.1:1883");

    this.client.on("connect", () => {
      this.client.subscribe("user/+");
      this.publishAllFilms();
    });

    this.client.on("message", (topic, message) => {
      if (topic.startsWith("user/")) {
        this.publishAllFilms();
      }
    });
  }

  private async publishAllFilms() {
    const publicFilms = await this.filmDal.getPublicFilms();
    const activeFilms = await this.filmDal.getAllActiveFilm();

    for (let film of publicFilms) {
      const message = new MqttFilmActiveModel();
      const active = activeFilms.find((x) => x.filmId == film.id);

      if (active) {
        message.status = MqttFilmActiveStatus.active as any;
        const user = await this.userDal.getById(active.userId);
        message.userId = user.id;
        message.userName = user.name;
      } else {
        message.status = MqttFilmActiveStatus.inactive as any;
      }
      this.publishToFilm_ActiveTopic(film.id, message);
    }
  }

  private publish(channel: string, message: any) {
    console.log(channel, JSON.stringify(message));

    this.client.publish(channel, JSON.stringify(message));
  }

  publishToFilm_ActiveTopic(filmId: number, message: MqttFilmActiveModel) {
    message.status = MqttFilmActiveStatus[message.status] as any;
    this.publish("film/" + filmId + "/activate", message);
  }

  publishToFilm_ReviewTopic(filmId: number, message: MqttReviewModel) {
    message.status = MqttReviewStatus[message.status] as any;
    this.publish("film/" + filmId + "/review", message);
  }

  publishToReviewTopic(reviewId: number, message: MqttReviewModel) {
    message.status = MqttReviewStatus[message.status] as any;
    this.publish("review/" + reviewId, message);
  }

  publishToReview_RatingTopic(
    reviewId: number,
    oldVal: number,
    newVal: number
  ) {
    this.publish("review/" + reviewId + "/rating", {
      old: oldVal,
      new: newVal,
    });
  }
  publishToReview_ReviewTopic(
    reviewId: number,
    oldVal: string,
    newVal: string
  ) {
    this.publish("review/" + reviewId + "/review", {
      old: oldVal,
      new: newVal,
    });
  }
  publishToReview_DateTopic(reviewId: number, oldVal: Date, newVal: Date) {
    this.publish("review/" + reviewId + "/date", {
      old: oldVal,
      new: newVal,
    });
  }
}
