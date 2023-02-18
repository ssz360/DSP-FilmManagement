import mqtt from "mqtt/dist/mqtt";
import { MqttClient } from "mqtt/types/lib/client";

export class MosquitoService {
  options = {
    keepalive: 30,
    clientId: "u_" + Math.random().toString(16).substr(2, 8),
    clean: true,
    reconnectPeriod: 1000,
    connectTimeout: 30 * 1000,
    will: {
      topic: "WillMsg",
      payload: "Connection Closed abnormally..!",
      qos: 0,
      retain: false,
    },
    rejectUnauthorized: false,
  };
  client: MqttClient;
  constructor(onNewMessageCallBack: Function) {
    this.client = mqtt.connect("ws://localhost:8182", this.options as any);

    this.client.on("connect", () => {
      // this.client.subscribe("presence", (err) => {
      //   if (!err) {
      //     this.client.publish("presence", "Hello mqtt");
      //   }
      // });
      this.client.subscribe("user/" + this.options.clientId, (err) => {
        if (!err) {
          this.client.publish("user/" + this.options.clientId, "Hello All");
        }
      });
    });

    this.client.on("message", (channel, message) => {
      onNewMessageCallBack(channel, message);
    });
  }

  subscribe(channel: string) {
    this.client.subscribe(channel);
  }
  unsubscribe(channel: string) {
    this.client.unsubscribe(channel);
  }

  publish(channel: string, message: string) {
    this.client.publish(channel, message);
  }
}
