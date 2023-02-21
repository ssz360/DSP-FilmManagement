import { useState, useEffect } from "react";
import { getWebsocketMessages_onlineUsers } from "../../global/variables.global";
import { unsubscribeEvent, subscribeEvent } from "../../services/event.service";
import SignalAnimationComponent from "../signalAnimation/signalAnimation.component";

import "./leftSide.component.css";

function LeftSideComponent() {
  const [users, setUsers] = useState<any[]>();

  useEffect(() => {
    setUsers(getWebsocketMessages_onlineUsers());
    unsubscribeEvent("new_wc_message", onNewMessage);
    subscribeEvent("new_wc_message", onNewMessage);
  }, []);

  function onNewMessage(message: any) {
    const data = getWebsocketMessages_onlineUsers();
    setUsers((d1) => [...data]);
  }
  return (
    <div className="left-side">
      <div className="side-wrapper">
        {/* <div className="side-title">Menu</div> */}
        <div className="side-menu">
          <div className="item">
            <svg viewBox="0 0 512 512">
              <g xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                <path
                  d="M0 0h128v128H0zm0 0M192 0h128v128H192zm0 0M384 0h128v128H384zm0 0M0 192h128v128H0zm0 0"
                  data-original="#bfc9d1"
                />
              </g>
              <path
                xmlns="http://www.w3.org/2000/svg"
                d="M192 192h128v128H192zm0 0"
                fill="currentColor"
                data-original="#82b1ff"
              />
              <path
                xmlns="http://www.w3.org/2000/svg"
                d="M384 192h128v128H384zm0 0M0 384h128v128H0zm0 0M192 384h128v128H192zm0 0M384 384h128v128H384zm0 0"
                fill="currentColor"
                data-original="#bfc9d1"
              />
            </svg>
            Online Users
          </div>
          <div className="online-users-container">
            {users?.map((el) => {
              return (
                <div key={el.userId}>
                  {" "}
                  <SignalAnimationComponent></SignalAnimationComponent>
                  <div className="online-username">{el.userName}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeftSideComponent;
