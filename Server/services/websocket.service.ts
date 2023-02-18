import { MessageType } from "./../models/websocketMessage";
import { WebSocket, WebSocketServer } from "ws";
import FilmDal from "../dal/film.dal";
import { WebsocketMessage } from "../models/websocketMessage";

class WebsocketService {
  wss = new WebSocketServer({ port: 8087 });
  filmDal = new FilmDal();
  static onlineUsers: any[] = [];

  constructor() {
    this.wss.on("connection", async (ws) => {
      ws.send(
        JSON.stringify({
          typeMessage: MessageType[MessageType.snapshot_online],
          data: WebsocketService.onlineUsers,
        })
      );

      let activeFilms = await this.filmDal.getAllActiveFilm();
      ws.send(
        JSON.stringify({
          typeMessage: MessageType[MessageType.snapshot_activeFilms],
          data: activeFilms,
        })
      );

      ws.on("message", (data, isBinary) => {
        this.broadcast(data as any);
      });
    });
  }

  broadcast(data: WebsocketMessage) {
    WebsocketService.onNewMessage(data);
    this.wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        try {
          client.send(JSON.stringify(data));
        } catch (error) {
          console.log(error);
        }
      }
    });
  }

  static onNewMessage(data: WebsocketMessage) {
    if (data.typeMessage == MessageType.login) {
      const user = WebsocketService.onlineUsers.find(
        (x) => x.userId == data.userId
      );
      if (!user) {
        WebsocketService.onlineUsers.push(data);
      }
    } else if (data.typeMessage == MessageType.logout) {
      const user = WebsocketService.onlineUsers.find(
        (x) => x.userId == data.userId
      );
      if (user) {
        const userIndex = WebsocketService.onlineUsers.indexOf(user);
        WebsocketService.onlineUsers.splice(
          WebsocketService.onlineUsers.indexOf(userIndex as any),
          1
        );
      }
    }
    data.typeMessage = MessageType[data.typeMessage as any] as any;
  }
}

export default WebsocketService;
