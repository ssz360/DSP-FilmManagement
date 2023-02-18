export function subscribeEvent(eventName: string, func: any) {
  document.addEventListener(eventName, func);
}

export function unsubscribeEvent(eventName: string, func: any) {
  document.removeEventListener(eventName, func);
}

export function userChanged(user: any) {
  var event = new CustomEvent("user_changed", {
    detail: user,
  });
  document.dispatchEvent(event);
}

export function newWebsocketMessageArrived(message: any) {
  var event = new CustomEvent("new_wc_message", {
    detail: JSON.parse(message),
  });
  document.dispatchEvent(event);
}

export function newMqttMessageArrived(channel, message: any) {
  var event = new CustomEvent("new_mqtt_message", {
    detail: {
      channel,
      message: isJsonOrString(message.toString()),
    },
  });
  document.dispatchEvent(event);
}

function isJsonOrString(str) {
  try {
    return JSON.parse(str);
  } catch (e) {
    return str;
  }
}
