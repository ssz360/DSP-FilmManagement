import { userChanged } from "../services/event.service";
import {
  UserModel,
  WebsocketMessageModel,
} from "../open_api_models/data-contracts";

// const dataChanged = new Event('dataChanged');

let user: UserModel | undefined = undefined;

export function getGlobalUser() {
  return user;
}
export function setGlobalUser(_user: UserModel | undefined) {
  user = _user;
  userChanged(user);
}

export let websocketMessages_onlineUsers: WebsocketMessageModel[] = [];
export function setWebsocketMessages_onlineUsers(
  data: WebsocketMessageModel[]
) {
  websocketMessages_onlineUsers = data;
}

export function getWebsocketMessages_onlineUsers() {
  return websocketMessages_onlineUsers;
}

export let websocketMessages_activeFilms: WebsocketMessageModel[] = [];
export function setWebsocketMessages_activeFilms(
  data: WebsocketMessageModel[]
) {
  websocketMessages_activeFilms = data;
}

export function getWebsocketMessages_activeFilms() {
  return websocketMessages_activeFilms;
}
