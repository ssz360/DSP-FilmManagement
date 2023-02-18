export class WebsocketMessage {
  typeMessage?: MessageType;
  userId?: number;
  userName?: string;
  filmId?: number;
  taskName?: string;
}

export enum MessageType {
  login,
  logout,
  update,
  snapshot_online,
  snapshot_activeFilms
}
