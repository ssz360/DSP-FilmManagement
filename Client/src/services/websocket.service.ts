import { newWebsocketMessageArrived } from "./event.service";

export class WebsocketService {
  socket = new WebSocket("ws://localhost:8087");

  constructor() {
    this.socket.onopen = () => {
      console.log("Connected to WebSockets server");
    };

    this.socket.onmessage = (event) => {
      newWebsocketMessageArrived(event.data);
    };

    this.socket.onclose = () => {
      console.log("Disconnected from WebSockets server");
    };
  }
}
