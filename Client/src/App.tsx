import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import LoginPage from "./pages/login/login.page";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { User } from "./open_api_models/User";
import { UserModel } from "./open_api_models/data-contracts";
import {
  getGlobalUser,
  setGlobalUser,
  setWebsocketMessages_activeFilms,
  setWebsocketMessages_onlineUsers,
  websocketMessages_activeFilms,
  websocketMessages_onlineUsers,
} from "./global/variables.global";
import {
  WebsocketMessageModel,
} from "./open_api_models/data-contracts";
import { subscribeEvent, unsubscribeEvent } from "./services/event.service";
import { WebsocketService } from "./services/websocket.service";
import RegisterPage from "./pages/register/register.page";
import MainPage from "./pages/main/main.page";

// https://codepen.io/TurkAysenur/pen/ZEpxeYm
// https://codepen.io/hexagoncircle/pen/RMrQPX

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/:component" element={<MainPage />} />
          <Route path="/:component/:sub" element={<MainPage />} />
          <Route path="/:component/:sub/:id" element={<MainPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
