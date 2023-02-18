import { useEffect, useState } from "react";

import { subscribeEvent, unsubscribeEvent } from "../../services/event.service";
import {
  getWebsocketMessages_onlineUsers} from "../../global/variables.global";
import React from "react";

function SidebarOnlineUsersComponent() {
  const [users, setUsers] = useState<any[]>();

  useEffect(() => {
    setUsers(getWebsocketMessages_onlineUsers());
    unsubscribeEvent("new_wc_message", onNewMessage);
    subscribeEvent("new_wc_message", onNewMessage);
  }, []);

  function onNewMessage(message: any) {
    const data = getWebsocketMessages_onlineUsers();
    setUsers((d1=>[...data]));
  }

  return (
    <>
      <div className="online-users">
        <div>
          <strong>Online Users:</strong>
        </div>
        {users?.map((el) => {
          return <div key={el.userId}>User: {el.userName}</div>;
        })}
      </div>
    </>
  );
}

export default SidebarOnlineUsersComponent;
